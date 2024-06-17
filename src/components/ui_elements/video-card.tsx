import { useNavigate } from "react-router-dom"
import { VideoType } from "../../../lib/types/video_type"

interface VideoCardProps {
    video: VideoType
}

export default function VideoCard({ video }: VideoCardProps) {
    const navigate = useNavigate()
    return (
        <div className="bg-[#fff] rounded-[25px] p-[9px]" onClick={() => navigate(`/player/${video.id}`)}>
            <img src={video.image_url} alt="Video Thumnail" className="max-w-[223px] h-[155px] rounded-[25px]" />
            <h1 className="mt-[5px] text-[15px] font-semibold">{video.title}</h1>
            <div className="flex justify-between mt-[3px]">
                <h2>{video.time}</h2>
                <div className="flex items-center gap-1">
                    <span>{video.reyting}</span>
                    <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.66667 10.18L10.7867 12.6667L9.69333 7.98L13.3333 4.82667L8.54 4.42L6.66667 0L4.79333 4.42L0 4.82667L3.64 7.98L2.54667 12.6667L6.66667 10.18Z" fill="#FFD233" />
                    </svg>
                </div>
            </div>
        </div>
    )
}