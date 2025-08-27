import { CiHeart } from "react-icons/ci";
import { LiaCartArrowDownSolid } from "react-icons/lia";
import { IoPersonCircleOutline } from "react-icons/io5";
import { IoMdLogIn } from "react-icons/io";
import { logout } from "../../api/auth.api";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/auth.context";

export const IconSection = () =>{

  // const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null;
  const {user,setToken} = useAuth()
  console.log(user)

  const get_user_full_name = (user:any) =>{
    return `${user.firstName} ${user.lastName}`
  }

    // Handle Logout
  const handleLogout = async () => {
    try {
      await logout(); // Call the logout API
      localStorage.removeItem('user'); // Remove user from localStorage
      window.location.reload(); // Reload the page to reflect the changes
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

const navigate = useNavigate()

  return(
      <div className="flex gap-3 items-center">
        <CiHeart size={30} className="text-violet-600"/>
        <LiaCartArrowDownSolid size={28} className="text-violet-600"/>
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