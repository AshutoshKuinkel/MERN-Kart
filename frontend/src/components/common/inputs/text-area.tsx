import { useFormContext } from 'react-hook-form'
import { LuAsterisk } from 'react-icons/lu'

type Props = {
  label:string, 
  id:string,
  name:string,
  placeholder?:string,
  required?: boolean
}

const TextArea = ({id,label,name,placeholder='placeholder',required=false}:Props) => {
  const {register,watch,formState:{errors}} = useFormContext()
  return (
    <div className="flex flex-col gap-2">
                <div className="flex">
                  <label htmlFor={id} className="text-gray-800 font-semibold text-lg">
                  {label}
                </label>
                {required && <LuAsterisk  size = {14} className="text-red-500"/>}
                </div>
                <textarea
                  id = {id}
                  {...register(name)}
                  value={watch(name)}
                  className={
                    `px-2 py-2 border rounded-md min-h-[200px] ${errors[name] 
                      ? 'border-red-500  focus:outline-red-500' 
                      :  'border-violet-400 focus:outline-violet-600'}`}
                    placeholder={placeholder}
                />
                {
                  errors[name as string] && <p className="text-red-500 text-xs h-1 -mt-1" >{errors[name] ? errors[name].message as string : ''}</p>
                }
              </div>
  )
}

export default TextArea
