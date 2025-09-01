import api from '.'

export const getAllProducts = async()=>{
  try{
    
    const response = await api('/product');
    return response.data
  }catch(err:any){
    throw err.response.data
  }
}

export const getById = async(id:string)=>{
  try{
    const response = await api.get(`/product/${id}`);
    return response.data
  }catch(err:any){
    throw err.response.data
  }
}
