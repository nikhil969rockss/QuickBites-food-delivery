import { createBlackLisToken } from "../dal/token.dal.js";
import { createUser, getUserByEmail } from "../dal/user.dal.js";
import ApiError from "../utils/ApiError.js";
import { sendMail } from "../utils/mail.js";
import { generateOTP } from "../utils/otp.js";
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

/**
 * @description send OTP to user email
 * @param {string} email - ```email```of the user
 *@returns ```user``` document
 */
export const sendOTP = async (email) => {
  const user = await getUserByEmail(email);
  if (!user) {
    throw new ApiError(404, "User not found, Invalid email");
  }
  const otp = generateOTP();
  // save OTP the the user schema
  user.resetOTP = otp;
  user.isOTPVerified = false;

  // 5 minutes OTP expiry
  user.OTPExpiry = Date.now() + 1000 * 60 * 5;
  await user.save();

  //send otp to the user email
  const result = await sendMail(email, otp);
  if (!result) {
    throw new ApiError(500, "Failed to send OTP");
  }
  return user;
};

/**
 * @description verification of OTP
 * @param {string} email - ```email```of the user
 * @param {string} otp - ```OTP```which was sent to the user's email addreses
 *@returns ```user``` document
 */
export const verifyOTP = async (email, otp) => {
  const user = await getUserByEmail(email);
  if (!user) {
    throw new ApiError(404, "User not found, Invalid email");
  }
  if (user.resetOTP !== otp) {
    throw new ApiError(400, "Invalid OTP");
  }
  if (user.OTPExpiry < Date.now()) {
    throw new ApiError(400, "OTP has expired");
  }
  user.isOTPVerified = true;
  user.resetOTP = null;
  user.OTPExpiry = null;
  await user.save();

  return user;
};

/**
 * @description verification of OTP
 * @param {string} email - ```email```of the user
 * @param {string} newPassword - ```new password``` of the user
 *@returns ```user``` document
 */
export const resetPassword = async (email, newPassword) => {
  const user = await getUserByEmail(email);
  if (!user) {
    throw new ApiError(404, "User not found, Invalid email");
  }
  if (!user.isOTPVerified) {
    throw new ApiError(400, "OTP not verified");
  }
  user.password = newPassword;
  await user.save();

  return user;
};

/**
 *
 * @param {object} data - required fields from the body after validation
 * @returns ```user document``` and ```token```
 */
export const signInWithGoogle = async (data) => {
  const { email } = data;
  let user = await getUserByEmail(email);
  if (!user) {
    // if user not exist make one
    user = await createUser(data);
  }
  // create token
  const payload = { _id: user._id, email: user.email, role: user.role };
  const token = generateToken(payload);

  return { user, token };
};
