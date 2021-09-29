import { Router } from "express";

import {
  getProducts,
  addProductOrIncreaseQuantity,
  updateProductQuantity,
  deleteProduct,
} from "./controller";

const router = Router();

router.get("/", getProducts);
router.post("/", addProductOrIncreaseQuantity);
router.patch("/:id", updateProductQuantity);
router.delete("/:id", deleteProduct);

export default router;
