import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
    },
    mobile: {
      type: String,
      required: [true, "Mobile Number is required"],
    },
    role: {
      type: String,
      enum: {
        values: ["user", "owner", "deliveryBoy"],
        message: "Role must be either 'user' or 'owner' or 'deliveryBoy'",
      },
    },
  },
  { timestamps: true },
);

const UserModel = mongoose.model("user", userSchema);

export default UserModel;
