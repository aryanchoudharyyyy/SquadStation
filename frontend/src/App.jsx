import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Home  from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import Splash  from './pages/Splash'
import Login from './pages/Login'
import Signup from './pages/Signup'
import OtpVerification from './pages/OtpVerification'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/Layout'
import Marketplace from './pages/Marketplace'
import ListingDetail from './pages/ListingDetail'
import Footer from './components/Footer'
import CreateListing from './pages/CreateListing'
import Profile from './pages/Profile'
import MyListings from './pages/MyListings'
function App() {
  

  return (
    <>
     <Routes>
        {/* === UNPROTECTED ROUTES (Anyone can access) === */}
        <Route path='/' element={<Splash />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/otpVerification' element={<OtpVerification />} />
        {/* === PROTECTED ROUTES (Bouncer + Navbar Layout) === */}
        <Route element={<ProtectedRoute> <Layout /> </ProtectedRoute>}>
            <Route path='/home' element={<Home />}/>
            <Route path='/marketplace' element={<Marketplace />} />
            <Route path='/marketplace/create' element={<CreateListing />} />
            <Route path='marketplace/:id' element={<ListingDetail />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/my-listings' element={<MyListings />} />
            {/* When we build Profile or Trips later, we will just add them right here! */}
        </Route>
        
      </Routes>

    </>
  )
}

export default App
