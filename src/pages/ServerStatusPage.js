import { useLocation } from "react-router-dom";
import InspectComponent from "../components/InspectComponent";
import BaseNav from "../layouts/BaseNav";

const ServerStatusPage = () => {

    const loc = useLocation();
    const msg = loc.state.message;

    console.log(loc)

    return (
        <div className="bg-[rgb(23,27,36)]">
            <BaseNav></BaseNav>
            <div className="flex justify-center items-center font-bold pt-[60px]">
                {msg === 'DNF_SYSTEM_INSPECT' && (
                    <InspectComponent></InspectComponent>
                )}
            </div>
        </div>
    );
}

export default ServerStatusPage;