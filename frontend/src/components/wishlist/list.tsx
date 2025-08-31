import { useQuery } from "@tanstack/react-query";
import { getWishlist } from "../../api/wishlist.api";
import WishlistCard from "./card";
import type { IProduct } from "../../types/product.types";
// import WishlistCard from './card'

const Wishlist = () => {
  const { data } = useQuery({
    queryFn: getWishlist,
    queryKey: ["getWishlist"],
  });

  console.log(data);

  return (
    <div>
      {data?.data.map((product: IProduct) => (
        <WishlistCard product={product} key={product._id} />
      ))}
    </div>
  );
};

export default Wishlist;
