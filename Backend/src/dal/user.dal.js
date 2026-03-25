import UserModel from "../models/user.model.js";

export const createUser = (data) => UserModel.create(data);

export const getUserByEmail = (email) => UserModel.findOne({ email });

export const getUserById = (id) => UserModel.findById(id);

export const updateUser = (id, data) =>
  UserModel.findByIdAndUpdate(id, data, { new: true });
