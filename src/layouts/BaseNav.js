import { Link } from "react-router-dom";


const BaseNav = () => {
    return (
        <div className="h-[60px] w-screen flex items-center justify-center bg-black opacity-85"
            
        >
            <Link to="/" className="text-white">준비중...</Link>
        </div>
    );
}

export default BaseNav;