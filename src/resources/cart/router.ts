import { Router } from "express";
import { getUserCart, deleteCart, getCart, addCart } from "./controller";

const router = Router();

router.get("/:userId", getCart);
router.post("/:userId", getUserCart);
router.post("/", addCart);
router.delete("/:id", deleteCart);

export default router;
