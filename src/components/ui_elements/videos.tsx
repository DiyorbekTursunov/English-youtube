import VideoCard from './video-card'
import { VideoType } from '../../lib/types/video_type'
// import { videosData } from '../../db/videos'

interface VideoPropsType {
    allVideos: VideoType[]
}


export default function Videos({ allVideos }: VideoPropsType) {


    return (
        <div className='mb-[24px]'>
            <div className='flex flex-col gap-y-[20px]'>
                {allVideos && allVideos.map(video => (
                    <VideoCard video={video} key={video._id} />
                ))}
            </div>
        </div>
    )
}