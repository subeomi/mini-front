import { Link } from "react-router-dom";


const BaseNav = () => {
    return (
        <div
            className="fixed z-50 w-full h-[60px] flex items-center justify-center 
            bg-black opacity-80"
        >
            <Link to="/" className="text-white font-extrabold flex items-center">
                <span className="text-[24px]">
                    DFCHECK
                </span>
                <span className="text-[12px] ml-2">
                    TEST
                </span>
            </Link>
        </div>
    );
}

export default BaseNav;