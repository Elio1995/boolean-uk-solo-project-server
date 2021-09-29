"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const router = (0, express_1.Router)();
router.get("/", controller_1.getAllProducts);
router.get("/:id", controller_1.getProductById);
router.post("/", controller_1.createNewProduct);
router.get("/:id", controller_1.deleteProducteById);
exports.default = router;
//# sourceMappingURL=router.js.map