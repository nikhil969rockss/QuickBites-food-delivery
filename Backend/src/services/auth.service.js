import { createBlackLisToken } from "../dal/token.dal.js";
import { createUser, getUserByEmail } from "../dal/user.dal.js";
import BlackListTokenModel from "../models/blacklistToken.js";
import { generateToken } from "../utils/token.js";

/**
 * @description signup user with required field
 * @param {object} data - object returned from zod validation
 * @returns ```{ id: user._id, email: user.email, token }```
 */
export const signupUser = async (data) => {
  const { email } = data;

  // checking user already exist
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    throw new ApiError(409, "User already exist with this email");
  }
  // create user
  const user = await createUser(data);

  // create token
  const payload = { _id: user._id, email: user.email, role: user.role };
  const token = generateToken(payload);

  return { id: user._id, email: user.email, token };
};

/**
 * @description Login user via email and password
 * @param {object} data - ```email``` and ```password``` from data
 * @returns ```{ id: user._id, email: user.email, token }```
 */
export const loginUser = async (data) => {
  const { email, password } = data;

  // checking user already exist
  const user = await getUserByEmail(email);
  if (!user) {
    throw new ApiError(400, "Invalid credentails");
  }

  // compare password
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new ApiError(400, "Invalid credentails");
  }

  // create token
  const payload = { _id: user._id, email: user.email, role: user.role };
  const token = generateToken(payload);

  return { id: user._id, email: user.email, token };
};

/**
 * @description Logout user via token blacklisting
 * @param {string} token - ```jwt token```
 *
 */
export const logoutUser = async (token) => {
  if (token) {
    // add token to blacklist
    await createBlackLisToken(token);
  }
};
