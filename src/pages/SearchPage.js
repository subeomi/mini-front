import ListComponent from "../components/ListComponent";
import BaseNav from "../layouts/BaseNav";


const SearchPage = () => {
    return (
        <div className="bg-[rgb(23,27,36)]">
            <BaseNav></BaseNav>
            <div className="flex justify-center pt-[60px]">
                <div className="w-[1000px]">
                    <ListComponent />
                </div>
            </div>
        </div>
    );
}

export default SearchPage;