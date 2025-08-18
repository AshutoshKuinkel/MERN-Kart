import hero from "../../assets/hero.webp";

const Hero = () => {
  return (
    <div className=" relative h-[85vh]">
      <div className="h-full w-full">
        <img 
        src={hero} alt="hero image" 
        className="h-full w-full" 
        />
      </div>

      {/* overlay */}
      <div className="bg-black/50 h-full w-full absolute inset-0"></div>

      <div className="absolute top-[40%] left-20 z-50">
        <h1 className="text-4xl text-violet-700 font-bold">Deals That Move Fast—Just Like You.</h1>
        <p className="text-lg text-gray-100 mt-4">Discover amazing products at unbeatable prices—delivered straight to your door.</p>

        <button 
        className="mt-10 py-3 bg-violet-700 text-white px-7 font-bold text-lg rounded-md cursor-pointer hover:text-2xl hover:bg-violet-800 transition-all duration-300">
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default Hero;
