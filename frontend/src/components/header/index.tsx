

import { IconSection } from "./icons";
import { NavLinks } from "./nav-links";



const Header = () => {
  return (
    <div className="flex w-full justify-between px-36 items-center">
      {/* logo */}
      <div className="w-[120px] border">
        <img src="./logo.png" alt="logo" />
      </div>

      {/* nav links */}
      <NavLinks/>

      {/* icon section */}
      <IconSection/>

    </div>
  )
}

export default Header


