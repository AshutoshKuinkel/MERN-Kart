import Footer from "../components/footer/footer-index"
import Header from "../components/header"

const HomePage = () => {
  return (
    <main>
      <div className="min-h-screen border">
        <Header/>
        {/* Content section */}
        <h1>HomePage</h1>
        <Footer/>
      </div>
    </main>
   
  )
}

export default HomePage
