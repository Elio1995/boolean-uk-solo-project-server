import { Request, Response } from "express";
import dbClient from "../../utils/database";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const allInCart = await dbClient.productsOnCarts.findMany({
      orderBy: {
        id: "asc",
      },
    });
    res.json({ data: allInCart });
  } catch (error) {
    console.error(error);
    res.json({ error });
  }
};

export const addProductOrIncreaseQuantity = async (
  req: Request,
  res: Response
) => {
  const { quantity, cartId, productId } = req.body;

  try {
    const alreadyInCart = await dbClient.productsOnCarts.findFirst({
      where: {
        productId: Number(productId),
      },
    });

    const cartExist = await dbClient.cart.findUnique({
      where: {
        id: Number(cartId),
      },
    });

    if (!cartExist) {
      res.json({ msg: `Basket with ID ${cartId} doesn't exict` });
    } else if (alreadyInCart) {
      const updatedQuantity = await dbClient.productsOnCarts.update({
        where: {
          id: alreadyInCart.id,
        },
        data: {
          ...alreadyInCart,
          quantity: alreadyInCart.qty + Number(quantity),
        },
      });
      res.json({ data: updatedQuantity });
    } else {
      const newCartItem = await dbClient.productsOnCarts.create({
        data: {
          quantity,
          cartId,
          productId,
        },
      });
      res.json({ data: newCartItem });
    }
  } catch (error) {
    console.error(error);
    res.json({ error });
  }
};

export const updateProductQuantity = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    const foundProduct = await dbClient.productsOnCarts.findUnique({
      where: { id },
    });

    if (foundProduct) {
      const updatedProduct = await dbClient.productsOnCarts.update({
        where: {
          id,
        },
        data: {
          ...foundProduct,
          qty: foundProduct?.quantity - 1,
        },
      });
      res.json({ data: updatedProduct });
    } else {
      res.json({ msg: `No ${id} found` });
    }
  } catch (error) {
    console.error(error);
    res.json({ error });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const deleted = await dbClient.productsOnCarts.delete({
      where: { id },
    });
    res.json({ msg: "Successfully removed from db" });
  } catch (error) {
    console.error(error);
    res.json({ error });
  }
};
