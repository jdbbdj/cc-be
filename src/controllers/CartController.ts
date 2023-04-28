import { Request, Response } from "express";
import { Cart } from "../models/Cart";

export const createCart = async (req: Request, res: Response) => {
  const newCart = new Cart({
    userId: req.body.userId,
    products: req.body.products,
  });

  //save this to mongodb
  try {
    const savedCart = await newCart.save();
    res.status(201).send({ data: savedCart });
  } catch (e) {
    res.status(500).json(e);
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    let products;
    products = await Cart.find();
    res.status(200).send({ data: products });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getProductsByID = async (req: Request, res: Response) => {
  try {
    let product;
    product = await Cart.findById(req.params.id);
    res.status(200).send({ data: product });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getProductsBySize = (req: Request, res: Response) => {
  console.log("HERE");
  res.send(
    "ID and Name of the client::" +
      "id" +
      req.query.id +
      "name: " +
      req.query.name
  );
};

export const getProductsByIDandSize = (req: Request, res: Response) => {
  console.log("HERE2");
  res.send(
    "ID and Name of the client::" +
      "id" +
      req.query.id +
      "name: " +
      req.query.name +
      "params:" +
      req.params.id
  );
};
