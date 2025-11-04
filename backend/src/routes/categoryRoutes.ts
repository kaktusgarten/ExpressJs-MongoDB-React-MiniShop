import { Router } from "express";
import { getAllCategories } from "#controllers";

const categoryRoutes = Router();
categoryRoutes.get('/', getAllCategories);

export default categoryRoutes;

