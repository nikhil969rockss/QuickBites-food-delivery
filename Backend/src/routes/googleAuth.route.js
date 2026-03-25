import express from "express";
import { signInWithGoogleController } from "../controllers/googleAuth.controller.js";

const gooleAuthRouter = express.Router();

/**
 * @description Register user via google ```api/auth/google```
 */
gooleAuthRouter.post("/", signInWithGoogleController);

export default gooleAuthRouter;
