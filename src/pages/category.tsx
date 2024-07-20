import { AppDispatch, RootState } from "@/app/store";
import { baseUrlAxios } from "@/axiosConfig";
import Loader from "@/components/loader/loader";
import MenuBar from "@/components/ui_elements/menu_bar";
import { postCheckUserToken } from "@/features/auth_slice/checkUserIsLogin";
import { VideoType } from "@/lib/types/video_type";
import { useEffect, useState, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import 'swiper/css';
import VideoCard from '../components/ui_elements/video-card';

export default function Category() {
    const [allVideos, setAllVideos] = useState<VideoType[]>([]);
    const [searchedVideos, setSearchedVideos] = useState<VideoType[]>([]);
    const [userIsSearched, setuserIsSearched] = useState(false)
    const [category, setCategory] = useState<number>(0);
    const [categoryIsOpen, setCategoryIsOpen] = useState<boolean>(false);
    const [searchIsOpen, setSearchIsOpen] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>("");

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { loading } = useSelector((state: RootState) => state.checkUser);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await baseUrlAxios.get("/video/get-all");
                if (response.status === 200) {
                    setAllVideos(response.data);
                }
            } catch (error) {
                console.error("Error fetching videos", error);
            }
        };

        const verifyToken = async () => {
            await dispatch(postCheckUserToken({ navigate })).unwrap();
        };

        fetchVideos();
        verifyToken();
    }, [dispatch, navigate]);

    const groupByVideoType = (videos: VideoType[]): Record<string, VideoType[]> => {
        return videos.reduce((acc, video) => {
            if (!acc[video.video_type]) {
                acc[video.video_type] = [];
            }
            acc[video.video_type].push(video);
            return acc;
        }, {} as Record<string, VideoType[]>);
    };

    const groupedVideos = groupByVideoType(allVideos);

    const searchVideos = () => {
        if (inputValue) {
            const searchResult = allVideos.filter(video =>
                video.video_name.toLowerCase().includes(inputValue.toLowerCase())
            );
            setSearchedVideos(searchResult);
            setuserIsSearched(true)
        } else {
            setSearchedVideos([]);
        }
    };

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSearchClick = () => {
        searchVideos();
        setSearchIsOpen(false);
    };

    const handleCategoryClick = (index: number) => {
        setCategory(index);
        setCategoryIsOpen(false);
    };

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div className="w-full h-full bg-[#F0EEED]">
                    <div className='max-w-[500px] mx-auto pb-20 pt-5'>
                        {(searchIsOpen || categoryIsOpen) && (
                            <div
                                className="fixed w-full h-screen bg-[#000000] z-30 opacity-40"
                                onClick={() => {
                                    setSearchIsOpen(false);
                                    setCategoryIsOpen(false);
                                }}
                            ></div>
                        )}

                        <div className="max-w-[500px] mx-auto w-full bg-white flex justify-between shadow-md py-4 top-0 px-5 fixed z-50">
                            <button
                                onClick={() => {
                                    setSearchIsOpen(prev => !prev);
                                    setCategoryIsOpen(false);
                                }}
                            >
                                <svg width={20} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                            </button>
                            <button
                                onClick={() => {
                                    setSearchIsOpen(false);
                                    setCategoryIsOpen(prev => !prev);
                                }}
                            >
                                <svg width={20} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none">
                                    <path fill="#000000" fillRule="evenodd" d="M19 4a1 1 0 01-1 1H2a1 1 0 010-2h16a1 1 0 011 1zm0 6a1 1 0 01-1 1H2a1 1 0 110-2h16a1 1 0 011 1zm-1 7a1 1 0 100-2H2a1 1 0 100 2h16z"></path>
                                </svg>
                            </button>
                        </div>

                        {userIsSearched || categoryIsOpen && (
                            <div className="max-w-[500px] mx-auto w-full transition-all duration-400 grid grid-cols-2 gap-x-5 py-5 shadow-md px-3 gap-y-3 fixed z-40 bg-[#F0EEED] top-[50px]">
                                {[...new Set(allVideos.map(video => video.video_type))].map((videoType, index) => (
                                    <button
                                        onClick={() => handleCategoryClick(index)}
                                        key={index}
                                        className={`${category === index ? "active_category" : ""} w-full py-2 px-3 bg-[#e6e6e6] text-sm rounded-sm font-medium capitalize`}
                                    >
                                        {videoType}
                                    </button>
                                ))}
                            </div>
                        )}

                        {searchIsOpen && (
                            <div className="flex gap-3 max-w-[500px] mx-auto w-full transition-all duration-400 py-5 shadow-md px-3 gap-y-3 fixed z-40 bg-[#F0EEED] top-[50px]">
                                <input
                                    type="text"
                                    className="py-2 pl-2 placeholder:text-sm placeholder:font-medium w-full"
                                    placeholder="Qidirish"
                                    value={inputValue}
                                    onChange={handleSearchChange}
                                />
                                <button
                                    className="font-bold text-sm bg-white px-3 rounded-lg"
                                    onClick={handleSearchClick}
                                >
                                    Qidirish
                                </button>
                            </div>
                        )}

                        {userIsSearched || Object.keys(groupedVideos).map((key, index) => (
                            category === index && (
                                <div className='h-screen mb-8 px-3 pt-12' key={key}>
                                    <h2 className='text-xl font-bold mb-5 pl-2 capitalize'>{key}</h2>
                                    <div className='max-w-[425px] mx-auto'>
                                        <div className='mb-[24px]'>
                                            <div className='flex flex-col gap-y-[20px] pb-[90px]'>
                                                {groupedVideos[key].length ? groupedVideos[key].map(video => (
                                                    <VideoCard video={video} isSwiper={false} key={video._id} />
                                                )) : (
                                                    <div className='bg-slate-100 py-10'>
                                                        {/* <svg viewBox="0 0 1024 1024" className="mx-auto" width={70} version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                                                            <path d="M702.537143 218.477714c31.085714-10.825143 55.003429-23.113143 69.924571-35.328 10.24-8.338286 13.458286-13.824 13.458286-16.018285s-3.218286-7.68-13.458286-16.091429c-14.921143-12.141714-38.765714-24.429714-69.924571-35.254857C634.368 92.16 540.013714 78.336 438.857143 78.336s-195.510857 13.897143-263.68 37.449143c-31.085714 10.825143-55.003429 23.113143-69.924572 35.328-10.24 8.338286-13.458286 13.750857-13.458285 16.018286 0 2.194286 3.218286 7.68 13.458285 16.018286 14.912571 12.141714 38.765714 24.429714 69.924572 35.328 68.168571 23.721714 150.611429 37.405714 248.745714 37.405714 98.120571 0 181.546286-13.684 249.687429-37.405714zM438.857143 93.714857c67.677714 0 124.044571 11.482857 168.286857 33.823429 31.075429 18.712571 48.371429 39.098857 48.371429 55.586857s-17.295429 36.874857-48.371429 55.586857c-44.242286 22.340571-100.582857 33.823429-168.286857 33.823429-67.678857 0-124.037714-11.482857-168.285714-33.823429-31.075429-18.712571-48.371429-39.098857-48.371429-55.586857s17.295429-36.874857 48.371429-55.586857c44.248571-22.340571 100.606857-33.823429 168.285714-33.823429zM438.857143 617.021714c-91.088571 0-171.014857 41.446857-215.693714 105.657143-4.186286 6.890286-4.405714 8.612571-4.405714 16.409143 0 12.580571 10.586857 22.778857 23.427429 22.778857h671.074286c12.840571 0 23.427429-10.198286 23.427429-22.778857 0-7.796571-0.219429-9.518857-4.405714-16.409143-44.665714-64.210286-124.605714-105.657143-215.693714-105.657143zM438.857143 646.264571c73.445714 0 137.104571 32.545714 180.935429 83.542857 0.681714 1.018286 1.177143 2.489714 1.496571 3.715429 0.982857 3.428571 1.172571 7.548571 1.172571 12.771429s-0.189714 9.342857-1.172571 12.771429c-0.319429 1.225714-0.814857 2.697143-1.496571 3.715429-43.830857 51.03-107.455429 83.575429-180.935429 83.575429-73.517714 0-137.163429-32.545714-180.949714-83.575429-0.681714-1.018286-1.172571-2.489714-1.496571-3.715429-0.982857-3.428571-1.172571-7.548571-1.172571-12.771429s0.189714-9.342857 1.172571-12.771429c0.319429-1.225714 0.814857-2.697143 1.496571-3.715429 43.785143-51.03 107.431429-83.542857 180.949714-83.542857z" />
                                                            <path d="M496.64 329.635429c-5.072 1.194286-8.725714 7.253714-10.209143 15.823429-1.212571 6.626286-0.833143 13.827429 1.210286 21.252571 2.528571 9.777143 6.898286 19.939429 11.931429 29.989714 2.703429 5.763429 5.771429 11.126857 8.615429 16.384-16.485714 6.340571-24.091429 10.066286-24.091429 10.066286s-2.482286-3.329143-3.014857-7.856571c-0.925714-5.125714-0.418286-11.823429 1.210286-19.774857 1.052571-6.585143 4.733714-13.621714 10.157714-20.276571 7.757714-9.212571 19.481143-17.059429 32.181714-20.787429 1.126857-0.372571 2.483429-0.425143 3.804571-0.210286 5.272571 1.401143 10.099429 7.134857 11.403429 14.368286 1.210286 6.493714 0.895429 12.790857-1.306286 19.003429-1.126857 4.444571-4.149714 8.960571-8.640571 12.817143-3.901714 3.391429-8.263429 6.151429-13.101714 7.586857-5.171429 1.311429-10.694857 2.365714-16.048571 2.829714-11.573714 0.697143-23.679429-1.547429-33.085714-7.078857-10.063429-5.192571-20.508571-12.013714-29.678857-19.966857-5.941714-5.224571-11.658286-11.086286-16.411429-17.489714-5.211429-6.688-9.950857-13.677714-12.982857-21.368571-4.663429-11.755429-5.272571-24.184571-0.418286-36.350857 3.063429-9.362857 7.437714-18.395429 13.930857-26.051429 11.698857-13.237714 27.980571-22.051429 45.654857-24.184571 5.062857-0.811429 10.103429-0.978286 15.177143-0.594286 7.065143 0.562286 13.490286 2.154286 19.248571 4.472571 0.865143 0.309714 1.794286 0.689143 2.836571 1.068571 2.980571 0.924571 5.769714 1.972571 8.363429 3.280571 11.704571 4.306286 22.797714 9.698857 31.427429 16.519429 8.237714 6.115429 16.218286 12.652571 23.092571 20.074286 3.401143 3.135429 6.774857 6.425143 10.032857 9.667429 7.257143 6.535429 12.212571 13.895429 15.893714 22.376571 0.677714 2.310857 1.122857 4.832857 1.337143 7.597714 0.029714 0.357143-0.160571 0.679429-0.475429 0.677714z" />
                                                        </svg> */}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        )
                        )}

                        {searchedVideos.length ? (
                            <div className='h-screen mb-8 px-3 pt-12'>
                                <div className="flex items-center gap-2 mb-5 pl-3">
                                    <button className="px-3" onClick={() => window.location.reload()}>
                                        <svg fill="#000000" height="20px" width="20px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 476.213 476.213" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <polygon points="476.213,223.107 57.427,223.107 151.82,128.713 130.607,107.5 0,238.106 130.607,368.714 151.82,347.5 57.427,253.107 476.213,253.107 "></polygon> </g></svg>
                                    </button>
                                    /
                                    <h2 className='font-bold pl-2 capitalize'>Qidirish natijalari</h2>
                                </div>
                                <div className='max-w-[425px] mx-auto'>
                                    <div className='mb-[24px]'>
                                        <div className='flex flex-col gap-y-[20px] pb-[90px]'>
                                            {searchedVideos.map(video => (
                                                <VideoCard video={video} isSwiper={false} key={video._id} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) :
                            <div className="h-[90vh] w-full flex justify-center items-center">
                                <div className=''>
                                    <svg viewBox="0 0 1024 1024" className="mx-auto" width={70} version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M702.537143 218.477714c31.085714-10.825143 55.003429-23.113143 69.924571-35.328 10.24-8.338286 13.458286-13.824 13.458286-16.018285s-3.218286-7.68-13.458286-16.091429c-14.921143-12.141714-38.765714-24.429714-69.924571-35.254857C634.368 92.16 540.013714 78.336 438.857143 78.336s-195.510857 13.897143-263.68 37.449143c-31.085714 10.825143-55.003429 23.113143-69.924572 35.328-10.24 8.338286-13.458286 13.750857-13.458285 16.018286 0 2.194286 3.218286 7.68 13.458285 16.091428 14.921143 12.141714 38.765714 24.429714 69.924572 35.254857 68.169143 23.625143 162.523429 37.449143 263.68 37.449143s195.510857-13.897143 263.68-37.449143zM69.485714 464.749714v128.804572c37.961143 40.009143 140.068571 88.722286 264.777143 103.277714 182.857143 21.284571 355.986286-18.651429 473.526857-98.304l0.438857-131.657143C683.008 540.525714 506.733714 571.465143 328.484571 550.619429c-110.372571-12.8-204.361143-46.08-259.072-85.869715z m0-80.457143c38.034286 39.936 140.068571 88.649143 264.777143 103.131429 183.222857 21.357714 356.717714-18.724571 474.258286-98.742857l0.512-145.993143C734.208 286.573714 596.48 315.977143 438.857143 315.977143c-156.964571 0-294.253714-29.257143-369.152-72.777143A132116.333714 132116.333714 0 0 0 69.485714 384.219429z m0.146286 289.865143l0.292571 108.105143-1.097142-7.460571c22.381714 74.020571 165.302857 133.485714 378.148571 133.485714 115.931429 0 206.774857-17.554286 276.626286-52.077714 19.602286-9.728 34.523429-17.92 49.152-28.598857 9.728-7.094857 16.091429-11.410286 26.550857-20.626286 10.825143-9.581714 27.501714-7.241143 37.156571 3.657143 9.581714 10.752 10.825143 28.306286 0 37.961143-11.702857 10.24-17.188571 14.848-28.598857 23.186285-17.042286 12.434286-36.425143 25.380571-58.806857 36.498286-77.092571 38.107429-155.648 60.854857-302.08 60.854857-243.931429 0-405.211429-77.165714-436.077714-179.2l-1.097143-3.657143v-3.803428L9.362286 628.077714a116682.532571 116682.532571 0 0 1 0.365714-455.68 52.662857 52.662857 0 0 1-0.292571-5.266285C9.508571 84.918857 201.728 18.285714 438.857143 18.285714c237.129143 0 429.348571 66.633143 429.348571 148.845715a53.028571 53.028571 0 0 1-0.804571 9.581714 23.405714 23.405714 0 0 1 1.024 7.094857l-1.682286 520.411429c-0.073143 14.482286-13.385143 26.185143-29.769143 26.112-16.384 0-29.622857-11.776-29.549714-26.331429v-27.355429c-125.074286 73.216-301.056 104.082286-478.939429 83.382858-110.226286-12.873143-204.214857-46.08-258.925714-85.869715z m668.525714-290.962285a25.746286 25.746286 0 0 1-25.965714-25.453715c0-14.043429 11.702857-25.380571 26.038857-25.380571 14.336 0 26.038857 11.337143 26.038857 25.380571 0 14.116571-11.702857 25.453714-26.038857 25.453715z m0 209.408a25.746286 25.746286 0 0 1-25.965714-25.453715c0-14.043429 11.702857-25.453714 26.038857-25.453714 14.336 0 26.038857 11.410286 26.038857 25.453714 0 14.043429-11.702857 25.453714-26.038857 25.453715z m0 212.114285a25.746286 25.746286 0 0 1-25.965714-25.526857c0-14.043429 11.702857-25.453714 26.038857-25.453714 14.336 0 26.038857 11.410286 26.038857 25.453714 0 14.043429-11.702857 25.453714-26.038857 25.453714z" fill="#000000"></path></g></svg>
                                    <h2 className='font-bold mt-2 text-center mb-5'>Malumot topilmadi</h2>

                                    <button className="py-2 px-10 mx-auto bg-slate-50 rounded-xl" onClick={() => window.location.reload()}>
                                        Qayta yuklash
                                    </button>
                                </div>
                            </div>
                        }
                    </div>
                    <MenuBar />
                </div>
            )}
        </>
    );
}
