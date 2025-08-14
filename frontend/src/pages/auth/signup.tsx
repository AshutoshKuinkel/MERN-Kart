
import SignupForm from "../../components/forms/singup.form"

const Signup = () => {
  return (
    <main className="h-full w-full flex justify-center items-center bg-white">
      <div className="min-h-[400px] min-w-[500px] border border-violet-500 p-6 rounded-md bg-[#f8f8f8] shadow-lg">
        <h1 className="text-3xl text-violet-800 font-bold text-center">Sign Up</h1>
        <SignupForm/>
      </div>
    </main>
    
  )
}

export default Signup
