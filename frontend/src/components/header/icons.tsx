import { CiHeart } from "react-icons/ci";
import { LiaCartArrowDownSolid } from "react-icons/lia";
import { IoPersonCircleOutline } from "react-icons/io5";

export const IconSection = () =>{
  return(
      <div className="flex gap-3 items-center">
        <CiHeart size={30} className="text-violet-600"/>
        <LiaCartArrowDownSolid size={28} className="text-violet-600"/>
        <div className="flex items-center gap-2">
          <IoPersonCircleOutline size={28} className="text-violet-600"/>
          <div className="mt-4">
            <p className="font-semibold">John Doe</p>
            <p className="text-violet-600">Logout</p>
          </div>
        </div>
      </div>
  )
}