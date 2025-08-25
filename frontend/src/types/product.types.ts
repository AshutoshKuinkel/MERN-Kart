import type { IUser } from "./auth.types"
import type { IBrandResponse } from "./brand.types"
import type { ICategoryResponse } from "./category.types"
import type { IImage } from "./global.types"


export interface IProduct{
  name:string,
  coverImage:IImage,
  images?:IImage[],
  brand:IBrandResponse,
  category:ICategoryResponse,
  createdBy:IUser,
  isFeatured:boolean,
  stock:number,
  price:number,
  description?:string,
  size?:string
}