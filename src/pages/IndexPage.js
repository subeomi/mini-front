
import BaseNav from "../layouts/BaseNav";
import IndexComponent from "../components/IndexComponent";


const IndexPage = () => {

    return (
        <div className="bg-[rgb(23,27,36)] overflow-auto">
            <BaseNav></BaseNav>
            <div className="flex justify-center h-screen">
                <div className="w-[1000px]">
                    <IndexComponent />
                </div>
            </div>
        </div>
    );
}

export default IndexPage;