import * as userController from "../controllers/user.controller";
import { Router } from "express";

const router = Router();

// @ts-ignore
router.post("/create", userController.createUser);

// @ts-ignore
router.get("/", userController.getUsers);

// @ts-ignore
router.get("/:id", userController.getUserById);

// @ts-ignore
router.put("/:id", userController.updateUser);

// @ts-ignore
router.delete("/:id", userController.deleteUser);

export default router;
