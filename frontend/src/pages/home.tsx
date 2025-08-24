import CategoryList from "../components/landing/category"
import FeaturedProducts from "../components/landing/featured-products"
import Hero from "../components/landing/hero"

const HomePage = () => {
  return (
    <main>
      <div className="min-h-screen">
        {/* Content section */}
        <Hero/>
        <div className="px-36 py-10 flex flex-col gap-10">
          <CategoryList />
          <FeaturedProducts />
        </div>
      </div>
    </main>
   
  )
}

export default HomePage
