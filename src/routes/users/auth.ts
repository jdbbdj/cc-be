import express, { Router } from "express";
import { registerUser } from "../../controllers/UserController";
const router: Router = express.Router();

router.post("/register", registerUser);

export default router;
