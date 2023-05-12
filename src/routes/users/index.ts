import express, { Router } from "express";
import { getProductsByID } from "../../controllers/ProductsController";
import { updateUsername } from "../../controllers/VerifyToken";
const router: Router = express.Router();

router.put("/:id", updateUsername);

export default router;
