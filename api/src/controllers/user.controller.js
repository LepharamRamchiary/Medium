import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import nodemailer from "nodemailer";
import crypto from "crypto";
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

// Forgot Password Handler
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  console.log(email);
  
  // 1. Find the user by email
  const user = await User.findOne({ email });
  console.log(user);
  
  if (!user) {
    throw new ApiError(404, "User not found with this email");
  }

  // 2. Generate a reset token and save it in the database
  const resetToken = user.createPasswordResetToken();
  console.log(resetToken);
  
  await user.save({ validateBeforeSave: false });

  // 3. Create reset URL
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/resetPassword/${resetToken}`;

  console.log(resetUrl);
  
  // 4. Email message
  const message = `You requested a password reset. Please use the following link to reset your password: \n\n ${resetUrl} \n\n This link will expire in 10 minutes.`;

  console.log(process.env.EMAIL_USERNAME, process.env.EMAIL_PASSWORD);

  try {
    // 5. Configure nodemailer and send the reset link via email
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
      subject: "Password Reset Request",
      text: message,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Email sent to reset password"));
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save({ validateBeforeSave: false });
    throw new ApiError(500, "Email could not be sent");
  }
});



export { registerUser, loginUser, logoutUser, forgotPassword, resetPassword };
