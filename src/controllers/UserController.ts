import { Request, Response } from "express";
import { User } from "../models/User";

export const registerUser = async (req: Request, res: Response) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  //save this to mongodb
  try {
    const savedUser = await newUser.save();
    res.status(201).send(`Successfully created user ${req.body.username}`);
  } catch (e) {
    res.status(500).json(e);
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    let products;
    products = await User.find();
    res.status(200).send({ data: products });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getProductsByID = async (req: Request, res: Response) => {
  try {
    let product;
    product = await User.findById(req.params.id);
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
