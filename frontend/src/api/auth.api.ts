
import type { ILoginData, ISignupData } from '../types/auth.types';
import api from './index'

const API_URL = import.meta.env.VITE_API_BASE_URL

export const login = async(data:ILoginData)=>{
  try{
    console.log(data,API_URL)
    const response = await api.post(`/auth/login`,data)
    console.log(response)
    return response.data

  }catch(err:any){
    console.log(err)
    throw err.response.data
  }
}

export const signup = async(data:ISignupData)=>{
  try{
    const response = await api.post(`/auth/register`,data)
    console.log(response)
    return response.data
  }catch(err:any){
    console.log(err)
    throw err.response.data
  }
}


export const logout = async()=>{
  try{
    const response = await api.post('/auth/logout')
    return response.data
  }catch(err:any){
    console.log(err)
    throw err.response.data
  }
}