import SignupForm from "../../components/forms/singup.form";
import { Link } from "react-router";

const Signup = () => {
  return (
    <main className="min-h-screen w-full flex justify-center items-center bg-white">
      <div className="min-h-[400px] min-w-[500px] border border-violet-500 p-6 rounded-md bg-[#f8f8f8] shadow-lg">
        <h1 className="text-3xl text-violet-800 font-bold text-center">
          Sign Up
        </h1>
        <SignupForm />
        {/* link to login */}
        <div className="py-5">
          <p className="text-center ">
            Already have an account?
            <Link to={"/login"}>
              <span className="text-violet-700"> Log In</span>
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Signup;
