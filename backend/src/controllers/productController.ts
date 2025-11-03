import type { RequestHandler } from "express";
import { Product } from "#models";

export const createProduct: RequestHandler = async (req, res) => {
  const { name, description, price, categoryId } = req.body;

  if (!name || !description || !price || !categoryId) {
    return res.status(400).json({ message: "Alle Felder sind erforderlich." });
  }

  const newProduct = await Product.create({
    name,
    description,
    price,
    categoryId,
  });

  res.status(201).json(newProduct);
};