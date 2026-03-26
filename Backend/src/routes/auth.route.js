import express from "express";
import {
  loginController,
  logoutController,
  sendOTPController,
  signUpController,
  resetPasswordController,
  verifyOTPController,
  signInWithGoogleController,
} from "../controllers/auth.controller.js";

const authRouter = express.Router();

/**
 * @description route to handle Signup request ```/api/auth/signup
 * @access Public
 */
authRouter.post("/signup", signUpController);

/**
 * @description route to handle Login request ```/api/auth/login
 * @access Public
 */
authRouter.post("/login", loginController);

/**
 * @description route to handle Logut request ```/api/auth/logout
 * @access Public
 */
authRouter.post("/logout", logoutController);

//------------------------------reset password

/**
 * @description route to handle send otp ```/api/auth/send-otp
 * @access Public
 */
authRouter.post("/send-otp", sendOTPController);

/**
 * @route ```POST``` - ```/api/auth/verify-otp```
 * @description route to handle verity otp ```/api/auth/verify-otp```
 * @access Public
 */
authRouter.post("/verify-otp", verifyOTPController);

/**
 * @route ```POST``` - ```/api/auth/reset-password```
 * @description route to handle verity otp
 * @access Public
 */
authRouter.post("/reset-password", resetPasswordController);

//---- google sign in
/**
 * @route ```POST``` - ```api/auth/google```
 * @description Register user via google
 * @access Public
 */
authRouter.post("/google", signInWithGoogleController);

export default authRouter;
