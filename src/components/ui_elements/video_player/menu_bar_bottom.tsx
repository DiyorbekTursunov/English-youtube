import { Dispatch, SetStateAction, useState } from "react"
import { VideoType } from "../../../lib/types/video_type"

interface MenuBarBottomProps {
    menuBarMenuIsOpen: boolean
    setMenuBarMenuIsOpen: Dispatch<SetStateAction<boolean>>
    videoData: VideoType | null
}


export default function MenuBarBottom({ menuBarMenuIsOpen, setMenuBarMenuIsOpen, videoData }: MenuBarBottomProps) {
    const [readMoreIsOpen, setreadMoreIsOpen] = useState(false)
    const forTestText = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium ab minus dolorum, ducimus accusamus at porro facere? Beatae, aliquam est, facere similique amet dolorum sapiente culpa molestias excepturi debitis, dolor repellat esse nobis laudantium adipisci aliquid dignissimos? Labore, aliquid aliquam inventore ipsum ut quo ab eaque deleniti placeat commodi soluta explicabo, debitis consequuntur expedita numquam eveniet fugiat voluptatum magni, dignissimos ex voluptas quod officiis distinctio totam! Eum voluptate quidem inventore fugiat consequuntur est odit saepe harum doloremque commodi aut illo, sunt nobis modi, culpa blanditiis sapiente debitis iure atque sequi exercitationem voluptas. Eligendi asperiores ut perspiciatis, facilis ab nihil quibusdam."
    // Use menuBarMenuIsOpen and setMenuBarMenuIsOpen here
    const toggleMenuBarMenu = () => {
        setMenuBarMenuIsOpen(!menuBarMenuIsOpen);
    };


    return (
        <>
            <div className={`relative ${menuBarMenuIsOpen && "h-full bg-black"}`}>
                <div className={`bg-[#fff] h-full  rounded-t-[15px] shadow-xl absolute w-full transition-all duration-300 overflow-scroll z-30 ${menuBarMenuIsOpen ? "-bottom-[0%]" : "-bottom-[100%]"}`}>
                    <hr className="h-[2px] bg-black mt-3 w-[50px] mx-auto" />
                    <div className="pt-[15px] px-3">
                        <div className="flex justify-between">
                            <h1 className="text-[18px] font-bold">{videoData?.title}</h1>
                            <button onClick={() => toggleMenuBarMenu()}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="28px" height="28px"><path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z" /></svg>
                            </button>
                        </div>
                        <hr className="h-[1px] bg-[#9c9c9ca6] mt-5" />
                    </div>
                    <div className={`px-3 mt-[20px] ${readMoreIsOpen && "h-full overflow-scroll"}`}>
                        <ul className="flex justify-evenly mt-[20px]">
                            <li className="flex flex-col items-center">
                                <span className="text-[18px] font-bold">100k</span>
                                <span className="text-[14px] text-[#595959]">Likes</span>
                            </li>
                            <li className="flex flex-col items-center">
                                <span className="text-[18px] font-bold">20,313</span>
                                <span className="text-[14px] text-[#595959]">Views</span>
                            </li>
                            <li className="flex flex-col items-center">
                                <span className="text-[18px] font-bold">2023</span>
                                <span className="text-[14px] text-[#595959]">19 may</span>
                            </li>
                        </ul>

                        <ul className="flex gap-x-4 gap-y-2 flex-wrap mt-[15px]">
                            <li className="bg-[#eeeeee] inline-block px-3 py-[2px] rounded-[30px]">
                                <span className="text-[14px] text-[#595959] font-medium ">#tom and jerry</span>
                            </li>
                            <li className="bg-[#eeeeee] inline-block px-3 py-[2px] rounded-[30px]">
                                <span className="text-[14px] text-[#595959] font-medium ">#cartoon</span>
                            </li>
                            <li className="bg-[#eeeeee] inline-block px-3 py-[2px] rounded-[30px]">
                                <span className="text-[14px] text-[#595959] font-medium ">#for kids</span>
                            </li>
                            <li className="bg-[#eeeeee] inline-block px-3 py-[2px] rounded-[30px]">
                                <span className="text-[14px] text-[#595959] font-medium ">#for kids</span>
                            </li>
                            <li className="bg-[#eeeeee] inline-block px-3 py-[2px] rounded-[30px]">
                                <span className="text-[14px] text-[#595959] font-medium ">#for kids</span>
                            </li>
                            <li className="bg-[#eeeeee] inline-block px-3 py-[2px] rounded-[30px]">
                                <span className="text-[14px] text-[#595959] font-medium ">#for kids</span>
                            </li>

                        </ul>

                        <div className="bg-[#eeeeee] mt-[15px] p-3 font-medium rounded-[10px]">
                            <p>{readMoreIsOpen ? forTestText : forTestText.slice(0, 300)} ...</p>
                            <button onClick={() => setreadMoreIsOpen(!readMoreIsOpen)} className="text-[14px] text-[#595959] font-medium mt-[10px]">{readMoreIsOpen ? "Collapse" : "Read more"}</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* overlay */}
            {menuBarMenuIsOpen && <div className="w-full h-full bg-black top-0 left-0 opacity-20 absolute z-10" onClick={() => setMenuBarMenuIsOpen(false)}></div>}
        </>
    );
}