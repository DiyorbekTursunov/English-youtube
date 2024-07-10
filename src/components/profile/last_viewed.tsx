// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import { userType } from '@/lib/types/user_type';
import { useEffect, useState } from 'react';
import { baseUrlAxios } from '@/axiosConfig';
import { VideoType } from '@/lib/types/video_type';
import VideoCard from '../ui_elements/video-card';


interface LastViewedProps {
  userData: userType
}


interface recentlyViewedVideosType {
  ids: string[];
}

export default function LastViewed({ userData }: LastViewedProps) {
  const [lastViewedVideosId, setLastViewedVideosId] = useState<recentlyViewedVideosType | null>(null)
  const [lastViewedVideos, setLastViewedVideos] = useState<VideoType[] | null>(null)

  useEffect(() => {
    // Fetch last viewed videos
    const fetchLastViewedVideos = async () => {
      try {
        const response = await baseUrlAxios.get('auth/get_my_views', {
          params: {
            userId: userData._id,
          },
        });

        setLastViewedVideosId(response.data.recentlyViewedVideos)
      } catch (error) {
        console.error(error);
      }
    };
    fetchLastViewedVideos();
  }, [userData])


  useEffect(() => {
    const getRecently_viewed_video = async () => {
      try {
        if (lastViewedVideosId !== undefined && lastViewedVideosId) {
          const recently_viewed_video = await baseUrlAxios.post('video/get-by-id', { videoIds: lastViewedVideosId })
          console.log(recently_viewed_video);
          setLastViewedVideos(recently_viewed_video.data.videos)
        }
      } catch (error) {
        console.log(error);
        
      }
    }

    getRecently_viewed_video()
  }, [lastViewedVideosId])



  return (
    <div className='max-w-[425px] mx-auto'>
      <Swiper
        spaceBetween={50}
        slidesPerView={1.2}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <div className='mb-[24px]'>
          <div className='flex flex-col gap-y-[20px]'>
            {lastViewedVideos && lastViewedVideos.map(video => (
              <SwiperSlide key={video._id}>
                <VideoCard video={video} key={video._id} />
              </SwiperSlide>
            ))}
          </div>
        </div>
      </Swiper>
    </div>
  )
}