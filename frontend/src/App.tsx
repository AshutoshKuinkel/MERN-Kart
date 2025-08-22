import './App.css'
import Signup from './pages/auth/signup'
import Login from './pages/auth/login'
import HomePage from './pages/home'
import ContactPage from './pages/contact'
import PageNotFound from './pages/page-not-found' 
import {Toaster} from 'react-hot-toast'

import {BrowserRouter as Router, Routes, Route} from 'react-router'
import DynamicPage from './pages/detailpage'
import ProductPage from './pages/product'
import AboutUs from './pages/About-us'
import ClientLayout from './layouts/client.layout'

const App = () => {
  return (
    <main className='h-full'>
      
      <Router>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>

          <Route path={'/'} element={<ClientLayout/>}>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/contact-us' element={<ContactPage/>}/>
            <Route path='/product/:id' element={<DynamicPage/>}/>
            <Route path='/products' element={<ProductPage/>}/>
            <Route path='/about-us' element={<AboutUs/>}/>
          </Route>
          <Route path='*' element={<PageNotFound/>}/>
        </Routes>
      </Router>
      <Toaster reverseOrder={true}/>
    </main>
  )
}

export default App
