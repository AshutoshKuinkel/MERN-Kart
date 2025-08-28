import  api  from ".";

export const getWishlist = async()=>{
  try{
    const response = await api('/wishlist');
    return response.data
  }catch(err:any){
    throw err.response.data
  }
}
