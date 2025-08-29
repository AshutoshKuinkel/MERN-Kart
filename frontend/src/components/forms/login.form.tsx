import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import type { ILoginData } from "../../types/auth.types";
import { loginSchema } from "../../schema/auth.schema";
import Input from "../common/inputs/input";
import { login } from "../../api/auth.api";
import { useMutation } from "@tanstack/react-query";
import toast from 'react-hot-toast'
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../../context/auth.context";

const LoginForm = () => {
  const {setUser} = useAuth()

  const navigate = useNavigate()

  const location=useLocation()

  const  navigate_to = location.state?.from ?? '/'

  const methods = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
    mode: "all",
  });

  const { mutate, isPending} = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      console.log(response);
      toast.success(response?.message ?? 'Login Success.')
      // localStorage.setItem('user',JSON.stringify(response.data.data))
      // localStorage.setItem('token',response.data.access_token)
      setUser(response.data.data)
      navigate(navigate_to,{replace:true})
    },
    onError: (error) => {
      console.log(error);
      toast.error(error?.message ?? 'Login Failed.')
    },
    mutationKey: ["login_mutation"],
  });

  const onSubmit = (data: ILoginData) => {
    mutate(data);
  };

  return (
    <div>
      {/* {error && <p>{error.message}</p>} */}
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
              id="password"
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
              <button
                type="submit"
                disabled={isPending}
                className=" cursor-pointer w-full bg-violet-600 py-3 rounded-md text-white font-bold text-large transition-all duration-300 hover:bg-violet-800  disabled:bg-violet-500 disabled:cursor-not-allowed"
              >
                Sign In
              </button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default LoginForm;
