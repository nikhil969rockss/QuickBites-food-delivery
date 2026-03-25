import jwt from "jsonwebtoken";

/**
 * @description function to generate authenticated user token
 * @param {object} user user object from database
 * @return ```jwt token with payload```
 */
function generateToken(payload) {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return token;
}

/**
 * @description - function to verify the token
 * @param {string} token - token which get in the cookies or header
 * @returns
 */
function verifyToken(token) {
  if (!token) throw new Error("Token not found");
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded;
}

export { generateToken, verifyToken };
