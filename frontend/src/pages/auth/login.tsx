
const Login = () => {
  return (
    <main className="h-full w-full flex justify-center items-center bg-white">

      <div className="min-h-[400px] min-w-[500px] border border-violet-500 p-6 rounded-md bg-[#f8f8f8] shadow-lg">
        <h1 className="text-3xl font-bold text-violet-800 text-center">Login</h1>
{/* form */}
        <div className="mt-5 flex flex-col gap-6">
          {/* input fields */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-gray-800 font-semibold text-lg">
              Email
            </label>
            <input 
              id = {'email'} className={"px-2 py-2 border border-violet-400 rounded-md focus:outline-violet-600"} placeholder="example@gmail.com" 
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-gray-800 font-semibold text-lg">
              Password
            </label>
            <input 
              id={'password'} className="px-2 py-2 border border-violet-400 rounded-md  focus:outline-violet-600" placeholder="********"
              type="password"
            />
          </div>

          <div className="w-full mt-6">
            <button className=" cursor-pointer w-full bg-violet-600 py-3 rounded-md text-white font-bold text-large transition-all duration-300 hover:bg-violet-800">
              Sign In
            </button>
          </div>

        </div>
      </div>
    </main>
  )
}

export default Login
