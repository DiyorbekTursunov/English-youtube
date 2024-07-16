import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './pages/home';
import PlayVideo from './pages/play_video';
import Register from './pages/register';
import Login from './pages/login';
import Profile from './pages/profile';
import Admin from './pages/admin';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from './app/store';
import { useEffect } from 'react';
import { postCheckUserToken } from './features/auth_slice/checkUserIsLogin';



function App() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { loading, userData } = useSelector((state: RootState) => state.checkUser);


    useEffect(() => {
        dispatch(postCheckUserToken({ navigate }));
    }, [dispatch, navigate]);




    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/player/:slug' element={<PlayVideo />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/profile' element={<Profile />} />
                {userData.role === 'ADMIN' && <Route path='/admin' element={<Admin loading={loading} />} />}
            </Routes>
        </>
    );
}

export default App;