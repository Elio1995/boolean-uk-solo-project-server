import { Router } from "express";
import { createAUser } from "../user/controller";
import { loginUser, logOutUser } from "./controller";

const authRouter = Router();

authRouter.route("/login").post(loginUser);

authRouter.route("/signup").post(createAUser);

authRouter.route("/logout").get(logOutUser);

export default authRouter;
