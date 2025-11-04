import { Router } from "express";
import { createOrder, getOrdersByUser } from "#controllers";

const orderRoutes = Router();
orderRoutes.post("/", createOrder);
orderRoutes.get("/user/:userId", getOrdersByUser);

export default orderRoutes;
