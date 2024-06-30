import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from './pages/home'
// import MenuBar from './components/ui_elements/menu_bar'
import PlayVideo from './pages/play_video'
import Register from './pages/register'
import { useEffect, useState } from 'react'
import Login from './pages/login'
import axios from 'axios'

function App() {
  const [isLoading, setisLoading] = useState(true)
  const navigate = useNavigate()

  setTimeout(() => {
    setisLoading(false)
  }, 2000)

  useEffect(() => {
    const verification = localStorage.getItem("verification") as string
    if (!verification) {
      navigate("/register")
      return
    }

    const cheackUser = async () => {
      try {
        const token = JSON.parse(verification)

        const userData = await axios.post("http://localhost:3000/auth/cheack", { verification: token })

        if (userData.status === 200) {
          localStorage.setItem("verification", JSON.stringify(userData.data.user.verification))
        }
      } catch (error: unknown) {
        console.log(error);
        localStorage.removeItem("verification")
        navigate("/register")
      }
    }
    cheackUser()

  }, [navigate])

  return (
    <>
      {isLoading ?
        <div className='absolute w-full h-full bg-black top-0 left-0 flex justify-center items-center'>
          <svg width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#fff">
            <g fill="none" fillRule="evenodd">
              <g transform="translate(1 1)" strokeWidth="2">
                <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
                <path d="M36 18c0-9.94-8.06-18-18-18">
                  <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s" repeatCount="indefinite" />
                </path>
              </g>
            </g>
          </svg>
        </div>
        :
        <>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/player/:slug' element={<PlayVideo />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </>}
    </>
  )
}

export default App