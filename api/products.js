import express from "express";
const router = express.Router();
export default router;

import requireUser from "#middleware/requireUser";
import { getOrdersByUserIdAndProductId } from "#db/queries/orders_products";
import { getProducts, getProductById } from "#db/queries/products";

router.get("/", async (req, res) => {
  const products = await getProducts();
  res.send(products);
});

router.param("id", async (req, res, next, id) => {
  const product = await getProductById(id);
  if (!product) return res.status(400).send("Request not found.");
  req.product = product;
  next();
});

router.get("/:id", async (req, res) => {
  const product = req.product;
  res.send(product);
});

router.get("/:id/orders", requireUser, async (req, res) => {
  const orders = getOrdersByUserIdAndProductId(req.user.id, req.product.id);
  res.send(orders);
});
