import express, { Router } from "express";
import {
  getProducts,
  getProductsByID,
  getProductsBySize,
  getProductsByIDandSize,
  createProduct,
} from "../../controllers/ProductsController";
const router: Router = express.Router();

router.post("/create", createProduct);

router.get("/", getProducts);

router.get("/:id", getProductsByID);

router.get("/shoe/", getProductsBySize);

router.get("/shoe/:id", getProductsByIDandSize);

export default router;
