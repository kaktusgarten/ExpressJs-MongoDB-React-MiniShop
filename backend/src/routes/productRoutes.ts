import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  getProductsByCategory,
  getProductById,
} from "#controllers";

import { authenticate, authorize, upload, validateBodyZod } from "#middlewares";
import { Product } from "#models";

const productRoutes = Router();

productRoutes.post(
  "/",
  authenticate,
  upload.array('image', 5),
  createProduct,
);
productRoutes.get("/", getAllProducts);
productRoutes.get("/:id", getProductById);
productRoutes.get("/category/:categoryId", getProductsByCategory);

export default productRoutes;
