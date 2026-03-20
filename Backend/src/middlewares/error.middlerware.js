import ApiError from "../utils/ApiError.js";

/**
 * @description middleware to catch all the errors related to third party services and API's
 * @param {import('express').ErrorRequestHandler} err - Error handler
 * @param {import('express').Request} req - request object
 * @param {import('express').Response} res - response object
 * @param {import('express').NextFunction} next - next function
 *
 */
function errorMiddleware(err, req, res, next) {
  let error = err;

  if (!(error instanceof ApiError)) {
    console.log(error);
  }
  const response = {
    success: error.success,
    stausCode: error.statusCode,
    message: error.message,
    errors: error?.errors || [],
    stack: process.env.NODE_ENV === "development" ? error.stack : null,
  };
  console.log(error);
  return res.status(error.statusCode || 500).json(response);
}

export default errorMiddleware;
