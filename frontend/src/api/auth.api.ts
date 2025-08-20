import axios from 'axios';
import type { ILoginData } from '../types/auth.types';

export const login = async(data:ILoginData)=>{
  try{

    const response = await axios.post('https://mern-kart-56yx.onrender.com/api/auth/login',data)
    console.log(response)
    return response.data

  }catch(err:any){
    console.log(err)
    throw err.response.data
  }
}