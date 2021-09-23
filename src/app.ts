import { config } from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRouter from "./resources/auth/router";
import { JwtPayload } from "jsonwebtoken";
import loginAuth from "./middlewares/loginAuth";
import usersRouter from "./resources/user/router";
import cookieParser from "cookie-parser";
import productRouter from "./resources/product/router";

config();

const app = express();

declare global {
  namespace Express {
    interface Request {
      currentUser: string | JwtPayload;
    }
  }
}

/* SETUP MIDDLEWARE */

app.disable("x-powered-by");

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   next();
// });

// Auth
app.use(authRouter);

// app.use(loginAuth);

// Users
app.use("/user", loginAuth, usersRouter);

// Products
app.use("/products", productRouter);

/* SETUP ROUTES */

app.get("*", (req, res) => {
  res.json({ ok: true });
});

/* START SERVER */

const port = process.env.PORT || 3030;

app.listen(port, () => {
  console.log(`\n🚀 Server is running on http://localhost:${port}/\n`);
});
