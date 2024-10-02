import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

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
    "-password -refreshToken"
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

export { registerUser };
