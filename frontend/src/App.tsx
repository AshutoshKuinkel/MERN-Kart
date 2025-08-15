import './App.css'
import Signup from './pages/auth/signup'
import Login from './pages/auth/login'
import HomePage from './pages/home'
import ContactPage from './pages/contact'

import {BrowserRouter as Router, Routes, Route} from 'react-router'
import DynamicPage from './pages/detailpage'

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
          <Route path='*' element={<div className='h-screen'><h1>Page not Found</h1></div>}/>
        </Routes>
      </Router>

    </main>
  )
}

export default App
