"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("../users/controller");
const controller_2 = require("./controller");
const authRouter = (0, express_1.Router)();
authRouter.route("/login").post(controller_2.loginUser);
authRouter.route("/signup").post(controller_1.createAUser);
authRouter.route("/logout").get(controller_2.logOutUser);
exports.default = authRouter;
//# sourceMappingURL=router.js.map