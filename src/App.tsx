import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import PlayVideo from './pages/play_video';
import Register from './pages/register';
import Login from './pages/login';



function App() {
    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/player/:slug' element={<PlayVideo />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
            </Routes>
        </>
    );
}

export default App;