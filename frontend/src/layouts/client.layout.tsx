import Header from "../components/header"
import Footer from "../components/footer/footer-index"
import { Outlet } from "react-router"

const ClientLayout = () => {
  return (
    <div className="h-full w-full">
      
    {/* Header section */}
    <Header />

    {/* page section */}
    <Outlet/>

    {/* footer section */}
    <Footer />
    </div>
  )
}

export default ClientLayout
