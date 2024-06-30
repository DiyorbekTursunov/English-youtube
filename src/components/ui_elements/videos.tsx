import { Link } from 'react-router-dom'
import VideoCard from './video-card'
import { VideoType } from '../../lib/types/video_type'
// import { videosData } from '../../db/videos'

interface VideoPropsType {
    allVideos: VideoType[]
}


export default function Videos({ allVideos }: VideoPropsType) {



    return (
        <div className='mb-[24px]'>
            <div className='flex justify-between mb-[14px]'>
                <h2 className='text-[20px] font-semibold'>Mashhur</h2>
                <Link to={"/"} className='text-[18px] font-semibold opacity-50'>Barchasi</Link>
            </div>
            <div className='flex gap-4 overflow-y-auto'>
                {allVideos && allVideos.map(video => (
                    <VideoCard video={video} key={video._id} />
                ))}
            </div>
        </div>
    )
}