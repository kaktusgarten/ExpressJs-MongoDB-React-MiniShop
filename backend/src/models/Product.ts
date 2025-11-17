import { Schema, model, Document, Types } from "mongoose";

interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  categoryId: Types.ObjectId;
  image_url: string[];
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    image_url: {
      type: [String],
      required: [false, "image is not required at the moment..."],
    },
  },
  { timestamps: true }
);

export default model<IProduct>("Product", productSchema);

