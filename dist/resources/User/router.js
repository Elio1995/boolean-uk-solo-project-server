"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const router = (0, express_1.Router)();
router.get("/", controller_1.getAllUsers);
router.get("/:id", controller_1.getAUserById);
router.patch("/favourites", controller_1.usersWithFovurites);
exports.default = router;
//# sourceMappingURL=router.js.map