import type { IProduct } from "./product.types";

export interface IWishlist{
  _id:string,
  product:IProduct,
  user:string
}