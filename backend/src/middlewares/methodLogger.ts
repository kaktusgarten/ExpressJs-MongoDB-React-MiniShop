import type { RequestHandler } from "express";

const methodLogger: RequestHandler = (req, res, next) => {
  console.log(`Die MethodLogger Middleware sagt: ${req.method} ${req.url}`);
  next();
};

export default methodLogger;
