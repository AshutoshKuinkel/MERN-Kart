import LoginForm from "../../components/forms/login.form"

const Login = () => {
  return (
    <main className="h-full w-full flex justify-center items-center bg-white tracking-wider p-3">

      <div className="min-h-[400px] w-[min(500px,100%)] border border-violet-500 p-6 rounded-md bg-[#f8f8f8] shadow-lg">
        <h1 className="text-3xl font-bold text-violet-800 text-center">Login</h1>
        {/* form */}
        <LoginForm/>

        {/* link to signup */}
        <div className="py-5">
          <p className="text-center ">
            Don't have an account? <span className="text-violet-700">Sign Up?</span>
          </p>
        </div>

      </div>
    </main>
  )
}

export default Login
