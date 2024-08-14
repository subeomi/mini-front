import CharInfoComponent from "../components/CharInfoComponent";
import BaseNav from "../layouts/BaseNav";

const CharInfoPage = () => {

    return (
        <div className="bg-[rgb(23,27,36)]">
            <BaseNav></BaseNav>
            <div className="flex justify-center pt-[60px]">
                <div className="w-[1000px]">
                    <CharInfoComponent></CharInfoComponent>
                </div>
            </div>
        </div>
    );
}

export default CharInfoPage;