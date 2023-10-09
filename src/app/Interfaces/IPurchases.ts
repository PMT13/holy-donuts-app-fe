import { ICart } from "./ICart";

export interface IPurchases{
  id: number,
  pastCarts: ICart[]
}