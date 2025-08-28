import { CiHeart } from "react-icons/ci";
import { LiaCartArrowDownSolid } from "react-icons/lia";
import { IoPersonCircleOutline } from "react-icons/io5";
import { IoMdLogIn } from "react-icons/io";
import { logout } from "../../api/auth.api";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../context/auth.context";
import toast from "react-hot-toast";

export const IconSection = () =>{

  // const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null;
  const {user} = useAuth()

  console.log(user)

  const get_user_full_name = (user:any) =>{
    return `${user.firstName} ${user.lastName}`
  }

    // Handle Logout
  const handleLogout = async () => {
    try {
      await logout(); // Call the logout API
      localStorage.removeItem('user'); // Remove user from localStorage
      localStorage.removeItem('token')
      toast.success('Logged out')
      setTimeout(() => {
      window.location.reload(); // Reload the page after a small delay
    }, 1000); // Reload the page to reflect the changes
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

const navigate = useNavigate()

  return(
      <div className="flex gap-3 items-center">
        <Link to={'/wishlist'}><CiHeart size={30} className="text-violet-600"/></Link>
        <Link to={'/cart'}><LiaCartArrowDownSolid size={28} className="text-violet-600"/></Link>
        {user ? <div className="flex items-center gap-2">
          <IoPersonCircleOutline size={28} className="text-violet-600"/>
          <div className="mt-4">
            <p className="font-semibold">{get_user_full_name(user)}</p>
            <p className="text-violet-600 cursor-pointer" onClick={handleLogout}>Logout</p>
          </div>
        </div> :
        <div className="cursor-pointer border border-violet-400 px-6 rounded-md flex flex-col gap-1 items-center">
          <IoMdLogIn size={28} className="text-violet-600"/>
          <p className="text-violet-600 cursor-pointer" onClick={()=>navigate('/login')}>Login</p>
        </div>
        }
      </div>
  )
}