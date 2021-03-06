import { Request, Response } from "express";
import { createToken } from "../../utils/authGenerator";
import userClient from "./service";
import { User } from "@prisma/client";
import dbClient from "../../utils/database";

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

export const createAUser = async (req: Request, res: Response) => {
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

// export const createAUser = async (req: Request, res: Response) => {
//   const userInfo = { ...req.body };
//   console.log(req.body);

//   console.log(userInfo);

//   try {
//     const CreatedUser = await userClient.create({
//       data: userInfo,
//     });

//     res.json(CreatedUser);
//   } catch (error) {
//     console.log(error);
//     res.json({ Error: "Fail to create a user" });
//   }
// };

// .localhost/3000/favourites/:userId

export const usersWithFovurites = async (req: Request, res: Response) => {
  const loggedInUser = req.currentUser as User;
  const id = loggedInUser.id;
  const favourite = req.body;
  console.log(favourite);
  try {
    const newFavourite = await dbClient.product.upsert({
      where: { id: id },
      update: favourite,
      create: favourite,
      //     create: {
      //       title: favourite.title
      // category:  favourite.category
      // price
      // description
      // image
      // quantity
    });
    res.json({ date: newFavourite });
  } catch (error) {
    console.log(error);

    res.json({ error });
  }
};
