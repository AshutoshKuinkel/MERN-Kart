import { ConnectWithUs } from "./footer-connect";
import { Contact } from "./footer-contact";
import { UsefulLinks } from "./footer-useful-links";



const Footer = () => {
  return (
    <div className="bg-violet-600 flex justify-evenly p-7 align-baseline w-full mt-6">
      {/* Useful links */}
      <UsefulLinks/>
      {/* Contact */}
      <Contact/>

      {/* Connect with us */}
      <ConnectWithUs/>
    </div>
  );
};

export default Footer;

