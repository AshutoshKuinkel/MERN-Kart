
const Signup = () => {
  return (
    <main className="h-full w-full flex justify-center items-center bg-white">
      <div className="min-h-[400px] min-w-[500px] border border-violet-500 p-6 rounded-md bg-[#f8f8f8] shadow-lg">
        <h1 className="text-3xl text-violet-800 font-bold text-center">Sign Up</h1>
      
      <div>

        <div className="mt-5 flex flex-col gap-1">
          <label htmlFor="firstName" className="text-gray-800 font-semibold text-lg">First Name:</label>
          <input id={'firstName'} className="px-2 py-2 border border-violet-500 rounded-md  focus:outline-violet-600" placeholder="Your First Name" autoComplete="none"/>
        </div>
        
        <div className="mt-5 flex flex-col gap-1">
          <label htmlFor="lastName" className="text-gray-800 font-semibold text-lg">Last Name:</label>
          <input id={'lastName'} className="px-2 py-2 border border-violet-500 rounded-md  focus:outline-violet-600" placeholder="Your Last Name" autoComplete="none"/>
        </div>

        <div className="mt-5 flex flex-col gap-1">
          <label htmlFor="email" className="text-gray-800 font-semibold text-lg">Email:</label>
          <input id={'email'} className="px-2 py-2 border border-violet-500 rounded-md  focus:outline-violet-600" placeholder="example@gmail.com"/>
        </div>

        <div className="mt-5 flex flex-col gap-1">
          <label htmlFor="password" className="text-gray-800 font-semibold text-lg">Password:</label>
          <input id={'password'} className="px-2 py-2 border border-violet-500 rounded-md  focus:outline-violet-600" placeholder="********" type="password" autoComplete="none"/>
        </div>

        <div className="mt-5 flex flex-col gap-1">
          <label htmlFor="phone" className="text-gray-800 font-semibold text-lg">Phone:</label>
          <input id={'phone'} className="px-2 py-2 border border-violet-500 rounded-md  focus:outline-violet-600" placeholder="#########" autoComplete="none"/>
        </div>

        <div className="mt-6 w-full">
          <button className="bg-violet-600 mt-5 py-2 rounded-md font-bold text-white cursor-pointer w-full transition-all duration-300 hover:bg-violet-800">Register</button>
        </div>

      </div>

      </div>
    </main>
    
  )
}

export default Signup
