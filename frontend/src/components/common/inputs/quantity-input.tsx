interface IProps {
  quantity: number,
  setQuantity:React.Dispatch<React.SetStateAction<number>>
}

export const QuantityInput:React.FC<IProps> = ({quantity,setQuantity})=>{
  const increase = () =>{
    setQuantity(prev=>prev+1)
  }
  
  const decrease = () =>{
    setQuantity(prev=>prev > 2? prev - 1 : 1)
  }
  return(
          <div className="mt-3 space-y-3">
        <label htmlFor="quantity" className="text-md font-semibold">Quantity</label>
        <div className="border border-violet-300 w-fit rounded-md">
          <button onClick={decrease} className="w-12aspect-square text-xl cursor-pointer">-</button>
          <input id='quantity' className="h-12 px-2 text-center outline-none" min={1} value={quantity} readOnly={true}/>
          <button onClick={increase} className="w-fit aspect-square text-xl cursor-pointer">+</button>
        </div>
      </div>
  )
}