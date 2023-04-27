import { IBase } from "../base.validator";

interface CartsValidator extends IBase {
  image: String;
  images: Array<String>;
  name: String;
  price: Number;
  sizes: Array<Number>;
  description: String;
}

export type { CartsValidator };
