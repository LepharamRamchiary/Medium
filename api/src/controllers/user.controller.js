import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv"
dotenv.config()

//generate access and referesh token
const generateAccessTokenAndRefereshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating referesh and access token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, password, username } = req.body;
  // console.log("email", email);

  // validation - not empty
  if (
    [fullname, email, password, username].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are requered");
  }

  // check if uesr already exists: username, email
  const existedUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email and username alreday exists");
  }

  // check for image, check for avatar
  const avatarLocalPath = req.files?.avatar[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }
  console.log("Attempting to upload avatar: ", avatarLocalPath);

  // upload them to cloudinary, avatar
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  console.log("Cloudinary upload response: ", avatar);

  if (!avatar) {
    console.error("Avatar upload failed: ", avatarLocalPath);
    throw new ApiError(400, "Avatar file is required1");
  }

  // create user object - create entry in db
  const user = await User.create({
    fullname,
    password,
    email,
    username: username.toLowerCase(),
    avatar: avatar.url,
  });

  // remove passwoerd and refresh token field from response
  const createdUser = await User.findById(user._id).select(
    // write what are the fields you need to remove || write what fields are not need
    "-password -refreshToken -resetPasswordToken -resetPasswordExpires"
  );

  // check for user creation
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  // return respones
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  // console.log(username, email, password);

  if (!username && !email) {
    throw new ApiError(400, "username and email is required!");
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(404, "User not found or exists");
  }

  if (!user.password) {
    throw new ApiError(500, "Password is missing for this user");
  }

  // password check-> true or false
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  // access and referesh token
  const { accessToken, refreshToken } =
    await generateAccessTokenAndRefereshToken(user._id);

  // send cookie
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  const options = {
    httpOnly: true,
    secure: true,
  };

  //response return
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          refreshToken,
          accessToken,
        },
        "User logged In Successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  // removing refreshToken from DB
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  // clearing a cookies
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out Successfully"));
});


const sendOtpForPasswordReset = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  // Find user by email
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User not found with this email");
  }

  // Generate OTP
  const otp = user.generateOtp();
  await user.save({ validateBeforeSave: false });

  // Email message
  const message = `Your OTP for password reset is: ${otp}. It will expire in 10 minutes.`;

  try {
    // Configure nodemailer and send the OTP via email
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: "no-reply@yourapp.com",
      to: user.email,
      subject: "Password Reset OTP",
      text: message,
    });

    // Store email in req.user for later use
    req.user = { email: user.email }; // Make sure req.user is correctly set

    // Send response
    return res.status(200).json(new ApiResponse(200, {}, "OTP sent to reset password"));

  } catch (error) {
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save({ validateBeforeSave: false });
    throw new ApiError(500, "Email could not be sent");
  }
});

const verifyOtp = asyncHandler(async (req, res) => {
  const { otp, email } = req.body; // Get email from the request body

  // Check if email is available
  if (!email) {
    throw new ApiError(400, "Email is required to verify OTP");
  }

  // Find the user by email and check the OTP
  const user = await User.findOne({
    email,
    otp,
    otpExpires: { $gt: Date.now() }, // Check if OTP is not expired
  });

  if (!user) {
    throw new ApiError(400, "Invalid or expired OTP");
  }

  // Clear OTP fields
  user.otp = undefined; 
  user.otpExpires = undefined; 
  await user.save();

  // Send success response
  return res.status(200).json(new ApiResponse(200, {}, "OTP verified successfully"));
});

const resetPassword = asyncHandler(async (req, res) => {
  const { email, newPassword } = req.body; // Destructure email and newPassword from request body

  // Check if email is available
  if (!email) {
    throw new ApiError(400, "Email is required to reset password");
  }

  // Find the user by email
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Validate new password (optional)
  if (newPassword.length < 6) {
    throw new ApiError(400, "Password must be at least 6 characters long");
  }

  // Update the user's password
  user.password = newPassword; // You should hash this password before saving, assuming you have pre-save middleware for hashing
  await user.save();

  // Send success response
  return res.status(200).json(new ApiResponse(200, {}, "Password reset successfully"));
});



export { registerUser, loginUser, logoutUser, sendOtpForPasswordReset, verifyOtp, resetPassword };
