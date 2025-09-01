import { useMutation } from "@tanstack/react-query";
import type { IProduct } from "../../types/product.types";
import { addToWishlist } from "../../api/wishlist.api";
import toast from "react-hot-toast";
import { Link } from "react-router";

interface IProps {
  product: IProduct;
}

const ProductCard: React.FC<IProps> = ({ product }) => {

  //add to wishlist mutation
  const {mutate} = useMutation({
    mutationFn:addToWishlist,
    onSuccess:(response)=>{
      toast.success(response?.message ?? 'Added to Wishlist')
    },
    onError:(error)=>{
      toast.error(error?.message?? 'Something went wrong')
    }
  })

  const addToList = ()=>{
    mutate(product._id)
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="border border-gray-300 rounded-md">
        <div className="max-w-[275px,100%] p-8">
          <img
            className=" rounded-lg cursor-pointer hover:scale-105 transition-all duration-500 hover:grayscale-25"
            src={product.coverImage.path}
            alt=""
          />
        </div>
      </div>
      {/* image section */}

      {/* name */}
      <h2 className="text-violet-700 font-bold text-2xl">{product.name}</h2>

      {/* description */}
      <p className="line-clamp-1 text-gray-500">
        {product.description
          ? product.description
          : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus ipsa cumque nobis aliquid excepturi quae magni assumenda quasi, mollitia, expedita, voluptates possimus aspernatur eum fuga ad numquam sunt hic optio."}
      </p>

      {/* price */}
      <p className="font-bold text-lg text-gray-800">NPR. {product.price}</p>

      {/* button */}
      <div>
        {/* view details */}
        <Link to={`/product/${product?._id}?name=${product?.name}`}>
        <button className=" px-7 py-2 font-bold text-white bg-gray-700 rounded-md cursor-pointer hover:grayscale-50 hover:translate-y-1 transition-all duration-300">
          View Details
        </button>
        </Link>
        
        {/* add to wishlist */}
        <button 
        onClick={addToList}
        className="px-2 py-2 font-bold text-white bg-violet-600 rounded-md ml-3 cursor-pointer hover:grayscale-50 hover:translate-y-1 transition-all duration-300">
          Add to Wishlist
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
