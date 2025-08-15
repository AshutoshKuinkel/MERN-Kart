
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import type { ILoginData } from "../../types/auth.types";
import { loginSchema } from "../../schema/auth.schema";
import Input from "../common/inputs/input";


const LoginForm = () => {

  const methods = useForm({
    defaultValues:{
    email:'',
    password:''
  },
  resolver:yupResolver(loginSchema),
  mode:'all'
  })

  // console.log(watch('email'))
  // console.log(watch('password'))
  

  const onSubmit = (data:ILoginData) =>{
    console.log(data)
  }


  return (
  <div>
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="mt-5 flex flex-col gap-6">
          {/* input fields */}
          <Input
          label="Email"
          id="email"
          name="email"
          placeholder="example@gmail.com"
          required
          />

          <Input
          label="Password"
          id="email"
          name="password"
          type="password"
          placeholder="********"
          required
          />

          {/* <div className="flex flex-col gap-2">
            <div className="flex">
              <label htmlFor="password" className="text-gray-800 font-semibold text-lg">
              Password
            </label>
            <LuAsterisk  size = {14} className="text-red-500"/>
            </div>
            <input 
              id={'password'}
              {...register('password')}
              value={watch('password')}
               className={
                `px-2 py-2 border rounded-md ${errors.password 
                  ? 'border-red-500  focus:outline-red-500' 
                  :  'border-violet-400   focus:outline-violet-600'}`
               } 
               placeholder="********"
              type="password" 
            />
            {
              errors.password && <p className="text-red-500 text-xs h-1 -mt-1">{errors.password ? errors.password.message : ''}</p>
            }
          </div> */}

          <div className="w-full mt-6">
            <button type="submit" className=" cursor-pointer w-full bg-violet-600 py-3 rounded-md text-white font-bold text-large transition-all duration-300 hover:bg-violet-800">
              Sign In
            </button>
          </div>

        </div>
      </form>
    </FormProvider>
  </div>
  )
}

export default LoginForm
