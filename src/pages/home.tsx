import Navbar from "../components/ui_elements/navbar";
import Adversizement from "../components/ui_elements/adversizement";
import Videos from "../components/ui_elements/videos";
import MenuBar from "../components/ui_elements/menu_bar";
import { useEffect, useState } from "react";
import axios from "axios";
import { VideoType } from "../lib/types/video_type";


export default function Home() {
    const [allVideos, setallVideos] = useState<VideoType[]>([])

    useEffect(() => {
        const getAllVideosFun = async () => {
            try {
                const response = await axios.get("http://localhost:3000/video/get-all");
                setallVideos(response.status === 200 && response.data)

            } catch (error) {
                console.error("Error fetching videos", error);
            }
        }
        getAllVideosFun()
    }, [])

    return (
        <>
            <div className="w-full h-full bg-[#F0EEED]">
                <div className='max-w-[500px] mx-auto px-3'>
                    <Navbar />
                    <Adversizement />
                    <Videos allVideos={allVideos} />
                    {/* <AllVideos allVideos={allVideos} /> */}
                </div>
            </div>
            <MenuBar />
        </>
    )
}