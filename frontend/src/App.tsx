import './App.css'
import Signup from './pages/auth/signup'
import Login from './pages/auth/login'
import HomePage from './pages/home'
import ContactPage from './pages/contact'
import PageNotFound from './pages/page-not-found'  

import {BrowserRouter as Router, Routes, Route} from 'react-router'
import DynamicPage from './pages/detailpage'
import ProductPage from './pages/product'
import AboutUs from './pages/About-us'

const App = () => {
  return (
    <main className='h-full'>
      
      <Router>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/contact-us' element={<ContactPage/>}/>
          <Route path='/product/:id' element={<DynamicPage/>}/>
          <Route path='/products' element={<ProductPage/>}/>
          <Route path='/about-us' element={<AboutUs/>}/>
          <Route path='*' element={<PageNotFound/>}/>
        </Routes>
      </Router>

    </main>
  )
}

export default App
