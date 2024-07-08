import { useEffect, useState } from "react";
import VideoPlayer from "../components/ui_elements/video_player";
import MenuBarBottom from "../components/ui_elements/video_player/menu_bar_bottom";
// import SuggestedVideo from "../components/ui_elements/video_player/suggested_video";
import { useParams } from "react-router-dom";
import { VideoType } from "../lib/types/video_type";
import { baseUrlAxios } from "@/axiosConfig";
import Loader from "@/components/loader/loader";
// import { videosData } from "../db/videos";
// import MenuBar from "../components/ui_elements/menu_bar";

export default function PlayVideo() {
    const { slug } = useParams()
    const [allvideoData, setAllvideoData] = useState<VideoType[] | null>(null)
    const [isLoading, setisLoading] = useState(true)
    const [videoData, setVideoData] = useState<VideoType | null>(null)

    const [menuBarMenuIsOpen, setMenuBarMenuIsOpen] = useState<boolean>(false)
    setTimeout(() => {
        console.log(document.querySelector('.ytp-chrome-top')); 
    }, 3000);


    useEffect(() => {
        // Fetch all videos
        const getAllVideosFun = async () => {
            setisLoading(true)
            try {
                const response = await baseUrlAxios.get("/video/get-all");
                if (response.status === 200) {
                    setAllvideoData(response.data);
                }
            } catch (error) {
                console.error("Error fetching videos", error);
            }
            setisLoading(false)
        };
        getAllVideosFun();
    }, [])


    useEffect(() => {

        const videoData = allvideoData && allvideoData.find(video => video.video_youtube_id === slug)

        if (videoData) {
            setVideoData(videoData)
        }
        console.log(videoData);
    }, [slug, allvideoData])


    return (
        <>

            {isLoading ?
                <Loader /> :
                <div className="w-full bg-[#F0EEED] h-screen overflow-hidden">
                    <div className='max-w-[500px] h-screen mx-auto '>
                        <VideoPlayer videoData={videoData} />
                        <MenuBarBottom menuBarMenuIsOpen={menuBarMenuIsOpen} setMenuBarMenuIsOpen={setMenuBarMenuIsOpen} videoData={videoData} />

                        <div className="py-3 px-3 shadow-md" onClick={() => setMenuBarMenuIsOpen(!menuBarMenuIsOpen)}>
                            <h1 className="text-[20px] font-semibold">{videoData?.video_name}</h1>
                            <div className="flex gap-2 text-[14px] font-medium text-[#595959]">
                                <span>{videoData?.video_views}</span>
                                <span>{videoData?.updatedAt}</span>
                                <span>{"#tom and jerry"}</span>
                                <button>
                                    ...<span className="font-semibold text-[#000]">more</span>
                                </button>
                            </div>
                        </div>

                        {/* <SuggestedVideo allvideoData={allvideoData} /> */}
                    </div>
                </div>
            }
            {/* <MenuBar /> */}
        </>
    )
}