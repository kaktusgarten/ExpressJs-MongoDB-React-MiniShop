import { Schema, model, Document, Types } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    // categoryId: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Category',
    //     required: true,
    // },
    categoryId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default model("Product", productSchema);
