import { Dispatch, SetStateAction, useState } from "react"
import { VideoType } from "../../../lib/types/video_type"

interface MenuBarBottomProps {
    menuBarMenuIsOpen: boolean
    setMenuBarMenuIsOpen: Dispatch<SetStateAction<boolean>>
    videoData: VideoType | null
}


export default function MenuBarBottom({ menuBarMenuIsOpen, setMenuBarMenuIsOpen, videoData }: MenuBarBottomProps) {
    const [readMoreIsOpen, setreadMoreIsOpen] = useState(false)
    const forTestText = videoData?.video_description && videoData?.video_description
    // Use menuBarMenuIsOpen and setMenuBarMenuIsOpen here
    const toggleMenuBarMenu = () => {
        setMenuBarMenuIsOpen(!menuBarMenuIsOpen);
    };


    return (
        <>
            <div className={`relative ${menuBarMenuIsOpen && "h-full bg-black"}`}>
                <div className={`bg-[#fff] h-full rounded-t-[15px] shadow-xl absolute w-full overflow-scroll transition-all duration-300 z-50 ${menuBarMenuIsOpen ? "-bottom-[0%]" : "-bottom-[100%]"}`}>
                    <hr className="h-[2px] bg-black mt-3 w-[50px] mx-auto" />
                    <div className="pt-[15px] px-3">
                        <div className="flex justify-between gap-2">
                            <h1 className="text-[18px] font-bold">{videoData?.video_name}</h1>
                            <button onClick={() => toggleMenuBarMenu()}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="28px" height="28px"><path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z" /></svg>
                            </button>
                        </div>
                        <hr className="h-[1px] bg-[#9c9c9ca6] mt-5" />
                    </div>
                    <div className={`px-3 mt-[10px] ${readMoreIsOpen && "h-[110%] mb-5 overflow-scroll"}`}>
                        <ul className="flex justify-evenly mt-[20px]">
                            <li className="flex flex-col items-center">
                                <span className="text-[18px] font-bold">{videoData?.video_likes}</span>
                                <span className="text-[14px] text-[#595959]">Likelar</span>
                            </li>
                            <li className="flex flex-col items-center">
                                <span className="text-[18px] font-bold">{videoData?.video_views}</span>
                                <span className="text-[14px] text-[#595959]">Ko'rishlar</span>
                            </li>
                            <li className="flex flex-col items-center">
                                <span className="text-[16px] font-bold">{videoData?.updatedAt}</span>
                                <span className="text-[14px] text-[#595959]">Yuklangan vaqt</span>
                            </li>
                        </ul>

                        <ul className="flex gap-x-4 gap-y-2 flex-wrap mt-[15px]">
                            <li className="bg-[#eeeeee] inline-block px-3 py-[2px] rounded-[30px]">
                                <span className="text-[14px] text-[#595959] font-medium ">#{videoData?.video_type}</span>
                            </li>
                        </ul>

                        <div className="bg-[#eeeeee] mt-[15px] p-3 font-medium rounded-[10px]">
                            <p>{readMoreIsOpen ? forTestText : forTestText && forTestText.slice(0, 200)} ...</p>
                            <button onClick={() => setreadMoreIsOpen(!readMoreIsOpen)} className="text-[14px] text-[#595959] font-medium mt-[10px]">{readMoreIsOpen ? "Kamroq ko'rsatish" : "Ko'proq"}</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* overlay */}
            {menuBarMenuIsOpen && <div className="w-full h-full bg-black top-0 left-0 opacity-20 absolute z-40" onClick={() => setMenuBarMenuIsOpen(false)}></div>}
        </>
    );
}