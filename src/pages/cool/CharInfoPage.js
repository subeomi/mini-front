import { useState } from "react";
import CharInfoComponent from "../../components/cool/CharInfoComponent";
import BaseNav from "../../layouts/BaseNav";

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