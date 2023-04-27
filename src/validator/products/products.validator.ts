import { IBase } from "../base.validator";

interface ProductValidator extends IBase {
  title: string;
  desc: string;
  img: string;
  categories: string[];
  size: string[];
  color: string[];
  price: number;
}

export type { ProductValidator };
