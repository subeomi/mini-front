import { transServerId } from "../common/globalFunction";
import CharTitlecomponent from "./CharTitleComponent";

const CharProfileComponent = ({ data, serverId, title }) => {
    return (
        <div className="flex justify-between">
            <div className="flex relative text-white mb-10 mt-2 p-2 w-[45%]">

                <img className="border-2 rounded-lg border-[rgb(23,27,36)]"
                    src={`https://img-api.neople.co.kr/df/servers/${serverId}/characters/${data.characterId}?zoom=1`} />

                <div className="ml-2 flex flex-col">
                    <span className="font-bold text-[18px] mb-2">{data.characterName}</span>
                    <span className="text-[14px]">{data.jobGrowName}</span>
                    <span>{transServerId(serverId)}</span>
                    <span className="flex items-center">
                        <span>{data.adventureName}</span>
                        {
                            data.guildName &&
                            <>
                                <i id="v-s"></i>
                                <span>{data.guildName}</span>
                            </>
                        }

                    </span>
                </div>
            </div>
            <CharTitlecomponent title={title} />
        </div>
    );
}

export default CharProfileComponent;