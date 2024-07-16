import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/app/store'; // Ensure the path is correct
import { postCheckUserToken } from '@/features/auth_slice/checkUserIsLogin'; // Ensure the path is correct
import { useNavigate } from 'react-router-dom';
import Loader from "@/components/loader/loader";
import profile from '@/components/images/profile/profile.png'
import MenuBar from '@/components/ui_elements/menu_bar';
import LastViewed from '@/components/profile/last_viewed';
import LikedVideos from '@/components/profile/liked_videos';
import { baseUrlAxios } from '@/axiosConfig';
import { VideoType } from '@/lib/types/video_type';


export default function Profile() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [allvideoData, setAllvideoData] = useState<VideoType[] | null>(null)
  const { loading, userData } = useSelector((state: RootState) => state.checkUser);


  useEffect(() => {
    // Fetch all videos
    const getAllVideosFun = async () => {
      try {
        const response = await baseUrlAxios.get("/video/get-all");
        if (response.status === 200) {
          setAllvideoData(response.data);
        }
      } catch (error) {
        console.error("Error fetching videos", error);
      }
    };
    getAllVideosFun();
  }, [])




  const likedVideos = allvideoData?.flatMap(video =>
    video.liked_videos_user_id.some(user => user._id === userData._id) ? video : []
  ).filter(Boolean);


  const lastViewedVideosDataAll: VideoType[] | undefined = allvideoData?.flatMap(video =>
    video.recently_viewed_videos_user_id.some(user => user._id === userData._id) ? video : []
  ).filter(Boolean);



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
              <img width={100} height={100} src={profile} alt="Profile image" />
              <div>
                <h2 className='text-lg font-bold'> {userData.username}</h2>
                <p className='font-bold'>{userData.lastname}</p>
              </div>
            </div>

            {userData.role === "ADMIN" && <button className='py-2 w-full bg-[#202020] text-[#fff] mb-8 rounded-lg' onClick={() => navigate("/admin")}>Adminga o'tish</button>}

            <div className='mb-8'>
              <h2 className='text-xl font-bold mb-3'>Oxirgi ko'rilgan videolar </h2>
              <LastViewed lastViewedVideosDataAll={lastViewedVideosDataAll} />
            </div>

            <div>
              <h2 className='text-xl font-bold mb-3'>Like bosilgan videolar videolar </h2>
              <LikedVideos likedVideos={likedVideos} />
            </div>
          </div>
        </div>
        <MenuBar /> 
      </>
      )
  );
}