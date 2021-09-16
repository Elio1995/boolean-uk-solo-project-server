import { config } from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRouter from "./resources/auth/router";
import { JwtPayload } from "jsonwebtoken";
import loginAuth from "./middlewares/loginAuth";
import usersRouter from "./resources/user/router";

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

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Auth
app.use(authRouter);

app.use(loginAuth);

// Users
app.use("/user", usersRouter);

/* SETUP ROUTES */

app.get("*", (req, res) => {
  res.json({ ok: true });
});

/* START SERVER */

const port = process.env.PORT || 3030;

app.listen(port, () => {
  console.log(`\n🚀 Server is running on http://localhost:${port}/\n`);
});
