import { SiInstagram } from "react-icons/si";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { ImYoutube } from "react-icons/im";

export const ConnectWithUs = () => {
  return (
    <div>
      <h1 className="font-bold text-2xl text-white items-center">
        Connect With Us!
      </h1>
      <div className="flex gap-3 hover:cursor-pointer text-white mt-2">
        <SiInstagram size={30}/>
        <FaFacebookSquare size={30}/>
        <FaSquareXTwitter size={30}/>
        <ImYoutube size={30}/>
      </div>
    </div>
  );
};
