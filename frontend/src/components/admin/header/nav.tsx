
import toast from 'react-hot-toast'
import { logout } from '../../../api/auth.api'
import { useAuth } from '../../../context/auth.context'

const AdminNavbar = () => {
  const {user} = useAuth()
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
  return (
    <nav className='w-full h-full flex justify-between items-center px-6'>
      <div>
        <p className='capitalize text-lg font-semibold text-violet-700 italic'>Welcome Back {(user?.role ?? 'ADMIN'.toLocaleLowerCase())}</p>
      </div>

      <div>
        <p className='text-lg font-semi-bold text-violet-800'>{get_user_full_name(user)}</p>
        <div>
          <p onClick={handleLogout} className='text-[16px] text-red-500 font-semibold cursor-pointer'>Logout</p>
        </div>
      </div>
    </nav>
  )
}

export default AdminNavbar
