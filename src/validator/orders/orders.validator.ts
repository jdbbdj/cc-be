import { IBase } from "../base.validator";

interface OrderValidator extends IBase {
  userId: string;
  products: {
    productId: string;
    quantity: number;
  }[];
  amount: number;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  status?: "pending" | "approved" | "cancelled";
}

export type { OrderValidator };
