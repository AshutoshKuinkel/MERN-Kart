import type { IProduct } from './product.types';
import type { Role } from "./enum"
import type { IResponse } from "./global.types"

export interface ILoginData{
  email:string,
  password:string
}

export interface ISignupData{
  firstName:string,
  lastName:string
  email:string,
  password:string,
  phone:string
}

export interface IUser extends IResponse{
  firstName:string,
  lastName:string,
  email:string,
  role:Role,
  phone:string
  wishList:string | IProduct[]
}