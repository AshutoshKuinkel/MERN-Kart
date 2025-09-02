import React from "react";
import type { IProduct } from "../../../types/product.types";
import { TiStarFullOutline } from "react-icons/ti";
import { TbCurrencyRupeeNepalese } from "react-icons/tb";
import { CiShoppingTag } from "react-icons/ci";

interface IProps {
  product: IProduct;
}
const Detail: React.FC<IProps> = ({ product }) => {
  return (
    <div className="px-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-600">{product.name}</h1>
        <div className="flex gap-1 items-center">
          <span className="text-lg text-gray-600 mt-1 ">4.5</span>
          <TiStarFullOutline size={22} className="text-yellow-400" />
        </div>
      </div>

      <div className="flex gap-3 mb-2 mt-3">
        <div className="flex items-center gap-2">
          <TbCurrencyRupeeNepalese className="text-violet-700" size={20} />
          <span>{product.price}</span>
        </div>
        {/* stock */}
        <div>
          {product.stock > 5 ? (
            <span className="text-green-500">In Stock</span>
          ) : (
            <span className="text-red-500">Out of Stock</span>
          )}
        </div>
      </div>

      {/* Brand & Category  */}
      <div className="flex gap-2 items-center ">
        <div className="flex items-center gap-2 border-violet-200 px-2 py-1 bg-[#f8f8f8]">
          <CiShoppingTag className="text-violet-700" size={20} />
          <span>{product.category.name}</span>
        </div>

        <div className="flex items-center gap-2 border-violet-200 px-2 py-1 bg-[#f8f8f8]">
          <CiShoppingTag className="text-violet-700" size={20} />
          <span>{product.brand.name}</span>
        </div>
      </div>

      {/* Description */}
      <div className="mt-5">
        <p className="text-gray-600 text-[15px]">
          {product.description ? product.description : "No Description."}
        </p>
      </div>

      {/* quantitiy input */}
      <div className="mt-3 space-y-3">
        <label htmlFor="quantity" className="text-md font-semibold">Quantity</label>
        <div className="border border-violet-300 w-fit rounded-md">
          <button className="w-12aspect-square text-xl cursor-pointer">-</button>
          <input id='quantity' className="h-12 px-2 text-center outline-none" defaultValue={1} min={1} type='number'/>
          <button className="w-fit aspect-square text-xl cursor-pointer">+</button>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex w-full gap-4 mt-6">
        {/* add to cart */}
        <button className="w-full bg-gray-800 text-white text-lg font-bold p-3 rounded-lg cursor-pointer">Add to Cart</button>

        {/* add to wishlist */}
        <button className="w-full bg-[#f8f8f8] text-gray-900 text-lg font-bold p-3 rounded-lg cursor-pointer border border-gray-500">Add to Wishlist</button>
      </div>
    </div>
  );
};

export default Detail;
