import UserModel from "../models/user.model.js";
import {
  loginUser,
  logoutUser,
  resetPassword,
  sendOTP,
  signupUser,
  verifyOTP,
} from "../services/auth.service.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import loginSchema from "../validationSchemas/login.validation.js";
import signUpSchema from "../validationSchemas/signup.validation.js";
import z from "zod";

/**
 * @description controller to handle signup user
 * @param {Function} - handler function
 */
const signUpController = asyncHandler(async (req, res, next) => {
  // checking zod validation
  const { success, data, error } = signUpSchema.safeParse(req.body);
  if (!success) {
    throw new ApiError(400, "validation error", null, z.prettifyError(error));
  }

  const user = await signupUser(data);

  res.cookie("token", user.token, {
    httpOnly: true,
    secure: !process.env.NODE_ENV === "development",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });
  //response
  return res.status(201).json(
    new ApiResponse(201, "User created successfully", {
      id: user.id,
      email: user.email,
      role: user.role,
    }),
  );
});

/**
 * @description controller to handle login user with ```email``` and ```password```
 * @param {Function} - handler function
 */
const loginController = asyncHandler(async (req, res, next) => {
  //validation data
  const { success, data, error } = loginSchema.safeParse(req.body);

  if (!success) {
    throw new ApiError(400, "validaton error", null, z.prettifyError(error));
  }
  const user = await loginUser(data);

  res.cookie("token", user.token, {
    httpOnly: true,
    secure: !process.env.NODE_ENV === "development",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });

  return res.status(200).json(
    new ApiResponse(200, "Login successfull", {
      id: user.id,
      email: user.email,
      role: user.role,
    }),
  );
});

/**
 * @description controller to handle logout user
 * @param {Function} - handler function
 */
const logoutController = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;
  await logoutUser(token);
  res.clearCookie("token");
  return res.status(200).json(new ApiResponse(200, "Logout successfull"));
});

/**
 * @description controller to handle send OTP to user
 * @param {Function} - handler function
 */

const sendOTPController = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    throw new ApiError(400, "Email is required");
  }
  await sendOTP(email);

  return res.status(200).json(new ApiResponse(200, "OTP sent successfully"));
});

/**
 * @description controller to handle send OTP to user
 * @param {Function} - handler function
 */
const verifyOTPController = asyncHandler(async (req, res, next) => {
  const { email, otp } = req.body;
  if (!email || !otp) throw new ApiError(400, "Email and OTP are required");

  await verifyOTP(email, otp);

  return res
    .status(200)
    .json(new ApiResponse(200, "OTP verified successfully"));
});

/**
 * @description controller to handle reset password
 * @param {Function} - handler function
 */
const resetPasswordController = asyncHandler(async (req, res, next) => {
  const { email, newPassword } = req.body;
  if (!email || !newPassword) {
    throw new ApiError(400, "Email and New password is required");
  }

  await resetPassword(email, newPassword);

  return res
    .status(200)
    .json(new ApiResponse(200, "Password reset successfully"));
});

export {
  signUpController,
  loginController,
  logoutController,
  sendOTPController,
  verifyOTPController,
  resetPasswordController,
};
