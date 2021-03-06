"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const router = (0, express_1.Router)();
router.get("/:userId", controller_1.getCart);
router.post("/:userId", controller_1.getUserCart);
router.post("/", controller_1.addCart);
router.delete("/:id", controller_1.deleteCart);
exports.default = router;
//# sourceMappingURL=router.js.map