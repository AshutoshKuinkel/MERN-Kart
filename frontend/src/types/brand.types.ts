import type { IImage, IResponse } from "./global.types";

export interface IBrandResponse extends IResponse {
  name:string,
  logo:IImage,
  description?:string
}