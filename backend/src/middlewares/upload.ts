import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "raumbasis_images", // 🔄 eigener Ordner für Benutzerbilder
    resource_type: "auto",
    // resource_type: "image",
    // allowed_formats: ["jpg", "jpeg", "png", "gif", "webp", "pdf"],
    // public_id: () => `user-${Date.now()}`,
    // limits: {
    //   fileSize: 8 * 1024 * 1024, // 8MB
    // },
  },
} as any);

const upload = multer({ storage });

// Chat GPT sagt, limits direct in multer schreiben und nicht bei params:
// const upload = multer({
//   storage,
//   limits: { fileSize: 8 * 1024 * 1024 }, // Datei-Limit direkt bei Multer setzen
// });

export default upload;
