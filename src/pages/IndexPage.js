
import BaseNav from "../layouts/BaseNav";
import ListComponent from "../components/ListComponent";



const IndexPage = () => {

    return (
        <div className="bg-black">
            <BaseNav></BaseNav>
            <div className="flex justify-center h-screen">
                <div className="w-[1000px]">
                    <ListComponent />
                </div>
            </div>
        </div>
    );
}

export default IndexPage;