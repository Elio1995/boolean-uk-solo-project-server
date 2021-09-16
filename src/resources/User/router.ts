import { Router } from "express";
import { getAllUsers, getAUserById } from "./controller";

const router = Router();

router.get("/", getAllUsers);
router.get("/:id", getAUserById);

export default router;
