import mongoose from "mongoose";

const shopSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Shop name is required"],
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    city: {
      type: String,
      required: [true, "City is required"],
    },
    state: {
      type: String,
      required: [true, "State is required"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
      },
    ],
  },
  { timeStamp: true },
);

const Model = mongoose.model("Shop", shopSchema);

export default Model;
