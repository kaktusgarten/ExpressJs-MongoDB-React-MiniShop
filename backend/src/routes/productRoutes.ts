import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  getProductsByCategory,
  getProductById,
} from "#controllers";

const productRoutes = Router();

productRoutes.post("/", createProduct);
productRoutes.get("/", getAllProducts);
productRoutes.get("/:id", getProductById);
productRoutes.get("/category/:categoryId", getProductsByCategory);

export default productRoutes;
