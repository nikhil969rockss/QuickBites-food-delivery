import express from "express";
import { getMeController, updateMobileController } from "../controllers/user.controller.js";
import { authenticate } from "../middlewares/auth.middeware.js";

const userRouter = express.Router();

/**
 * @route - GET /api/user/me
 * @description - get the details of the logged in user
 * @access - private
 */
userRouter.get("/me", authenticate, getMeController);

/**
 * @route - GET /api/user/update/mobile
 * @description - update mobile for logged in user usually sign in with google method will redirect this route
 * @access - private
 */
userRouter.post("/update/mobile", authenticate, updateMobileController);

export default userRouter;
