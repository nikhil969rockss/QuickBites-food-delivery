import { getUserByEmail, getUserById, updateUser } from "../dal/user.dal.js";
import ApiError from "../utils/ApiError.js";

export const getMe = async (id) => {
  const user = await getUserById(id);
  if (!user) throw new ApiError(404, "user not found");
  return user;
};

export const updateUserRole = async (email, role) => {
  const user = await getUserByEmail(email);
  if (!user) throw new ApiError(404, "user not found");
  return await updateUser(user._id, { role });
};

export const updateMobile = async (email, mobile) => {
  const user = await getUserByEmail(email);
  if (!user) throw new ApiError(404, "user not found");

  // if user does not have mobile number
  if (!user.mobile || user.mobile === "unavailable") {
    const updatedUser = await updateUser(user._id, { mobile });
    return updatedUser;
  }
  if (user.mobile !== mobile) {
    throw new ApiError(400, "user already register with another mobile number");
  }
  // if user already register with mobile number
  if (user.mobile === mobile) {
    return user;
  }
};
