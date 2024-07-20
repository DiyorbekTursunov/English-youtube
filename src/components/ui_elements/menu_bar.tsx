import { useEffect, useState } from "react"
import menu_icon_1 from "../images/bottom_menu_bar/menu_1.svg"
import menu_icon_2 from "../images/bottom_menu_bar/menu_2.svg"
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
    const [menuIsActive, setmenuIsActive] = useState<menuIsActiveType>({ activeId: "0" })
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
            navigate("/category")
        } else if (menuIsActive.activeId === "4") {
            navigate("/profile")
        }
    }, [menuIsActive.activeId, navigate])


    return (
        <div className="bg-[#ffffff] w-full fixed z-20 bottom-0 rounded-t-2xl shadow-lg">
            <div className="max-w-[500px] mx-auto px-3 py-[23px]">
                <div className="flex justify-evenly gap-10">
                    {menuBarData.map(data => (
                        <img key={data.id} src={data.icon} alt="" className={`opacity-80 ${menuIsActive.activeId === data.id && 'w-[30px] fill-slate-700 opacity-100'}`} onClick={() => handleMenuClick(data.id)} />
                    ))}
                </div>
            </div>
        </div>
    )
}
