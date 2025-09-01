
import type { IProduct } from "../../types/product.types";

interface IProps {
  item:{
    _id:string,
    product: IProduct;
  }
}

const WishlistCard: React.FC<IProps> = ({item}) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="border border-gray-300 rounded-md max-w-[275px]">
        <div className="max-w-[275px] p-8">
          <img
            className=" rounded-lg cursor-pointer hover:scale-122 transition-all duration-500 hover:grayscale-25 max-w-full max-h-[275px]"
            src={item.product.coverImage.path}
            alt=""
          />
        </div>
      </div>
      {/* image section */}

      {/* name */}
      <h2 className="text-violet-700 font-bold text-2xl">{item.product.name}</h2>

      {/* description */}
      <p className="line-clamp-1 text-gray-500">
        {item.product.description
          ? item.product.description
          : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus ipsa cumque nobis aliquid excepturi quae magni assumenda quasi, mollitia, expedita, voluptates possimus aspernatur eum fuga ad numquam sunt hic optio."}
      </p>

      {/* price */}
      <p className="font-bold text-lg text-gray-800">NPR. {item.product.price}</p>

      {/* button */}
      <div>
        {/* view details */}
        <button className=" px-7 py-2 font-bold text-white bg-gray-700 rounded-md cursor-pointer hover:grayscale-50 hover:translate-y-1 transition-all duration-300">
          View Details
        </button>
        {/* add to wishlist */}
        <button className="px-2 py-2 font-bold text-white bg-violet-600 rounded-md ml-3 cursor-pointer hover:grayscale-50 hover:translate-y-1 transition-all duration-300">
          Add to Wishlist
        </button>
      </div>
    </div>
  );
};

export default WishlistCard;
