import express, { Router } from "express";
import {
  getProducts,
  getProductsByID,
  getProductsBySize,
  getProductsByIDandSize,
} from "../../controllers/OrderController";
const router: Router = express.Router();

router.get("/", getProducts);

router.get("/:id", getProductsByID);

router.get("/shoe/", getProductsBySize);

router.get("/shoe/:id", getProductsByIDandSize);

export default router;
