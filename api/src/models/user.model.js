import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";

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
    avatar: {
      type: String, // cloudinary url
      required: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
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

// Generate password reset token
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpires = Date.now() + 10 * 60 * 1000; 
  return resetToken;
};

// Reset password
userSchema.methods.resetPassword = function (newPassword) {
  this.password = newPassword; // Will be hashed automatically before saving
  this.resetPasswordToken = undefined;
  this.resetPasswordExpires = undefined;
};

export const User = mongoose.model("User", userSchema);
