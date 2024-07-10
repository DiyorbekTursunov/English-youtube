import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/app/store'; // Ensure the path is correct
import { postCheckUserToken } from '@/features/auth_slice/checkUserIsLogin'; // Ensure the path is correct
import { useNavigate } from 'react-router-dom';
import Loader from "@/components/loader/loader";
import profile from '@/components/images/profile/profile.png'
import MenuBar from '@/components/ui_elements/menu_bar';
import LastViewed from '@/components/profile/last_viewed';

export default function Profile() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, userData } = useSelector((state: RootState) => state.checkUser);

  console.log(userData);

  useEffect(() => {
    dispatch(postCheckUserToken({ navigate }));
  }, [dispatch, navigate]);


  return (
    loading ?
      <Loader /> :

      (<>
        <div className="w-full h-full">
          <div className='max-w-[450px] mx-auto px-3 mt-5'>
            <div className='flex items-center gap-5 mb-8'>
              <img width={80} height={80} src={profile} alt="Profile image" />
              <div>
                <h2 className='text-lg font-bold'><span className='font-medium'>Salom</span> {userData.username}</h2>
                <p className='font-bold'>{userData.lastname}</p>
              </div>
            </div>

            <h1 className='text-xl font-bold mb-3'>Oxirgi ko'rilgan videolar </h1>
            <LastViewed userData={userData} />  
          </div>
        </div>
        <MenuBar />

      </>
      )
  );
}