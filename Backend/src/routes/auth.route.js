import express from "express";
import {
  loginController,
  logoutController,
  signUpController,
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

export default authRouter;
