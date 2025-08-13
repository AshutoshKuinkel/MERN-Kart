import { useState } from "react"
import { LuAsterisk } from "react-icons/lu";

const LoginForm = () => {

  const [formData,setFormData] = useState({
    email:'',
    password:''
  })
  
  const [errors,setErrors] = useState({
    email:'',
    password:''
  })

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    console.log(e.target.name)
    const name = e.target.name;
    const value = e.target.value
    setFormData({...formData,[name]:value})
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    console.log(formData)
    if(!formData.email){
      setErrors({...errors,email:`email is required.`})
      return
    }
    setErrors({...errors,email:''})
    if(!formData.password){
      setErrors({...errors,password:`password is required.`})
      return
    }
    setErrors({...errors,password:''})
    console.log(e)
    console.log("On Login Submit")
    
  }

  console.log(errors)

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="mt-5 flex flex-col gap-6">
          {/* input fields */}
          <div className="flex flex-col gap-2">
            <div className="flex">
              <label htmlFor="email" className="text-gray-800 font-semibold text-lg">
              Email
            </label>
            <LuAsterisk  size = {14} className="text-red-500"/>
            </div>
            <input 
              id = {'email'}
              name={"email"}
              className={
                "px-2 py-2 border border-violet-400 rounded-md focus:outline-violet-600"}
                placeholder="example@gmail.com"
                onChange={handleChange}
                value={formData.email}
            />
            {
              errors.email && <p className="text-red-500 text-xs">{errors.email}</p>
            }
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex">
              <label htmlFor="password" className="text-gray-800 font-semibold text-lg">
              Password
            </label>
            <LuAsterisk  size = {14} className="text-red-500"/>
            </div>
            <input 
              id={'password'}
              name={"password"}
               className="px-2 py-2 border border-violet-400 rounded-md  focus:outline-violet-600" 
               placeholder="********"
              type="password" 
              onChange={handleChange} value={formData.password}
            />
            {
              errors.password && <p className="text-red-500 text-xs">{errors.password}</p>
            }
          </div>

          <div className="w-full mt-6">
            <button type="submit" className=" cursor-pointer w-full bg-violet-600 py-3 rounded-md text-white font-bold text-large transition-all duration-300 hover:bg-violet-800">
              Sign In
            </button>
          </div>

        </div>
      </form>
    </div>
  )
}

export default LoginForm
