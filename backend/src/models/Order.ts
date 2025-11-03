import { Document, Schema, model, Types } from "mongoose";

export interface IOrder extends Document {
  userId: Types.ObjectId;
  products: {
    productId: string;
    quantity: number;
  }[];
  total: number;
}

const orderSchema = new Schema<IOrder>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
    total: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

export default model<IOrder>('Order', orderSchema)