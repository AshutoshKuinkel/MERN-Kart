import { useQuery } from "@tanstack/react-query";
import { getWishlist } from "../../api/wishlist.api";
import WishlistCard from "./card";
import type { IWishlist } from "../../types/wishlist.types";
// import WishlistCard from './card'

const Wishlist = () => {
  const { data} = useQuery({
    queryFn: getWishlist,
    queryKey: ["getWishlist"],
  });

  console.log(data);

  return (
    <div>
      {data?.data.map((product: IWishlist) => (
        <WishlistCard item={product} key={product._id} />
      ))}
    </div>
  );
};

export default Wishlist;
