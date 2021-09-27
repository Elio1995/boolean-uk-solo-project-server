import { Request, Response } from "express";
import { createToken } from "../../utils/authGenerator";
import userClient from "../user/service";
import { User } from "@prisma/client";
import dbClient from "../../utils/database";

export const addProductsToCard = async (req: Request, res: Response) => {
  const loggedInUser = req.currentUser as User;
  const id = loggedInUser.id;
  const cart = req.body;
  console.log(cart);
  try {
    const newCart = await dbClient.product.upsert({
      where: { id: id },
      update: cart,
      create: cart,
    });
    res.json({ date: newCart });
  } catch (error) {
    console.log(error);

    res.json({ error });
  }
};
