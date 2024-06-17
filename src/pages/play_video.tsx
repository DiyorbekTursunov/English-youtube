import { useEffect, useState } from "react";
import VideoPlayer from "../components/ui_elements/video_player";
import MenuBarBottom from "../components/ui_elements/video_player/menu_bar_bottom";
import SuggestedVideo from "../components/ui_elements/video_player/suggested_video";
import { useParams } from "react-router-dom";
import { VideoType } from "../../lib/types/video_type";
import { videosData } from "../db/videos";

export default function PlayVideo() {
    const { slug } = useParams()
    const [AllvideoData] = useState<VideoType[]>(videosData)

    const [videoData, setVideoData] = useState<VideoType | null>(null)

    const [menuBarMenuIsOpen, setMenuBarMenuIsOpen] = useState<boolean>(true)


    useEffect(() => {
        const videoData = AllvideoData.find(video => video.id === slug)
        if (videoData) {
            setVideoData(videoData)
        }
        console.log(videoData);
    }, [slug])


    return (
        <div className="w-full bg-[#F0EEED] h-screen overflow-hidden ">
            <div className='max-w-[500px] h-screen mx-auto '>
                <VideoPlayer videoData={videoData} />
                <MenuBarBottom menuBarMenuIsOpen={menuBarMenuIsOpen} setMenuBarMenuIsOpen={setMenuBarMenuIsOpen} />

                <div className="py-3 px-3 flex justify-between shadow-md">
                    <h1>{videoData?.title}</h1>
                    <button onClick={() => setMenuBarMenuIsOpen(!menuBarMenuIsOpen)}>
                        <svg fill="#000000" version="1.1" id="Layer_1" width={20} hanging={20} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 472.586 472.586" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <rect width="124.721" height="124.721"></rect> </g> </g> <g> <g> <rect x="173.952" width="124.721" height="124.721"></rect> </g> </g> <g> <g> <rect x="347.865" width="124.721" height="124.721"></rect> </g> </g> <g> <g> <rect y="173.952" width="124.721" height="124.721"></rect> </g> </g> <g> <g> <rect x="173.952" y="173.952" width="124.721" height="124.721"></rect> </g> </g> <g> <g> <rect x="347.865" y="173.952" width="124.721" height="124.721"></rect> </g> </g> <g> <g> <rect y="347.865" width="124.721" height="124.721"></rect> </g> </g> <g> <g> <rect x="173.952" y="347.865" width="124.721" height="124.721"></rect> </g> </g> <g> <g> <rect x="347.865" y="347.865" width="124.721" height="124.721"></rect> </g> </g> </g></svg>
                    </button>
                </div>

                <SuggestedVideo AllvideoData={AllvideoData}/>
            </div>
        </div>
    )
}