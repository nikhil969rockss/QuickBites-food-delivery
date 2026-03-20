import express from "express";
import {
  loginController,
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

export default authRouter;
