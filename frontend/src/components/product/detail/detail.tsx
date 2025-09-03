import React from "react";
import type { IProduct } from "../../../types/product.types";
import { TiStarFullOutline } from "react-icons/ti";
import { TbCurrencyRupeeNepalese } from "react-icons/tb";
import { CiShoppingTag } from "react-icons/ci";
import { QuantityInput } from "../../common/inputs/quantity-input";
import { useMutation } from "@tanstack/react-query";
import { addToCart } from "../../../api/cart.api";
import toast from "react-hot-toast";
import { addToWishlist } from "../../../api/wishlist.api";

interface IProps {
  product: IProduct;
}
const Detail: React.FC<IProps> = ({ product }) => {
  const [quantity,setQuantity] = React.useState(1)

  const {mutate:cart_mutate, isPending: is_cart_pending} = useMutation({
    mutationFn:addToCart,
    onSuccess:(response)=>{
      toast.success(response.message ?? 'Product Added to Cart')
    },
    onError:(err)=>{
      toast.error(err.message ?? 'Something went wrong')
    }
  })

  //add to wishlist mutation:
  const {mutate:wishlist_mutate, isPending: is_wishlist_pending} = useMutation({
    mutationFn:addToWishlist,
    onSuccess:(response)=>{
      toast.success(response.message ?? 'Product Added to Wishlist')
    },
    onError:(err)=>{
      toast.error(err.message ?? 'Something went wrong')
    }
  })

  const handle_wishlist_click = ()=>{
    wishlist_mutate(product._id)
  }

  //mutate cart
  const handle_cart_click = ()=>{
    cart_mutate({quantity,productId:product._id})
  }

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
      <QuantityInput quantity={quantity} setQuantity={setQuantity}/>


      {/* Buttons */}
      <div className="flex w-full gap-4 mt-6">
        {/* add to cart */}
        <button 
          onClick={handle_cart_click}
          disabled={is_cart_pending}
          className="disabled:bg-gray-600 disabled:cursor-not-allowed w-full bg-gray-800 text-white text-lg font-bold p-3 rounded-lg cursor-pointer">
          {is_cart_pending ? "Adding..." : 'Add to Cart'}
          </button>

        {/* add to wishlist */}
        <button 
        onClick={handle_wishlist_click}
        className="w-full bg-[#f8f8f8] text-gray-900 text-lg font-bold p-3 rounded-lg cursor-pointer border border-gray-500">
          {is_wishlist_pending ? "Adding..." : 'Add to Wishlist'}
        </button>
      </div>
    </div>
  );
};

export default Detail;

