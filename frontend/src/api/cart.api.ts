import api from '.'

export const addToCart = async(data:{productId:string,quantity:number,})=>{
  try{
    const response = await api.post('/cart/addToCart',data);
    return response.data
  }catch(err:any){
    throw err.response.data
  }
}