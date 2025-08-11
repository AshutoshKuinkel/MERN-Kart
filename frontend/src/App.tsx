import './App.css'
import Signup from './pages/auth/signup'
import Login from './pages/auth/login'

const App = () => {
  return (
    <main className='h-full'>
      {/* <h1>Hello World</h1> */}
      <Login/>
      <Signup/>
    </main>
  )
}

export default App
