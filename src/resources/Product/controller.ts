import { Request, Response } from "express";
import  dbClient from "../../utils/database";

const {product} = dbClient


export const getAllProducts = async (req: Request, res: Response) => {
    try {
            const allProducts = await product.findMany();
            res.json({ data: allProducts });
          } catch (error) {
            console.log(error);
            res.json({ error: "Not working" });
          }
  };

export const getProductById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const productById = await product.findUnique({
      where: { id },
    });
    res.json({ data: productById });
  } catch (error) {
    console.log(error);

    res.json({ error: "Not working" });
  }
};

export const createNewProduct = async (req: Request, res: Response) => {
  const newProduct = req.body;
  try {
    const brandNewProduct = await product.create({ data: newProduct });
    res.json({ data: brandNewProduct });
  } catch (error) {
    res.json({ error: "Not working" });
  }
};

export const deleteProducteById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const deletedProduct = await product.delete({
      where: { id },
    });
    res.json({ data: deletedProduct });
  } catch (error) {
    res.json({ error: "Not working" });
  }
};