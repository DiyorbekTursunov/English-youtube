import { useEffect, useState } from "react";
import VideoPlayer from "../components/ui_elements/video_player";
import MenuBarBottom from "../components/ui_elements/video_player/menu_bar_bottom";
// import SuggestedVideo from "../components/ui_elements/video_player/suggested_video";
import { useNavigate, useParams } from "react-router-dom";
import { VideoType } from "../lib/types/video_type";
import { baseUrlAxios } from "@/axiosConfig";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from '@/app/store'; // Ensure the path is correct
import { postCheckUserToken } from "@/features/auth_slice/checkUserIsLogin";
import MenuBar from "@/components/ui_elements/menu_bar";
import SuggestedVideo from "@/components/ui_elements/video_player/suggested_video";
import Loader from "@/components/loader/loader";

// import { videosData } from "../db/videos";
// import MenuBar from "../components/ui_elements/menu_bar";
// Function to shuffle an array


function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


// Function to set a random video
function setRandomVideo(videoDataArray: VideoType[], setVideoDataFun: (video: VideoType) => void): void {
    const shuffledVideos = shuffleArray(videoDataArray);
    const randomVideo = shuffledVideos[0];
    setVideoDataFun(randomVideo);
}

export default function PlayVideo() {
    const { slug } = useParams()
    const [allvideoData, setAllvideoData] = useState<VideoType[] | null>(null)
    const [videoData, setVideoData] = useState<VideoType | null>(null)
    const [likeCount, setlikeCount] = useState<number>(0)
    const [isLoading, setisLoading] = useState(true)

    const [menuBarMenuIsOpen, setMenuBarMenuIsOpen] = useState<boolean>(false)

    const [userIsLiked, setuserIsLiked] = useState<boolean>(true)
    // setTimeout(() => {
    //     console.log(document.querySelector('.ytp-chrome-top'));
    // }, 3000);


    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { userData } = useSelector((state: RootState) => state.checkUser);


    useEffect(() => {
        dispatch(postCheckUserToken({ navigate }));
    }, [dispatch, navigate]);



    useEffect(() => {
        // Fetch all videos
        const getAllVideosFun = async () => {
            try {
                const response = await baseUrlAxios.get("/video/get-all");
                if (response.status === 200) {
                    setAllvideoData(response.data);
                    setisLoading(false)
                }
            } catch (error) {
                console.error("Error fetching videos", error);
                setisLoading(false)
            }
        };
        getAllVideosFun();
    }, [])


    useEffect(() => {
        if (!slug || !allvideoData) return;

        const videoData = allvideoData.find(video => video.video_youtube_id === slug);

        if (videoData) {
            // Function to handle setting the video data
            const setVideoDataFun = (video: VideoType): void => {
                console.log("Random Video Selected:", video);
            };

            // Call the function to set a random video
            setRandomVideo(allvideoData, setVideoDataFun);

            setVideoData(videoData)
            setlikeCount(Number(videoData.video_likes));
        }
    }, [slug, allvideoData]);


    const setLike = () => {
        setlikeCount(likeCount + 1)
        // Update video like count in db
        const updateLikeFun = async () => {
            try {
                const res = await baseUrlAxios.post('/video/set-like', {
                    userId: userData?._id, videoId: videoData?._id
                });

                console.log(res);


                if (res.status !== 200) {
                    setuserIsLiked(true)
                }
            } catch (error) {
                console.error("Error updating like count", error);
            }
        };
        updateLikeFun();
    }


    const cheackUserIsLiked = () => {
        if (videoData) {
            const userIsLiked = videoData?.liked_videos_user_id.find((v) => v._id === userData._id)

            if (!userIsLiked?._id) {
                setLike()
                setuserIsLiked(true)
            }
        }
    }


    useEffect(() => {
        const userIsLiked = videoData?.liked_videos_user_id.find((v) => v._id === userData._id)

        if (!userIsLiked?._id) {
            setuserIsLiked(false)
        } else {
            setuserIsLiked(true)
        }
    }, [videoData?.liked_videos_user_id, userData?._id])



    return (
        <>
            {isLoading ?
                <Loader /> :
                <div className="w-full bg-[#f8f7f6] h-screen overflow-hidden">
                    <div className='max-w-[500px] h-screen mx-auto' onScroll={() => console.log(window.scrollX)}>
                        <div className="h-[290px]">
                            <VideoPlayer videoData={videoData} />
                        </div>
                        <MenuBarBottom menuBarMenuIsOpen={menuBarMenuIsOpen} setMenuBarMenuIsOpen={setMenuBarMenuIsOpen} videoData={videoData} />

                        <div className="h-full w-full overflow-scroll">
                            <div className="py-3 px-3 shadow-md ">
                                <div className="mb-3" onClick={() => setMenuBarMenuIsOpen(!menuBarMenuIsOpen)}>
                                    <h1 className="text-[18px] font-semibold line-clamp-1">{videoData?.video_name}</h1>
                                    <div className="flex flex-wrap gap-2 text-[14px] line-clamp-1 font-medium text-[#595959]">
                                        <span>{videoData?.video_views} marta ko'rishlar</span>
                                        <span>{videoData?.updatedAt}</span>
                                        <span>#{videoData?.video_type}</span>
                                        <button className="flex-nowrap">
                                            ...<span className="font-semibold text-[#000]">Ko'proq</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="bg-[#e2e2e2] flex items-center gap-5  rounded-xl py-1 px-3">
                                        {/* Set like */}
                                        {userIsLiked ?
                                            <button className="flex gap-3 cursor-auto">
                                                <svg xmlns="http://www.w3.org/2000/svg" height="20px" width="20px" viewBox="0 0 512 512"><path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z" /></svg>
                                                <span>{likeCount}</span>
                                            </button>
                                            :
                                            <button className="flex gap-3" onClick={() => cheackUserIsLiked()}>
                                                <svg xmlns="http://www.w3.org/2000/svg" height="20px" width="20px" viewBox="0 0 512 512"><path d="M323.8 34.8c-38.2-10.9-78.1 11.2-89 49.4l-5.7 20c-3.7 13-10.4 25-19.5 35l-51.3 56.4c-8.9 9.8-8.2 25 1.6 33.9s25 8.2 33.9-1.6l51.3-56.4c14.1-15.5 24.4-34 30.1-54.1l5.7-20c3.6-12.7 16.9-20.1 29.7-16.5s20.1 16.9 16.5 29.7l-5.7 20c-5.7 19.9-14.7 38.7-26.6 55.5c-5.2 7.3-5.8 16.9-1.7 24.9s12.3 13 21.3 13L448 224c8.8 0 16 7.2 16 16c0 6.8-4.3 12.7-10.4 15c-7.4 2.8-13 9-14.9 16.7s.1 15.8 5.3 21.7c2.5 2.8 4 6.5 4 10.6c0 7.8-5.6 14.3-13 15.7c-8.2 1.6-15.1 7.3-18 15.2s-1.6 16.7 3.6 23.3c2.1 2.7 3.4 6.1 3.4 9.9c0 6.7-4.2 12.6-10.2 14.9c-11.5 4.5-17.7 16.9-14.4 28.8c.4 1.3 .6 2.8 .6 4.3c0 8.8-7.2 16-16 16H286.5c-12.6 0-25-3.7-35.5-10.7l-61.7-41.1c-11-7.4-25.9-4.4-33.3 6.7s-4.4 25.9 6.7 33.3l61.7 41.1c18.4 12.3 40 18.8 62.1 18.8H384c34.7 0 62.9-27.6 64-62c14.6-11.7 24-29.7 24-50c0-4.5-.5-8.8-1.3-13c15.4-11.7 25.3-30.2 25.3-51c0-6.5-1-12.8-2.8-18.7C504.8 273.7 512 257.7 512 240c0-35.3-28.6-64-64-64l-92.3 0c4.7-10.4 8.7-21.2 11.8-32.2l5.7-20c10.9-38.2-11.2-78.1-49.4-89zM32 192c-17.7 0-32 14.3-32 32V448c0 17.7 14.3 32 32 32H96c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32H32z" /></svg>
                                                <span>{likeCount}</span>
                                            </button>}


                                        {/* set dislike */}
                                        <button className="flex gap-3">
                                            <svg fill="#000000" height="20px" className="rotate-180" width="20px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve">
                                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                                <g id="SVGRepo_iconCarrier"> <g>
                                                    <path d="M498.323,297.032c0-7.992-1.901-15.683-5.553-22.635c12.034-9.18,19.23-23.438,19.23-38.914 c0-27.037-21.996-49.032-49.032-49.032H330.206c11.434-29.24,17.665-64.728,17.665-101.419c0-23.266-18.928-42.194-42.194-42.194 s-42.193,18.928-42.193,42.194c0,83.161-58.012,145.389-144.355,154.844c-0.592,0.065-1.159,0.197-1.7,0.38 C111.752,235.129,104.235,232,96,232H32c-17.645,0-32,14.355-32,32v152c0,17.645,14.355,32,32,32h64 c9.763,0,18.513-4.4,24.388-11.315c20.473,2.987,33.744,9.534,46.568,15.882c16.484,8.158,33.53,16.595,63.496,16.595h191.484 c27.037,0,49.032-21.996,49.032-49.032c0-7.991-1.901-15.683-5.553-22.635c12.034-9.18,19.23-23.438,19.23-38.914 c0-7.991-1.901-15.683-5.553-22.635C491.126,326.766,498.323,312.507,498.323,297.032z M465.561,325.727H452c-4.418,0-8,3.582-8,8 s3.582,8,8,8h11.958c3.061,5.1,4.687,10.847,4.687,16.854c0,12.106-6.56,23.096-17.163,28.919h-14.548c-4.418,0-8,3.582-8,8 s3.582,8,8,8h13.481c2.973,5.044,4.553,10.71,4.553,16.629c0,18.214-14.818,33.032-33.032,33.032H230.452 c-26.223,0-40.207-6.921-56.398-14.935c-12.358-6.117-26.235-12.961-46.56-16.594c0.326-1.83,0.506-3.71,0.506-5.632V295 c0-4.418-3.582-8-8-8s-8,3.582-8,8v121c0,8.822-7.178,16-16,16H32c-8.822,0-16-7.178-16-16V264c0-8.822,7.178-16,16-16h64 c8.822,0,16,7.178,16,16c0,4.418,3.582,8,8,8s8-3.582,8-8c0-3.105-0.453-6.105-1.282-8.947 c44.778-6.106,82.817-25.325,110.284-55.813c27.395-30.408,42.481-70.967,42.481-114.208c0-14.443,11.75-26.194,26.193-26.194 c14.443,0,26.194,11.75,26.194,26.194c0,39.305-7.464,76.964-21.018,106.04c-1.867,4.004-0.134,8.764,3.871,10.631 c1.304,0.608,2.687,0.828,4.025,0.719c0.201,0.015,0.401,0.031,0.605,0.031h143.613c18.214,0,33.032,14.818,33.032,33.032 c0,11.798-6.228,22.539-16.359,28.469h-14.975c-4.418,0-8,3.582-8,8s3.582,8,8,8h12.835c3.149,5.155,4.822,10.984,4.822,17.079 C482.323,308.985,475.927,319.848,465.561,325.727z"></path>
                                                    <path d="M422.384,325.727h-8.525c-4.418,0-8,3.582-8,8s3.582,8,8,8h8.525c4.418,0,8-3.582,8-8S426.802,325.727,422.384,325.727z"></path>
                                                    <path d="M436.934,263.953h-8.525c-4.418,0-8,3.582-8,8s3.582,8,8,8h8.525c4.418,0,8-3.582,8-8S441.352,263.953,436.934,263.953z"></path>
                                                    <path d="M407.833,387.5h-8.525c-4.418,0-8,3.582-8,8s3.582,8,8,8h8.525c4.418,0,8-3.582,8-8S412.252,387.5,407.833,387.5z"></path>
                                                    <path d="M80,264c-8.822,0-16,7.178-16,16s7.178,16,16,16s16-7.178,16-16S88.822,264,80,264z"></path>
                                                </g>
                                                </g>
                                            </svg>
                                        </button>
                                    </div>

                                    <button onClick={() => { navigator.clipboard.writeText(`http://localhost:5173${window.location.pathname}`); }} className="bg-[#e2e2e2] flex items-center gap-3  rounded-xl py-1 px-3">
                                        <svg fill="#000000" width={18} height={18} viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                            <g id="SVGRepo_iconCarrier">
                                                <path d="M28.183 29.668h-26v-20h8.050l2.023-1.948-0.052-0.052h-10.021c-1.105 0-2 0.896-2 2v20c0 1.105 0.895 2 2 2h26c1.105 0 2-0.895 2-2v-15.646l-2 1.909v13.737zM8.442 21.668l2.015-0c1.402-7.953 8.329-14 16.684-14 0.351 0 0.683 0.003 1.019 0.005l-3.664 3.664c-0.39 0.39-0.39 1.024 0 1.414 0.195 0.196 0.452 0.293 0.708 0.293s0.511-0.098 0.706-0.293l5.907-6.063-5.907-6.064c-0.39-0.391-1.023-0.391-1.414 0-0.39 0.391-0.39 1.024 0 1.414l3.631 3.63c-0.314-0-0.624-0.002-0.944-0.002-9.47 0-17.299 6.936-18.741 16.001z"></path>
                                            </g>
                                        </svg>

                                        <span>Ulashish</span>
                                    </button>
                                </div>
                            </div>

                            <SuggestedVideo allvideoData={allvideoData} />
                        </div>
                    </div>
                </div>
            }
            <MenuBar />
        </>
    )
}