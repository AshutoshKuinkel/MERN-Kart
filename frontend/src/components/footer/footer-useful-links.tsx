import { Link } from "react-router";

export const UsefulLinks = () => {
  return (
    <div className="flex flex-col text-white items-center">
      <h3 className="font-bold text-2xl underline">Useful Links</h3>
      <div className="flex flex-col items-center mt-2 ">
        <Link to="/" className="hover:text-xl transition-all duration-200">
          Home
        </Link>
        <Link
          to="/products"
          className="hover:text-xl transition-all duration-200"
        >
          Products
        </Link>
        <Link
          to="/about-us"
          className="hover:text-xl transition-all duration-200"
        >
          About Us
        </Link>
        <Link
          to="/contact-us"
          className="hover:text-xl transition-all duration-200"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
};