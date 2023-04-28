import { Request, Response } from "express";
import { Order } from "../models/Order";

export const createOrder = async (req: Request, res: Response) => {
  const newOrder = new Order({
    userId: req.body.userId,
    products: req.body.products,
    amount: req.body.amount,
    address: req.body.address,
    status: "pending",
  });

  //save this to mongodb
  try {
    const savedOrder = await newOrder.save();
    res.status(201).send({ data: savedOrder });
  } catch (e) {
    res.status(500).json(e);
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    let products;
    products = await Order.find();
    res.status(200).send({ data: products });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getProductsByID = async (req: Request, res: Response) => {
  try {
    let product;
    product = await Order.findById(req.params.id);
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
