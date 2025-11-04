import type { RequestHandler } from "express";
import mongoose from "mongoose";
import { Product, Order } from "#models";

// POST /api/orders #######################
export const createOrder: RequestHandler = async (req, res) => {
  const { userId, products } = req.body;

  if (!userId || !products?.length) {
    res.status(400).json({ message: "userId and products are required" });
    return;
  }

  // ObjectId validieren
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ message: "Invalid userId" });
    return;
  }

  for (const item of products) {
    if (!item.productId || !mongoose.Types.ObjectId.isValid(item.productId)) {
      res.status(400).json({ message: "Invalid productId in products array" });
      return;
    }
    if (!item.quantity || item.quantity < 1) {
      res.status(400).json({ message: "Quantity must be at least 1" });
      return;
    }
  }

  // Produktpreise abrufen
  const productIds = products.map((p: any) => p.productId);
  const dbProducts = await Product.find({ _id: { $in: productIds } });

  if (dbProducts.length !== products.length) {
    res.status(400).json({ message: "Some products not found" });
    return;
  }

  // Total berechnen
  let total = 0;
  const orderProducts = products.map((p: any) => {
    const product = dbProducts.find(
      (dbp) => dbp._id.toString() === p.productId
    );
    const quantity = p.quantity;
    total += (product?.price || 0) * quantity;
    return {
      productId: p.productId,
      quantity,
    };
  });

  // Neue Order anlegen
  const newOrder = await Order.create({
    userId,
    products: orderProducts,
    total,
  });

  // Optional: Produktdetails für Response populaten
  const populatedOrder = await newOrder.populate(
    "products.productId",
    "name price"
  );

  res.status(201).json(populatedOrder);
};


// GET /api/orders/user/:userId #################
export const getOrdersByUser: RequestHandler = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    res.status(400).json({ message: "User ID is required" });
    return;
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ message: "Invalid User ID" });
    return;
  }

  // Alle Orders des Users abrufen und Produkte populaten
  const orders = await Order.find({ userId: new mongoose.Types.ObjectId(userId) })
    .populate("products.productId", "name price")
    .sort({ createdAt: -1 }); // optional: neueste zuerst

  if (!orders.length) {
    res.status(404).json({ message: "No orders found for this user" });
    return;
  }

  res.status(200).json(orders);
};
