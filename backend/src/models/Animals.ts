import { Schema, model } from "mongoose";

const animalSchema = new Schema({
  art: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  preis: {
    type: Number,
  },
});

export default model("Animal", animalSchema);
