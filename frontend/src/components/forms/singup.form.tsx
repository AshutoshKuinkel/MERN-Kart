import { useState } from "react"
import { LuAsterisk } from "react-icons/lu";

const SignupForm = () => {

  const [formData,setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: ''
  })

  const [errors,setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: ''
  })

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    console.log(e.target.name)
    const name = e.target.name
    const value = e.target.value
    setFormData({...formData,[name]:value})

  }

  const onSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    console.log(formData)
    if(!formData.firstName){
      setErrors({...errors,firstName:'First Name is required.'})
      return
    }
    if(!formData.lastName){
      setErrors({...errors,lastName:'Last Name is required.'})
      return
    }
    if(!formData.email){
      setErrors({...errors,email:'Email is required.'})
      return
    }
    if(!formData.password){
      setErrors({...errors,password:'Password is required.'})
      return
    }
    if(!formData.phone){
      setErrors({...errors,phone:'Phone is required.'})
      return
    }
    console.log('Register user form submitted.')
  }

  console.log(errors)

  return (
   <form onSubmit={onSubmit}>
     <div>

        <div className="mt-5 flex flex-col gap-1">
          <div className="flex">
            <label htmlFor="firstName" className="text-gray-800 font-semibold text-lg">First Name:</label>
            <LuAsterisk  size = {14} className="text-red-500"/>
          </div>
          <input name={'firstName'} id={'firstName'} className="px-2 py-2 border border-violet-500 rounded-md  focus:outline-violet-600" placeholder="Your First Name" autoComplete="none"
          onChange={handleChange} value={formData.firstName} 
          />
          {
              errors.firstName && <p className="text-red-500 text-xs">{errors.firstName}</p>
          }
        </div>
        
        <div className="mt-5 flex flex-col gap-1">
          <div className="flex">
            <label htmlFor="lastName" className="text-gray-800 font-semibold text-lg">Last Name:</label>
            <LuAsterisk  size = {14} className="text-red-500"/>
          </div>
          <input name={'lastName'} id={'lastName'} className="px-2 py-2 border border-violet-500 rounded-md  focus:outline-violet-600" placeholder="Your Last Name" autoComplete="none"
          onChange={handleChange} value={formData.lastName}/>
          {
              errors.lastName && <p className="text-red-500 text-xs">{errors.lastName}</p>
          }
        </div>

        <div className="mt-5 flex flex-col gap-1">
          <div className="flex">
            <label htmlFor="email" className="text-gray-800 font-semibold text-lg">Email:</label>
            <LuAsterisk  size = {14} className="text-red-500"/>
          </div>
          <input name={'email'} id={'email'} className="px-2 py-2 border border-violet-500 rounded-md  focus:outline-violet-600" placeholder="example@gmail.com"
          onChange={handleChange} value={formData.email}/>
          {
              errors.email && <p className="text-red-500 text-xs">{errors.email}</p>
          }
        </div>

        <div className="mt-5 flex flex-col gap-1">
          <div className="flex">
            <label htmlFor="password" className="text-gray-800 font-semibold text-lg">Password:</label>
            <LuAsterisk  size = {14} className="text-red-500"/>
          </div>
          <input name={'password'} id={'password'} className="px-2 py-2 border border-violet-500 rounded-md  focus:outline-violet-600" placeholder="********" type="password" autoComplete="none"
          onChange={handleChange} value={formData.password}/>
          {
              errors.password && <p className="text-red-500 text-xs">{errors.password}</p>
          }
        </div>

        <div className="mt-5 flex flex-col gap-1">
          <div className="flex">
            <label htmlFor="phone" className="text-gray-800 font-semibold text-lg">Phone:</label>
            <LuAsterisk  size = {14} className="text-red-500"/>
          </div>
          <input name={'phone'} id={'phone'} className="px-2 py-2 border border-violet-500 rounded-md  focus:outline-violet-600" placeholder="#########" autoComplete="none"
          onChange={handleChange} value={formData.phone}/>
          {
              errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>
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
