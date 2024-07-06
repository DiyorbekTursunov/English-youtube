import ad_img from '../images/ad/ad_img.png'
import luca_logo from '../images/ad/luca_logo.png'

export default function Adversizement() {
    return (
        <div className="bg-[#00425A] max-w-[383px] mx-auto rounded-[25px] relative mt-[90px] pl-3 ad_container mb-[24px]">
            <img src={ad_img} alt="ad img" className='ad_banner absolute right-[24px] bottom-0 w-[194px]' />

            <div className=''>
                <img src={luca_logo} alt="luca logo" className='ad_wrapper_logo w-[124px] h-[88px] pt-3' />
                <button className='hover:opacity-60 active::opacity-40 ad_wrapper_button'>
                    <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23 0C10.304 0 0 10.304 0 23C0 35.696 10.304 46 23 46C35.696 46 46 35.696 46 23C46 10.304 35.696 0 23 0ZM17.25 33.35V12.65L33.35 23L17.25 33.35Z" fill="white" />
                    </svg>
                </button>
            </div>
        </div>
    )
}