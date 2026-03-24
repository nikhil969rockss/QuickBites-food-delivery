import BlackListTokenModel from "../models/blacklistToken.js";
import UserModel from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendMail } from "../utils/mail.js";
import { generateOTP } from "../utils/otp.js";
import { generateToken } from "../utils/token.js";
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

  // checking user already exist
  const { email } = data;
  const userAlreadyExist = await UserModel.findOne({ email });
  if (userAlreadyExist) {
    throw new ApiError(400, "User already exist with this email");
  }

  // create user
  const newUser = await UserModel.create({
    ...data,
  });
  newUser.password = undefined;

  // create token
  const token = generateToken({ user: newUser });
  res.cookie("token", token, {
    httpOnly: true,
    secure: !process.env.NODE_ENV === "development",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });

  //response
  return res
    .status(201)
    .json(new ApiResponse(201, "User created successfully", newUser));
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
  // check if user is already exist or not
  const { email, password } = data;
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new ApiError(400, "Invalid credentails");
  }
  //compare password
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new ApiError(400, "Invalid credentails");
  }

  user.password = undefined;

  //create token
  const token = generateToken({ user });
  res.cookie("token", token, {
    httpOnly: true,
    secure: !process.env.NODE_ENV === "development",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });

  return res.status(200).json(new ApiResponse(200, "Login successfull", user));
});

/**
 * @description controller to handle logout user
 * @param {Function} - handler function
 */
const logoutController = asyncHandler(async (req, res, next) => {
  //add token to the blackList
  const token = req.cookies.token;
  if (token) {
    await BlackListTokenModel.create({ token });
  }
  res.clearCookie("token");
  return res.status(200).json(new ApiResponse(200, "Logout successfull"));
});
/**
 * @description controller to handle send OTP to user
 * @param {Function} - handler function
 */

const sendOTPController = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const otp = generateOTP();

  user.resetOTP = otp;
  user.isOTPVerified = false;

  // 5 minutes expiry
  user.OTPExpiry = Date.now() + 1000 * 60 * 5;
  await user.save();

  //send otp to the user email
  const result = await sendMail(email, otp);
  if (!result) {
    throw new ApiError(500, "Failed to send OTP");
  }

  return res.status(200).json(new ApiResponse(200, "OTP sent successfully"));
});

/**
 * @description controller to handle send OTP to user
 * @param {Function} - handler function
 */
const verifyOTPController = asyncHandler(async (req, res, next) => {
  const { email, otp } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  // checking if otp not recieved or already verified or expired otp
  if (!otp || user.isOTPVerified || user.OTPExpiry < Date.now()) {
    throw new ApiError(400, "Invalid or Expired OTP");
  }
  user.isOTPVerified = true;
  user.resetOTP = undefined;
  user.OTPExpiry = undefined;
  await user.save();

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
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  if (!user.isOTPVerified) {
    throw new ApiError(400, "OTP is not verified ");
  }
  if (!newPassword) {
    throw new ApiError(400, "New password is required");
  }
  user.password = newPassword;
  await user.save();
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
