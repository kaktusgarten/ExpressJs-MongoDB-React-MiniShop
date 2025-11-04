import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  getProductsByCategory,
} from "#controllers";

const productRoutes = Router();

productRoutes.post("/", createProduct);
productRoutes.get("/", getAllProducts);
productRoutes.get("/category/:categoryId", getProductsByCategory);

export default productRoutes;
