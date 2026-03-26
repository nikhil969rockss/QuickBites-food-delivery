import ApiResponse from "../utils/ApiResponse.js";
import { verifyToken } from "../utils/token.js";
import logger from "../config/logger.js";

/**
 * @description - To check the request if it is authenticated or not means user should logged in first
 * @param {import("express").Request} req - Request Object
 * @param {import("express").Response} res - Response Object
 * @param {import("express").NextFunction} next - Next Function
 *
 */
export const authenticate = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json(new ApiResponse(401, "Token not found, Please lgoin first"));
    }
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    logger.error(error);
    return res
      .status(401)
      .json(
        new ApiResponse(
          401,
          "Invalid Token, Unauthorized, Please try login again",
        ),
      );
  }
};
