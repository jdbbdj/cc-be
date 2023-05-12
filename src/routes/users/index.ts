import express, { Router } from "express";
import { updateUser, deleteUser } from "../../controllers/UserController";

const router: Router = express.Router();

router.put("/:id", updateUser);

router.put("/delete/:id", deleteUser);

export default router;
