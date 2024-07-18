import Adversizement from "../components/ui_elements/adversizement";
import Videos from "../components/ui_elements/videos";
import MenuBar from "../components/ui_elements/menu_bar";
import { useEffect, useState } from "react";
import { VideoType } from "../lib/types/video_type";
import { postCheckUserToken } from "@/features/auth_slice/checkUserIsLogin";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from '@/app/store';
import { baseUrlAxios } from "@/axiosConfig";
import Loader from "@/components/loader/loader";

export default function Home() {
    const [allVideos, setAllVideos] = useState<VideoType[]>([]);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    
    const { loading } = useSelector((state: RootState) => state.checkUser);

    useEffect(() => {
        // Fetch all videos
        const getAllVideosFun = async () => {
            try {
                const response = await baseUrlAxios.get("/video/get-all");
                if (response.status === 200) {
                    setAllVideos(response.data);
                }
            } catch (error) {
                console.error("Error fetching videos", error);
            }
        };
        getAllVideosFun();

        // Dispatch the user token verification thunk
        const verifyToken = async () => {
            await dispatch(postCheckUserToken({ navigate })).unwrap();
        }

        verifyToken()

    }, [dispatch, navigate]);
    
    return (
        <>
            {
                loading ? (
                    <Loader />
                ) : (
                    <div className="w-full h-full bg-[#F0EEED] pt-1">
                        <div className='max-w-[500px] mx-auto pb-20'>
                            <Adversizement />
                            <Videos allVideos={allVideos} />
                            {/* <Videos allVideos={allVideos} /> */}
                        </div>
                        <MenuBar />
                    </div>
                )
            }
        </>
    );
}