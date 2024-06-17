import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
// import MenuBar from './components/ui_elements/menu_bar'
import PlayVideo from './pages/play_video'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/player/:slug' element={<PlayVideo />} />
      </Routes>
      {/* <MenuBar /> */}
    </>
  )
}

export default App