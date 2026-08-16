import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Home  from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import Splash  from './pages/Splash'
import Login from './pages/Login'
import Signup from './pages/SignUp'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<Splash />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/home' element={<Home />}/>
        <Route path='/signup' element={<Signup />}/>
      </Routes>
    </>
  )
}

export default App
