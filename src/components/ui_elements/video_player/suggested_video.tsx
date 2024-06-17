import { useNavigate } from "react-router-dom";
import { VideoType } from "../../../../lib/types/video_type"

interface SuggestedVideoProps {
  AllvideoData: VideoType[]
}


export default function SuggestedVideo({ AllvideoData }: SuggestedVideoProps) {
  const navigate = useNavigate()
  console.log(AllvideoData);

  return (
    <div className="h-full overflow-scroll">
      <div className="flex flex-col gap-[25px] px-3 mt-[30px]">
        {AllvideoData.map((video) => (
          <div onClick={() => navigate(`/player/${video.id}`)}>
            <img src={video.image_url} alt="Video Thumnail" className="w-full h-[255px] rounded-[5px]" />
          </div>
        ))}
      </div>
    </div>
  )
}