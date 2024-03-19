import { Link } from "react-router-dom";


const BaseNav = () => {
    return (
        <div className="h-[60px]">
            <div className="h-[60px] fixed z-[51] w-screen flex items-center justify-center bg-black opacity-80 border-[2px] border-[rgb(35,41,50)]"

            >
                <Link to="/" className="text-white font-extrabold">
                    <span className="text-[24px]">
                        DFCOOL
                    </span>
                    <span className="text-[12px] ml-2">TEST</span>
                </Link>
            </div>
        </div>
    );
}

export default BaseNav;