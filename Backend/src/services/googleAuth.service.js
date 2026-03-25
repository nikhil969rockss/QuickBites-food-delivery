import { createUser, getUserByEmail } from "../dal/user.dal.js";
import ApiError from "../utils/ApiError.js";
import { generateToken } from "../utils/token.js";

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

export const updateMobile = async (email, mobile) => {
  const user = await getUserByEmail(email);
  if (!user) throw new ApiError(404);
};
