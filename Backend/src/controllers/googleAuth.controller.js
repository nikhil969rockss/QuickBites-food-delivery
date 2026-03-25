import { signInWithGoogle } from "../services/googleAuth.service.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import signUpSchema from "../validationSchemas/signup.validation.js";
import z from "zod";

/**
 * @description controller to handle sign in with google
 * @param {Function} - handler function
 */
export const signInWithGoogleController = asyncHandler(
  async (req, res, next) => {
    //validating incoming request
    const { success, data, error } = signUpSchema.safeParse(req.body);
    if (!success) {
      throw new ApiError(400, "validation error", null, z.prettifyError(error));
    }
    // signing in with google
    const { token, user } = await signInWithGoogle(data);

    //setting up cookie with token
    res.cookie("token", user.token, {
      httpOnly: true,
      secure: !process.env.NODE_ENV === "development",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return res.status(200).json(
      new ApiResponse(200, "User created with google successfully", {
        id: user._id,
        email: user.email,
      }),
    );
  },
);

export const signInGoogleUpdateMobileController = asyncHandler(
  async (req, res, next) => {},
);
