import axios from 'axios';
import type { ILoginData, ISignupData } from '../types/auth.types';

export const login = async(data:ILoginData)=>{
  try{

    const response = await axios.post('https://mern-kart-xg36.onrender.com/api/auth/login',data)
    console.log(response)
    return response.data

  }catch(err:any){
    console.log(err)
    throw err.response.data
  }
}

export const signup = async(data:ISignupData)=>{
  try{
    const response = await axios.post('https://mern-kart-xg36.onrender.com/api/auth/login',data)
    console.log(response)
    return response.data
  }catch(err:any){
    console.log(err)
    throw err.response.data
  }
}