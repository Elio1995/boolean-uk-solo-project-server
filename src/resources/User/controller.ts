import { Request, Response } from "express";
import { createToken } from "../../utils/authGenerator";
import userClient from "./service";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await userClient.findMany();
    res.json({ data: allUsers });
  } catch (error) {
    console.log(error);
    res.json({ error: "The is an issue" });
  }
};

export const getAUserById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    const userById = await userClient.findUnique({
      where: { id },
    });
    res.json({ date: userById });
  } catch (error) {
    console.log(error);

    res.json({ error: `Could not find the user with ${id}` });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const newUser = req.body;
  // This is my modified create version, with the password hashing!
  const savedUser = await userClient.createWithHash(newUser);

  const token = createToken({
    id: savedUser.id,
    name: savedUser.firstName,
  });

  // This creates a cookie that can't be accessed by Javascript in the Frontend
  // httpOnly: true
  res.cookie("token", token, { httpOnly: true });

  res.json({ data: { username: savedUser.username } });
};
