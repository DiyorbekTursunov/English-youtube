import Loader from "@/components/loader/loader";

export default function Admin({loading} : {loading: boolean}) {
    return (
        <div>
            {
                loading ? (
                    <Loader />
                ) : (
                    <div className="w-full h-full bg-[#F0EEED]">
                        
                    </div>
                )
            }
        </div>
    )
}
