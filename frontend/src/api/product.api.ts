import api from '.'

export const getAllProducts = async()=>{
  try{
    
    const response = await api('/products');
    return response.data
  }catch(err:any){
    throw err.response.data
  }
}