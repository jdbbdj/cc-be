import { Request, Response } from "express";
import { User } from "../models/User";
import CryptoJS from "crypto-js";
export const registerUser = async (req: Request, res: Response) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASSWORD_KEY
    ).toString(),
  });

  //save this to mongodb
  try {
    const savedUser = await newUser.save();
    res.status(201).send({ data: savedUser });
  } catch (e) {
    res.status(500).json(e);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    //get userdata through findOne
    const savedUser = await User.findOne({ username: req.body.username });
    if (!savedUser) {
      return res.status(401).json({ message: "No Username Found" });
    }
    //decrypt the data password
    const passwordHolder = CryptoJS.AES.decrypt(
      savedUser.password,
      process.env.PASSWORD_KEY
    );
    //utf encryption or else it will return error
    const strpasswordHolder = passwordHolder.toString(CryptoJS.enc.Utf8);

    if (strpasswordHolder !== req.body.password) {
      return res.status(401).json({ message: "Wrong Password" });
    }

    //seperate password using dot seperator
    const { password, ...others } = savedUser["_doc"];
    return res.status(200).json({
      message: "Login Successful",
      data: others,
    });
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
