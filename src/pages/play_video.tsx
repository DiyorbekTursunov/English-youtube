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
                <MenuBarBottom menuBarMenuIsOpen={menuBarMenuIsOpen} setMenuBarMenuIsOpen={setMenuBarMenuIsOpen} videoData={videoData}/>

                <div className="py-3 px-3 shadow-md" onClick={() => setMenuBarMenuIsOpen(!menuBarMenuIsOpen)}>
                    <h1 className="text-[20px] font-semibold">{videoData?.title}</h1>
                    <div className="flex gap-2 text-[14px] font-medium text-[#595959]">
                        <span>{"64k views"}</span>
                        <span>{"1 years ego"}</span>
                        <span>{"#tom and jerry"}</span>
                        <button>
                            ...<span className="font-semibold text-[#000]">more</span>
                        </button>
                    </div>
                </div>

                <SuggestedVideo AllvideoData={AllvideoData} />
            </div>
        </div>
    )
}