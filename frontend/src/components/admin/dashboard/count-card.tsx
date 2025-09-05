import React from 'react'

interface IProps{
  label:string,
  count:number
}

const CountCard:React.FC<IProps> = ({label,count}) => {
  return (
    <div className='border border-violet-500 border-dashed p-4 flex bg-violet-50 flex-col gap-6 shadow'>
      <h1 className='text-xl font-bold text-gray-700'>{label}</h1>
      <span className='w-full text-end text-lg font-bold text-violet-800'>{count}</span>
    </div>
  )
}

export default CountCard
