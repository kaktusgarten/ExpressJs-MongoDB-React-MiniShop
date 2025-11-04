import type { RequestHandler } from "express";
import { Product, Category } from "#models";
import mongoose from "mongoose";

// CREATE Product ###############
export const createProduct: RequestHandler = async (req, res) => {
  const { name, description, price, category } = req.body;

  if (!name || !description || !price || !category) {
    res.status(400).json({ message: "Missing required fields" });
    return;
  }

  // Kategorie anhand des Namens suchen oder neu anlegen
  let categoryDoc = await Category.findOne({ name: category });
  if (!categoryDoc) {
    categoryDoc = await Category.create({ name: category });
  }

  // Neues Produkt anlegen
  const newProduct = await Product.create({
    name,
    description,
    price,
    categoryId: categoryDoc._id,
  });

  // Kategorie-Name gleich mit zurückgeben (populate)
  const populatedProduct = await newProduct.populate("categoryId", "name");

  res.status(201).json(populatedProduct);
};

// GET ALL Products ################
export const getAllProducts: RequestHandler = async (req, res) => {
  const allProducts = await Product.find().populate("categoryId", "name");
  console.log(allProducts);
  res.status(200).json(allProducts);
};

// GET Products by ID ################

// !!!!!!!!!!!!!!!!!!!!!! Unfertig !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
export const getProductById: RequestHandler = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const productById = await Product.findById(id).populate("categoryId", "name");
  console.log(productById);
  res.status(200).json(productById);
};

// GET Products by Category #############
export const getProductsByCategory: RequestHandler = async (req, res) => {
  const { categoryId } = req.params;

  if (!categoryId) {
    res.status(400).json({ message: "Category ID is required" });
    return;
  }

  // String → ObjectId
  if (!mongoose.Types.ObjectId.isValid(categoryId)) {
    res.status(400).json({ message: "Invalid category ID" });
    return;
  }
  const categoryObjectId = new mongoose.Types.ObjectId(categoryId);

  // Vor populate filtern
  const products = await Product.find({
    categoryId: categoryObjectId,
  }).populate("categoryId", "name"); // Feldname im Schema

  if (!products.length) {
    res.status(404).json({ message: "No products found for this category" });
    return;
  }

  res.status(200).json(products);
};
