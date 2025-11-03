import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "Nachname is required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    street: {
      type: String,
      required: [true, "Straße ist erforderlich"],
      trim: true,
    },
    houseNumber: {
      type: String,
      required: [true, "Hausnummer ist erforderlich"],
      trim: true,
    },
    postalCode: {
      type: String,
      required: [true, "PLZ ist erforderlich"],
      match: [/^\d{4,5}$/, "PLZ muss 4 bis 5 Ziffern enthalten"],
    },
    city: {
      type: String,
      required: [true, "Stadt ist erforderlich"],
      trim: true,
    },
    phone: {
      type: String,
      default: "",
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Passwort ist erforderlich"],
      minlength: [6, "Passwort muss mindestens 6 Zeichen lang sein"],
    },
    // ✅ Neues optionales Feld
    profileImage: {
      type: String,
      default: "", // Cloudinary-URL oder leer
    },
  },
  { timestamps: true }
);

export default model("User", userSchema);
