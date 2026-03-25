import BlackListTokenModel from "../models/blacklistToken.js";

export const createBlackLisToken = async (token) =>
  BlackListTokenModel.create({ token });
