
import {type ComponentType} from 'react'
import { useAuth } from '../../context/auth.context'
import { Navigate, useLocation } from 'react-router'
import toast from 'react-hot-toast'
import type { Role } from '../../types/enum'


export function withAuth  <T>(Component:ComponentType<T>,roles:Role[]){
  return function ProtectedComponent (props:any){

    const {isLoading,user} = useAuth()
    const location = useLocation()

    //authentication logic
    if(isLoading){
      return <div>Loading...</div>
    }

    if(!user){
      toast.error('Please login first.')
      return <Navigate to={'/login'} replace={true} state={{from:location.pathname}}/>
    }

    //role based
    if(roles && !roles.includes(user.role)){
      toast.error('Unauthorised. You cannot access this resource.')
      return <Navigate to={'/login'} replace={true} state={{from:location.pathname}}/>
    }

    return <Component{...props}/>
  }
}

export default withAuth
