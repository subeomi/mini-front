import { useState } from "react";
import CharInfoComponent from "../../components/cool/CharInfoComponent";
import BaseNav from "../../layouts/BaseNav";

const CharInfoPage = () => {

    return (
        <div className="bg-black h-auto">
            <BaseNav></BaseNav>
            <div className="flex justify-center">
                <div className="w-[1000px]">
                    <CharInfoComponent></CharInfoComponent>
                </div>
            </div>
        </div>
    );
}

export default CharInfoPage;