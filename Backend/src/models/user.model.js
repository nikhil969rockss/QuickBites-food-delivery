import mongoose from "mongoose";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;
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

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const UserModel = mongoose.model("user", userSchema);

export default UserModel;
