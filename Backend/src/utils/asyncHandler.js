/**
 *
 * @param {Function} requesHandler - request handler function
 * @returns {Function} - request handler function which take request response and next object
 */
function asyncHandler(requestHandler) {
  return async (req, res, next) => {
    try {
      await requestHandler(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}

export default asyncHandler;
