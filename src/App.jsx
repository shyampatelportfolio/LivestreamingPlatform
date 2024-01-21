import './Css/Css1.css'
import './Css/Css2.css'
import './Css/Explore.css'
import './Css/Home.css'
import './Css/Login.css'
import './Css/User.css'
import './Css/Stream.css'


import { Route, Routes, useLocation } from "react-router-dom"
import Stream from './Pages/Stream'
import Explore from './Pages/Explore'
import User from './Pages/User'
import Home from './Pages/Home'
import SignIn from './Pages/SignIn'
import Register from './Pages/Register'
import { useContext, useEffect } from 'react'
import HistoryContext from './Context/HistoryContext'
import UseCheckCredentials from './Hooks/UseCheckCredentials';


function App() {

  const { domainHistory, addToHistory } = useContext(HistoryContext)
  const [information, Logout, refetch] = UseCheckCredentials(true)
  

  const location = useLocation()

  useEffect(() => {
    addToHistory(location.pathname)

  }, [location])
  
  return (
    <>
        <div className="content-background">
              <img src="/Images/Scene3.jpg" alt="" />
        </div>
      <Routes>

        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/SignIn' element={<SignIn></SignIn>}></Route>
        <Route path='/Register' element={<Register></Register>}></Route>
        <Route path='/Stream' element={<Stream></Stream>}></Route>
        <Route path='/Stream/:id' element={<Stream></Stream>}></Route>

        <Route path='/User' element={<User></User>}></Route>
        <Route path='/Explore' element={<Explore></Explore>}></Route>
      </Routes>
      
    </>
  )
}

export default App
