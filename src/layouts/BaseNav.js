import { Link } from "react-router-dom";


const BaseNav = () => {
    return (
        <div className="h-[60px]">
            <div className="h-[60px] fixed z-[51] w-screen flex items-center justify-center bg-black opacity-85"

            >
                <Link to="/" className="text-white font-extrabold">
                    <span>
                        DFCOOL
                    </span>
                    <span className="text-white text-[12px] ml-2">BETA</span>
                </Link>
            </div>
        </div>
    );
}

export default BaseNav;