import { Request, Response } from "express";
import dbClient from "../../utils/database";

// export const addProductsToCard = async (req: Request, res: Response) => {
//   const loggedInUser = req.currentUser as User;
//   const id = loggedInUser.id;
//   const cart = req.body;
//   console.log(cart);
//   try {
//     const newCart = await dbClient.product.upsert({
//       where: { id: id },
//       update: cart,
//       create: cart,
//     });
//     res.json({ date: newCart });
//   } catch (error) {
//     console.log(error);

//     res.json({ error });
//   }
// };

export const getCart = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId);

  try {
    const foundCart = await dbClient.cart.findFirst({
      where: { userId },
      include: {
        products: {
          orderBy: {
            id: "1",
          },
        },
      },
    });

    res.json({ data: foundCart });
  } catch (error) {
    console.error(error);
    res.json({ error });
  }
};

export const getUserCart = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId);
  const cartToCreate = req.body;

  try {
    const foundCart = await dbClient.cart.findFirst({
      where: { userId },
      include: { products: true },
    });

    if (!foundCart) {
      const newCart = await dbClient.cart.create({
        data: { ...cartToCreate },
        include: { products: true },
      });

      res.json({ data: newCart });
    } else {
      res.json({ data: foundCart });
    }
  } catch (error) {
    console.error(error);
    res.json({ error });
  }
};

export const addCart = async (req: Request, res: Response) => {
  const newCart = req.body;

  try {
    const added = await dbClient.cart.create({
      data: { ...newCart },
    });
    res.json({ data: added });
  } catch (error) {
    console.error(error);
    res.json({ error });
  }
};

export const deleteCart = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    const removed = await dbClient.cart.delete({
      where: { id },
    });
    res.json({ msg: "removed" });
  } catch (error) {
    console.error(error);
    res.json({ error });
  }
};
