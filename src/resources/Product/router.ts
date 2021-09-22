import { Router } from "express";
import { getAllProducts, getProductById, createNewProduct, deleteProducteById } from "./controller";

const router = Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", createNewProduct);
router.get("/:id", deleteProducteById);




export default router