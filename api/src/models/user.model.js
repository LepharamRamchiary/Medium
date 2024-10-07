import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
    otp: {
      type: String, // Store OTP
    },
    otpExpires: {
      type: Date, // Store OTP expiration time
    },
  },
  { timestamps: true }
);

// hashing the password, if password is modify or new
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    console.log("Hashing password for user:", this.username);
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch {
    return next(error);
  }
});

// compare the password with hash password, result will be true or false
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// creating access token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    // payload
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullname: this.fullname,
    },
    // access token and access expiry token
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

// creating refresh token
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    // payload
    {
      _id: this._id,
    },
    // access token and access expiry token
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateOtp = function () {
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
  this.otp = otp;
  this.otpExpires = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes
  return otp;
};

export const User = mongoose.model("User", userSchema);
