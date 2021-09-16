import { Request, Response } from "express";
import { findUserWithValidation } from "./services";
import { User } from ".prisma/client";

import { createToken } from "../../utils/authGenerator";

export const loginUser = async (req: Request, res: Response) => {
  const userCreds: User = req.body;

  try {
    const loggedUser = await findUserWithValidation(userCreds);
    const token = createToken({
      id: loggedUser.id,
      email: loggedUser.email,
    });

    res.cookie("token", token, { httpOnly: true });

    res.json({
      user: {
        msg: "Well done! You are in",
        id: loggedUser.id,
        role: loggedUser.role,
        email: loggedUser.email,
      },
    });
  } catch (error) {
    console.error({ error });
    res.status(401).json({ error: error });
  }
};

export const logOutUser = async (req: Request, res: Response) => {
  res.clearCookie("token");
  res.json({ user: null });
};
