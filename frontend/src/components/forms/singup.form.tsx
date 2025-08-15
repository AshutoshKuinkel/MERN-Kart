import { LuAsterisk } from "react-icons/lu";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { signupSchema } from "../../schema/auth.schema";
import type { ISignupData } from "../../types/auth.types";

const SignupForm = () => {

  const {register,handleSubmit,watch,formState:{errors}} = useForm({
    defaultValues:{
      firstName:'',
      lastName:'',
      email:'',
      password:'',
      phone:''
    },
    resolver:yupResolver(signupSchema),
    mode:'all'
  })

  const onSubmit = (data:ISignupData)=>{
    console.log(data)
  }

  return (
   <form onSubmit={handleSubmit(onSubmit)}>
     <div>

        <div className="mt-5 flex flex-col gap-1">
          <div className="flex">
            <label htmlFor="firstName" className="text-gray-800 font-semibold text-lg">First Name:</label>
            <LuAsterisk  size = {14} className="text-red-500"/>
          </div>
          <input id={'firstName'} {...register('firstName')} value={watch('firstName')} 
          className={
            `px-2 py-2 border rounded-md ${errors.firstName
              ? 'border-red-500  focus:outline-red-500' 
              :  'border-violet-400 focus:outline-violet-600'}`}
          placeholder="Your First Name" autoComplete="none"
           
          />
          {
              errors.firstName && <p className="text-red-500 text-xs">{errors.firstName ? errors.firstName.message : ''}</p>
          }
        </div>
        
        <div className="mt-5 flex flex-col gap-1">
          <div className="flex">
            <label htmlFor="lastName" className="text-gray-800 font-semibold text-lg">Last Name:</label>
            <LuAsterisk  size = {14} className="text-red-500"/>
          </div>
          <input id={'lastName'} {...register('lastName')} value={watch('lastName')} 
          className={
            `px-2 py-2 border rounded-md ${errors.lastName
              ? 'border-red-500  focus:outline-red-500' 
              :  'border-violet-400 focus:outline-violet-600'}`}
          placeholder="Your Last Name" autoComplete="none"
          />
          {
              errors.lastName && <p className="text-red-500 text-xs">{errors.lastName ? errors.lastName.message : ''}</p>
          }
        </div>

        <div className="mt-5 flex flex-col gap-1">
          <div className="flex">
            <label htmlFor="email" className="text-gray-800 font-semibold text-lg">Email:</label>
            <LuAsterisk  size = {14} className="text-red-500"/>
          </div>
          <input id={'email'} {...register('email')} value={watch('email')} 
          className={
            `px-2 py-2 border rounded-md ${errors.email 
              ? 'border-red-500  focus:outline-red-500' 
              :  'border-violet-400 focus:outline-violet-600'}`}
          placeholder="example@gmail.com"
          />
          {
              errors.email && <p className="text-red-500 text-xs">{errors.email ? errors.email.message : ''}</p>
          }
        </div>

        <div className="mt-5 flex flex-col gap-1">
          <div className="flex">
            <label htmlFor="password" className="text-gray-800 font-semibold text-lg">Password:</label>
            <LuAsterisk  size = {14} className="text-red-500"/>
          </div>
          <input id={'password'} {...register('password')} value={watch('password')} 
          className={
           `px-2 py-2 border rounded-md ${errors.password 
             ? 'border-red-500  focus:outline-red-500' 
             :  'border-violet-400 focus:outline-violet-600'}`}
          placeholder="********" type="password" autoComplete="none"
          />
          {
              errors.password && <p className="text-red-500 text-xs">{errors.password ? errors.password.message : ''}</p>
          }
        </div>

        <div className="mt-5 flex flex-col gap-1">
          <div className="flex">
            <label htmlFor="phone" className="text-gray-800 font-semibold text-lg">Phone:</label>
            <LuAsterisk  size = {14} className="text-red-500"/>
          </div>
          <input id={'phone'} {...register('phone')} value={watch('phone')} 
          className={
           `px-2 py-2 border rounded-md ${errors.phone
             ? 'border-red-500  focus:outline-red-500' 
             :  'border-violet-400 focus:outline-violet-600'}`}
          placeholder="#########" autoComplete="none"
          />
          {
              errors.phone && <p className="text-red-500 text-xs">{errors.phone ? errors.phone.message : ''}</p>
          }
        </div>

        <div className="mt-6 w-full">
          <button className="bg-violet-600 mt-5 py-2 rounded-md font-bold text-white cursor-pointer w-full transition-all duration-300 hover:bg-violet-800">Register</button>
        </div>

      </div>
   </form>
  )
}

export default SignupForm
