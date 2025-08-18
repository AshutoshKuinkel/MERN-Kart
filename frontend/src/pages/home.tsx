import Footer from "../components/footer/footer-index"
import Header from "../components/header"
import FeaturedProducts from "../components/landing/featured-products"
import Hero from "../components/landing/hero"

const HomePage = () => {
  return (
    <main>
      <div className="min-h-screen border">
        <Header/>
        {/* Content section */}
        <Hero/>
        <div className="px-36">
          <FeaturedProducts />
        </div>
        <Footer/>
      </div>
    </main>
   
  )
}

export default HomePage
