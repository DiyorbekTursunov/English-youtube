import Navbar from "../components/ui_elements/navbar";
import Adversizement from "../components/ui_elements/adversizement";
import Videos from "../components/ui_elements/videos";

export default function Home() {
    return (
        <div className="w-full h-full bg-[#F0EEED]">
            <div className='max-w-[500px] mx-auto px-3'>
                <Navbar />
                <Adversizement />
                <Videos />
            </div>
        </div>
    )
}