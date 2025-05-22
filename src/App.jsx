import { useEffect, useState } from 'react'
import './App.css'
import {Header, Footer} from "./components/index.js"
import { useDispatch } from 'react-redux'
import authService from "./appwrite/auth/auth.js"
import {login, logout} from "./store/authSlice"
import { Outlet } from 'react-router-dom'
function App() {

  const [loading, setLoading] = useState(true)
  
  const dispatch = useDispatch()
  
  useEffect(() => {
  authService.getUserAccount()
  .then((userData) => {
  if (userData) {
    dispatch(login({userData}))
  }else{
    dispatch(logout())
  }
  })
  .finally(() => setLoading(false))
  }, [])
 return !loading ? (
 <div className=' flex flex-wrap content-between min-h-screen text-2xl text-white'>
  <div className='w-full block'>
 <Header/>
<main>
   Todo: {/* <Outlet/> */}
</main>
 <Footer/>
  </div>
 </div>
) : null
 
}

export default App
