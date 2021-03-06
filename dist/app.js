"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const router_1 = __importDefault(require("./resources/auth/router"));
const loginAuth_1 = __importDefault(require("./middlewares/loginAuth"));
const router_2 = __importDefault(require("./resources/users/router"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const router_3 = __importDefault(require("./resources/products/router"));
const router_4 = __importDefault(require("./resources/cart/router"));
const router_5 = __importDefault(require("./resources/cartProducts/router"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
/* SETUP MIDDLEWARE */
app.disable("x-powered-by");
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({ origin: process.env.FRONTEND_URL, credentials: true }));
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   next();
// });
// Auth
app.use(router_1.default);
// app.use(loginAuth);
// Users
app.use("/user", loginAuth_1.default, router_2.default);
// Products
app.use("/products", router_3.default);
// Cart
app.use("/cart", router_4.default);
// CartItems
app.use("/cartProducts", router_5.default);
/* SETUP ROUTES */
app.get("*", (req, res) => {
    res.json({ ok: true });
});
/* START SERVER */
const port = process.env.PORT || 3030;
app.listen(port, () => {
    console.log(`\nš Server is running on http://localhost:${port}/\n`);
});
//# sourceMappingURL=app.js.map