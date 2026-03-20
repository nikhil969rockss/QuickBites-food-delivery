import UserModel from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
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



export { signUpController, loginController };
