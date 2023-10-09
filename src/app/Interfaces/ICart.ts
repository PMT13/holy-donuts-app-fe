import {IProduct} from "./IProduct";


export interface ICart {
  id: number;
  products: IProduct[],
  totalCost: number;
  quantity: number;
}
