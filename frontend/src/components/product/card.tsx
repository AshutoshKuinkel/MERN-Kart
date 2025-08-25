import image from "../../assets/photo-1505740420928-5e560c06d30e.jpg";

const ProductCard = () => {
  return (
    <div className="flex flex-col gap-2">

      <div className="border border-gray-300 rounded-md">
        <div className="max-w-[275px,100%] p-8">
          <img className=" rounded-lg cursor-pointer hover:scale-122 transition-all duration-500 hover:grayscale-25" src={image} alt="" />
        </div>
      </div>
      {/* image section */}

      {/* name */}
      <h2 className="text-violet-700 font-bold text-2xl">Product Name</h2>

      {/* description */}
      <p className="line-clamp-1 text-gray-500">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum aperiam
        quo non exercitationem asperiores. In eveniet blanditiis hic ex
        aspernatur nostrum rerum! Asperiores consequuntur nam est quis provident
        a vero.
      </p>

      {/* price */}
      <p className="font-bold text-lg text-gray-800">NPR. 25,999</p>

      {/* button */}
      <div>
        {/* view details */}
        <button className=" px-7 py-2 font-bold text-white bg-gray-700 rounded-md cursor-pointer hover:grayscale-50 hover:translate-y-1 transition-all duration-300">View Details</button>
        {/* add to wishlist */}
        <button className="px-2 py-2 font-bold text-white bg-violet-600 rounded-md ml-3 cursor-pointer hover:grayscale-50 hover:translate-y-1 transition-all duration-300">Add to Wishlist</button>
      </div>
    </div>
  );
};

export default ProductCard;
