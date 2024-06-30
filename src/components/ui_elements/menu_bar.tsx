import { useEffect, useState } from "react"
import menu_icon_1 from "../images/bottom_menu_bar/menu_1.svg"
import menu_icon_2 from "../images/bottom_menu_bar/menu_2.svg"
import menu_icon_3 from "../images/bottom_menu_bar/menu_3.svg"
import menu_icon_4 from "../images/bottom_menu_bar/menu_4.svg"
import { useNavigate } from "react-router-dom"

interface menuIsActiveType {
    activeId: string;
}

interface menuBarDataType {
    id: string;
    icon: string;
}




export default function MenuBar() {
    const [menuIsActive, setmenuIsActive] = useState<menuIsActiveType>({ activeId: "1" })
    const navigate = useNavigate()


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

    const handleMenuClick = (id: string) => {
        setmenuIsActive({ activeId: id })
    }

    useEffect(() => {
        if (menuIsActive.activeId === "1") {
            navigate("/")
        } else if (menuIsActive.activeId === "2") {
            navigate("/english")
        } else if (menuIsActive.activeId === "3") {
            navigate("/cartoon")
        } else if (menuIsActive.activeId === "4") {
            navigate("/profile")
        }
    }, [menuIsActive.activeId, navigate])


    return (
        <div className="bg-[#ffffff] w-full fixed bottom-0 rounded-b-2xl shadow-lg">
            <div className="max-w-[500px] mx-auto px-3 py-[23px]">
                <div className="flex justify-between ">
                    {menuBarData.map(data => (
                        <img key={data.id} src={data.icon} alt="" className={`opacity-80 ${menuIsActive.activeId === data.id && 'w-[30px] fill-slate-700 opacity-100'}`} onClick={() => handleMenuClick(data.id)} />
                    ))}
                </div>
            </div>
        </div>
    )
}
