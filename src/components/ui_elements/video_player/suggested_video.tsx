import { useNavigate } from "react-router-dom";
import { VideoType } from "../../../lib/types/video_type"

interface SuggestedVideoProps {
  allvideoData: VideoType[] | null
}


export default function SuggestedVideo({ allvideoData }: SuggestedVideoProps) {
  const navigate = useNavigate()
  

  function navigateTo(videoId: string) {
    window.location.reload
    navigate(`/player/${videoId}`)
  }

  return (
    <div className="h-full">
      <div className="flex flex-col gap-[25px] px-3 mt-[30px] pb-[390px]">
        {allvideoData && allvideoData.map((video) => (
          <div onClick={() => navigateTo(video.video_youtube_id)} key={video._id}>
            <img src={video.video_img_url} alt="Video Thumnail" className="video_thumbnail w-full h-[255px] rounded-[5px]" />
            <h2 className="mt-[5px] text-sm font-semibold line-clamp-1 ml-3">{video.video_name}</h2>
            <div className="flex items-center gap-2 ml-3">
              <span>{video.video_views}  marta ko'rishlar</span>
              <svg height="3px" width="3px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 31.955 31.955" xmlSpace="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path style={{ fill: "#030104" }} d="M27.25,4.655C20.996-1.571,10.88-1.546,4.656,4.706C-1.571,10.96-1.548,21.076,4.705,27.3 c6.256,6.226,16.374,6.203,22.597-0.051C33.526,20.995,33.505,10.878,27.25,4.655z"></path> <path style={{ fill: "#030104" }} d="M13.288,23.896l-1.768,5.207c2.567,0.829,5.331,0.886,7.926,0.17l-0.665-5.416 C17.01,24.487,15.067,24.5,13.288,23.896z M8.12,13.122l-5.645-0.859c-0.741,2.666-0.666,5.514,0.225,8.143l5.491-1.375 C7.452,17.138,7.426,15.029,8.12,13.122z M28.763,11.333l-4.965,1.675c0.798,2.106,0.716,4.468-0.247,6.522l5.351,0.672 C29.827,17.319,29.78,14.193,28.763,11.333z M11.394,2.883l1.018,5.528c2.027-0.954,4.356-1.05,6.442-0.288l1.583-5.137 C17.523,1.94,14.328,1.906,11.394,2.883z"></path> <circle style={{ fill: "#030104" }} cx="15.979" cy="15.977" r="6.117"></circle> </g> </g></svg>
              <span>{video.updatedAt}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
