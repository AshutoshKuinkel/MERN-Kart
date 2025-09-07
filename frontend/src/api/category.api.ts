import api from '.'

export const getAllCategory = async()=>{
  try{
    
    const response = await api('/category');
    return response.data
  }catch(err:any){
    throw err.response.data
  }
}

export const postCategory = async()=>{
  try{
    
    const response = await api('/category');
    return response.data
  }catch(err:any){
    throw err.response.data
  }
}