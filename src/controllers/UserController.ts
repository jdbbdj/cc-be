import { Request, Response, NextFunction } from "express";
import { User } from "../models/User";
import { verifyToken, verifyTokenAdmin } from "./VerifyToken";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

interface CustomRequest extends Request {
  user?: any; // Replace 'any' with the appropriate type for the user object
}

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

    //create a jwt encrypted token
    const accessToken = jwt.sign(
      { id: savedUser.id, isAdmin: savedUser.isAdmin },
      //jwt access key
      process.env.JWT_KEY,
      //expiration date
      { expiresIn: "3d" }
    );

    //seperate password using dot seperator
    const { password, ...details } = savedUser["_doc"];
    return res.status(200).json({
      message: "Login Successful",
      //insert accesstoken on return details should be dot seperated to include in one return with accesstoken
      //or just use details to seperate it with access token
      data: { ...details, accessToken },
    });
  } catch (e) {
    res.status(500).json(e);
  }
};

//delete user
export const deleteUser = (req: CustomRequest, res: Response) => {
  //reuse the above function for checking the user id and return its details
  verifyTokenAdmin(req, res, async () => {
    try {
      const deletedUser = await User.findByIdAndDelete(
        //check the id
        req.body.id
      );
      return res
        .status(200)
        .json({ message: "User deleted successfuly", data: deletedUser });
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  });
};

//update user
export const updateUser = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  //reuse the above function for checking the user id and return its details
  verifyToken(req, res, async () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASSWORD_KEY
      ).toString();

      try {
        const updatedUser = await User.findByIdAndUpdate(
          //check the id
          req.params.id,
          //update all contents
          { $set: req.body },
          { new: true }
        );
        return res
          .status(200)
          .json({ message: "User updated successfuly", data: updatedUser });
      } catch (err) {
        return res.status(500).json({ message: err });
      }
    }
  });
};
