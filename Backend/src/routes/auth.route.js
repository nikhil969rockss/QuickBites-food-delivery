import express from "express";
import {
  loginController,
  logoutController,
  sendOTPController,
  signUpController,
  resetPasswordController,
  verifyOTPController,
} from "../controllers/auth.controller.js";

const authRouter = express.Router();

/**
 * @description route to handle Signup request ```/api/auth/signup
 */
authRouter.post("/signup", signUpController);

/**
 * @description route to handle Login request ```/api/auth/login
 */
authRouter.post("/login", loginController);

/**
 * @description route to handle Logut request ```/api/auth/logout
 */
authRouter.post("/logout", logoutController);

//--reset password

/**
 * @description route to handle send otp ```/api/auth/send-otp
 */
authRouter.post("/send-otp", sendOTPController);

/**
 * @description route to handle verity otp ```/api/auth/verify-otp
 */
authRouter.post("/verify-otp", verifyOTPController);

/**
 * @description route to handle verity otp ```/api/auth/reset-password
 */
authRouter.post("/reset-password", resetPasswordController);

export default authRouter;
