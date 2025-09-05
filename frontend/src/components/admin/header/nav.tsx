import React from 'react'
import { useAuth } from '../../../context/auth.context'

const AdminNavbar = () => {
  const {user} = useAuth()
  return (
    <nav className='w-full h-full flex justify-between items-center px-6'>
      <div>
        <p className='capitalize text-lg font-semibold text-violet-700 italic'>Welcome Back {(user?.role ?? 'ADMIN'.toLocaleLowerCase())}</p>
      </div>

      <div>
        <p className='text-lg font-semi-bold text-violet-800'>Super Admin</p>
        <div>
          <p className='text-[16px] text-red-500 font-semibold cursor-pointer'>Logout</p>
        </div>
      </div>
    </nav>
  )
}

export default AdminNavbar
