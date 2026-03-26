import express from "express";
import { getMeController } from "../controllers/user.controller.js";
import { authenticate } from "../middlewares/auth.middeware.js";

const userRouter = express.Router();

/**
 * @route - GET /api/user/me
 * @description - get the details of the logged in user
 * @access - private
 */
userRouter.get("/me", authenticate, getMeController);

export default userRouter;
