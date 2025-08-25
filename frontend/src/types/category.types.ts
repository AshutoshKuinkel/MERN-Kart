import type { IResponse } from "./global.types";

export interface ICategoryResponse extends IResponse{
  name:string,
  description?:string,
}