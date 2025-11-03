import { Schema, model, Types, Document } from "mongoose";

const categorySchema = new Schema({
  name: {
    required: true,
    type: String,
  },
});

export default model("Category", categorySchema);
