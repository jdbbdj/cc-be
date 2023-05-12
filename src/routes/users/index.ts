import express, { Router } from "express";
import {
  updateUser,
  deleteUser,
  findAllUser,
} from "../../controllers/UserController";

const router: Router = express.Router();

router.put("/:id", updateUser);

router.put("/delete/:id", deleteUser);

router.get("/find", findAllUser);

export default router;
