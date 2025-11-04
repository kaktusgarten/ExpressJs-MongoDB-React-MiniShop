import type { RequestHandler } from "express";
import { Category } from "#models";

export const getAllCategories: RequestHandler = async (req, res) => {
  const categories = await Category.find();
  res.status(200).json(categories);
};
