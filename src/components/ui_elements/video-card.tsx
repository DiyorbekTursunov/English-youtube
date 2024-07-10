import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { VideoType } from "../../lib/types/video_type";
import { baseUrlAxios } from "@/axiosConfig";
import { AppDispatch, RootState } from "@/app/store";
import { postCheckUserToken } from "@/features/auth_slice/checkUserIsLogin";

interface VideoCardProps {
    video: VideoType;
}

export default function VideoCard({ video }: VideoCardProps) {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { userData } = useSelector((state: RootState) => state.checkUser);

    useEffect(() => {
        if (!userData) {
            dispatch(postCheckUserToken({ navigate }));
        }
    }, [dispatch, navigate, userData]);

    const setLastViewedVideos = async () => {
        navigate(`/player/${video.video_youtube_id}`);
        await baseUrlAxios.post('auth/set_my_views', { userId: userData._id, videoId: video._id });
    };

    return (
        <div onClick={() => setLastViewedVideos()}>
            <img src={video.video_img_url} alt="Video Thumbnail" className="video_thumbnail w-full h-[260px]" />
            <h1 className="mt-[5px] text-sm font-semibold line-clamp-1">{video.video_name}</h1>
            <div className="flex justify-between mt-[3px]">
                <div className="flex items-center gap-2">
                    <span className="text-xs">{video.video_likes} marta ko'rishlar</span>
                    <span className="text-xs">{video.updatedAt}</span>
                </div>
            </div>
        </div>
    );
}