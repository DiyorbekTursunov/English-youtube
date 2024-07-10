import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import PlayVideo from './pages/play_video';
import Register from './pages/register';
import Login from './pages/login';
import Profile from './pages/profile';



function App() {
    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/player/:slug' element={<PlayVideo />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/profile' element={<Profile />} />
            </Routes>
        </>
    );
}

export default App;