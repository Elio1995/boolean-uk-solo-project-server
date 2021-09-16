import { Router } from "express";
import { createUser } from "../user/controller";
import { loginUser, logOutUser } from "./controller";

const authRouter = Router();

authRouter.route("/login").post(loginUser);

authRouter.route("/signup").post(createUser);

authRouter.route("/logout").get(logOutUser);

export default authRouter;
