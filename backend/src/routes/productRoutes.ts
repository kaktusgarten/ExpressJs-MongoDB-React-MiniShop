import { Router } from "express";
import { createProduct } from "#controllers";

const productRoutes = Router();

productRoutes.post("/", createProduct);

export default productRoutes;
