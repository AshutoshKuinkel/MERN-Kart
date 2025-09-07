import type { IResponse } from "./global.types";

export interface ICategoryData{
  name:string,
  description:string,
}

export interface ICategoryResponse extends IResponse{
  name:string,
  description?:string
}

