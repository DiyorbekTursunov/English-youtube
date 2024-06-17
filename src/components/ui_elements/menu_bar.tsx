import { useState } from "react"
import menu_icon_1 from "../images/bottom_menu_bar/menu_1.svg"
import menu_icon_2 from "../images/bottom_menu_bar/menu_2.svg"
import menu_icon_3 from "../images/bottom_menu_bar/menu_3.svg"
import menu_icon_4 from "../images/bottom_menu_bar/menu_4.svg"

interface menuIsActiveType {
    activeId: string;
}

interface menuBarDataType {
    id: string;
    icon: string;
}

export default function MenuBar() {
    const [menuIsActive, setmenuIsActive] = useState<menuIsActiveType>({ activeId: "1" })

    const [menuBarData] = useState<menuBarDataType[]>([
        {
            id: '1',
            icon: menu_icon_1
        },
        {
            id: '2',
            icon: menu_icon_2
        },
        {
            id: '3',
            icon: menu_icon_3
        },
        {
            id: '4',
            icon: menu_icon_4
        },
    ])



    return (
        <div className="bg-[#fff] w-full absolute bottom-0">
            <div className="max-w-[500px] mx-auto px-3 py-[23px]">
                <div className="flex justify-between ">
                    {menuBarData.map((menu) => (
                        <div className={`${menuIsActive.activeId === menu.id && "w-[82px] h-[82px] bg-[#00425A] flex justify-center items-center rounded-[50%] absolute"}`}>
                            <button key={menu.id} onClick={() => setmenuIsActive({ activeId: menu.id })}>
                                <img src={menu.icon} alt="" className="" />
                            </button>
                        </div>
                    ))}
                </div>
                
            </div>
        </div>
    )
}