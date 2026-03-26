import { getMe, updateMobile } from "../services/user.service.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import z from "zod";
import { validateUpdateMobile } from "../validationSchemas/update.validation.js";

/**
 * @description - to update mobile number of the user with email and phone number
 * @param {Function} - request handler function
 */
export const updateMobileController = asyncHandler(async (req, res, next) => {
  console.log(req.body)
  const { success, data, error } = validateUpdateMobile(req.body);
  if (!success)
    throw new ApiError(400, "validation error", null, z.prettifyError(error));
  const { email, mobile } = data;

  const user = await updateMobile(email, mobile);

  const response = {
    id: user._id,
    email: user.email,
    mobile: user.mobile,
    role: user.role,
  };

  return res
    .status(200)
    .json(new ApiResponse(200, "Mobile updated successfully", response));
});

/**
 * @description - to get the details of the logged in user via cookies verfication
 * @param {Function} - request handler function
 */
export const getMeController = asyncHandler(async (req, res, next) => {
  const loggedInUser = req.user;
  const user = await getMe(loggedInUser._id);

  const response = {
    id: user._id,
    email: user.email,
    mobile: user.mobile,
    role: user.role,
  };
  res
    .status(200)
    .json(new ApiResponse(200, "User fetched successfully", response));
});
