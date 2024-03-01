import { useLocation } from "react-router-dom";
import InspectComponent from "../components/InspectComponent";
import BaseNav from "../layouts/BaseNav";

const ServerStatusPage = () => {

    const loc = useLocation();
    const msg = loc.state.message;

    console.log(loc)

    return (
        <>
            <BaseNav></BaseNav>
            <div className="flex justify-center items-center font-bold">
                {msg === 'DNF_SYSTEM_INSPECT' && (
                    <InspectComponent></InspectComponent>
                )}
            </div>
        </>
    );
}

export default ServerStatusPage;