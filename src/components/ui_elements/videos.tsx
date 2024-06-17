import { Link } from 'react-router-dom'
import VideoCard from './video-card'
import { useState } from 'react'
import { VideoType } from '../../../lib/types/video_type'
import { videosData } from '../../db/videos'

export default function Videos() {
    const [videoData] = useState<VideoType[]>(videosData)
    console.log(videoData);

    return (
        <div className='mb-[24px]'>
            <div className='flex justify-between mb-[14px]'>
                <h2 className='text-[20px] font-semibold'>New</h2>
                <Link to={"/"} className='text-[20px] font-semibold opacity-50'>See all</Link>
            </div>
            <div className='flex gap-8 overflow-y-auto'>
                {videoData.map(video => (
                    <VideoCard video={video} key={video.id} />
                ))}
            </div>
        </div>
    )
}