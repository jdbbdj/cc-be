import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import CryptoJS from "crypto-js";
import { User } from "../models/User";
//create a typesetter for request
interface CustomRequest extends Request {
  user?: any; // Replace 'any' with the appropriate type for the user object
}

//this is for normal user auth checking
//this is not async, and will be used inside async on other controller
export const verifyToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.token;

  if (authHeader) {
    //remove the "Bearer" on token
    const token = authHeader.toString().split(" ")[1];
    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
      if (err) {
        res.status(401).json({ message: "Token is invalid" });
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    return res.status(401).json({ message: "You aren't authenticated" });
  }
};

//update password
export const updateUsername = (
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
