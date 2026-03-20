import mongoose from "mongoose";

const BlackListTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: [true, "Token is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 1000 * 60 * 60 * 24 * 7,
  },
});

const BlackListTokenModel = mongoose.model(
  "blackListToken",
  BlackListTokenSchema,
);

export default BlackListTokenModel;
