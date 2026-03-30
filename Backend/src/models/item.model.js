import mongoose from "mongoose";

const itemsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Shop name is required"],
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
    },
    category: {
      type: String,
      enum: {
        values: [
          "Snacks",
          "Main Course",
          "Desserts",
          "Pizzas",
          "Burgers",
          "Sandwiches",
          "South Indian",
          "North Indian",
          "Chinese",
          "Fast Food",
          "Others",
        ],
        message: "{VALUE} is not supported",
      },
      required: [true, "Category is required"],
    },
    price: {
      type: Number,
      min: 0,
      required: [true, "Price is required"],
    },
    ratings: {
      type: Number,
      min: 0,
    },
    foodType: {
      type: String,
      enum: {
        values: ["Veg", "Non-Veg"],
        message: "{VALUE} is not supported",
      },
      required: [true, "Food type is required"],
    },
  },
  { timeStamp: true },
);

const Model = mongoose.model("Item", itemsSchema);

export default Model;
