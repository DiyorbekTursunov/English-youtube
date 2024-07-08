import { useNavigate } from "react-router-dom"
import { VideoType } from "../../lib/types/video_type"

interface VideoCardProps {
    video: VideoType
}

export default function VideoCard({ video }: VideoCardProps) {
    const navigate = useNavigate()

    return (
        <>
            <div onClick={() => navigate(`/player/${video.video_youtube_id}`)}>
                <img src={video.video_img_url} alt="Video Thumnail" className="w-full h-[210px]" />
                <h1 className="mt-[5px] text-sm font-semibold line-clamp-1">{video.video_name}</h1>
                <div className="flex justify-between mt-[3px]">
                    {/* <h2>{video.}</h2> */}
                    <div className="flex items-center gap-2">
                        <span className="text-xs">{video.video_likes} 788K marta ko'rilgan</span>
                        <span className="text-xs">{video.updatedAt}</span>
                    </div>
                </div>
            </div>
        </>
    )
}