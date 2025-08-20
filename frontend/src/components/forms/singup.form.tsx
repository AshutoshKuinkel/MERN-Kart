import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { signupSchema } from "../../schema/auth.schema";
import type { ISignupData } from "../../types/auth.types";
import Input from "../common/inputs/input";
import { signup } from "../../api/auth.api";

const SignupForm = () => {

  const methods = useForm({
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

  const onSubmit = async(data:ISignupData)=>{
    try{
      console.log(data)
      await signup(data)
    }catch(err){
      console.log(err)
    }
  }

  return (
    <FormProvider {...methods}>
         <form onSubmit={methods.handleSubmit(onSubmit)} autoComplete="off">
     <div>

        <div className="mt-5 flex flex-col gap-4">
          <Input
            label="First Name:"
            id="firstName"
            name="firstName"
            placeholder="Your Name"
            required
          />

          <Input
            label="Last Name:"
            id="lastName"
            name="lastName"
            placeholder="Your Name"
            required
          />

          <Input
            label="Email:"
            id="email"
            name="email"
            placeholder="example@gmail.com"
            required
          />

          <Input
            label="Password:"
            id="password"
            name="password"
            placeholder="********"
            required
            type="password"
          />

          <Input
            label="Phone:"
            id="phone"
            name="phone"
            placeholder="##########"
            required
          />
        </div>

        <div className="mt-6 w-full">
          <button className="bg-violet-600 mt-5 py-2 rounded-md font-bold text-white cursor-pointer w-full transition-all duration-300 hover:bg-violet-800">Register</button>
        </div>

      </div>
   </form>
    </FormProvider>
  )
}

export default SignupForm
