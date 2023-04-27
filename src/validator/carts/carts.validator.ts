import { IBase } from "../base.validator";

interface Product {
  productId: string;
  quantity: number;
}

interface CartsValidator {
  userId: string;
  products: Product[];
}

export type { CartsValidator };
