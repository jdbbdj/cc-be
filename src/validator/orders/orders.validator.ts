import { IBase } from "../base.validator";

interface IOrders extends IBase {
  image: String;
  images: Array<String>;
  name: String;
  price: Number;
  sizes: Array<Number>;
  description: String;
}

export type { IOrders };
