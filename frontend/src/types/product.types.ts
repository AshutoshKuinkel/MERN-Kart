import type { IUser } from "./auth.types"
import type { IBrandResponse } from "./brand.types"
import type { ICategoryResponse } from "./category.types"
import type { IImage, IResponse } from "./global.types"


export interface IProduct extends IResponse{
  name:string,
  coverImage:IImage,
  images?:string[],
  brand:IBrandResponse,
  category:ICategoryResponse,
  createdBy:IUser,
  isFeatured:boolean,
  stock:number,
  price:number,
  description?:string,
  size?:string
}