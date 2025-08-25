import api from '.'

export const getAllProducts = async()=>{
  try{
    
    const response = await api('/product');
    return response.data
  }catch(err:any){
    throw err.response.data
  }
}