import { Request, Response } from "express";
import { Product } from "../models/Product";

export const createProduct = async (req: Request, res: Response) => {
  const newProduct = new Product({
    title: req.body.title,
    desc: req.body.desc,
    img: req.body.img,
    categories: req.body.categories,
    size: req.body.sizes,
    color: req.body.color,
    price: req.body.price,
  });

  //save this to mongodb
  try {
    const savedProduct = await newProduct.save();
    res.status(201).send({ data: savedProduct });
  } catch (e) {
    res.status(500).json(e);
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    let products;
    products = await Product.find();
    res.status(200).send({ data: products });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getProductsByID = async (req: Request, res: Response) => {
  try {
    let product;
    product = await Product.findById(req.params.id);
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
