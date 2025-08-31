import  api  from ".";

export const addToWishlist = async(id:string)=>{
  try{
    const response = await api.post('/wishlist/registerProductToWishlist',{id});
    return response.data
  }catch(err:any){
    throw err.response.data
  }
}


export const getWishlist = async()=>{
  try{
    const response = await api.get('/wishlist');
    return response.data
  }catch(err:any){
    throw err.response.data
  }
}
