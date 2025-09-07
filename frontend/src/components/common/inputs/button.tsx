import type React from "react"

interface IProps{
  isPending:boolean
  label:string
  type:'submit' | 'button'
}

const Button:React.FC<IProps> = ({isPending,label,type='button'}) => {
  return (
    <div>
      <div className="w-full">
              <button
                type={type}
                disabled={isPending}
                className=" cursor-pointer w-full bg-violet-600 py-3 rounded-md text-white font-bold text-large transition-all duration-300 hover:bg-violet-800  disabled:bg-violet-500 disabled:cursor-not-allowed"
              >
                {label}
              </button>
        </div>
    </div>
  )
}

export default Button
