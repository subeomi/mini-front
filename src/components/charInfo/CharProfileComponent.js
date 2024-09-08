import { transServerId } from "../../common/globalFunction";
import CharTitlecomponent from "./CharTitleComponent";

const CharProfileComponent = ({ info, serverId }) => {

    const data = info.data;
    // const price = {
    //     avatar: info.avatar.sumPrice,
    //     creature: info.creature.sumPrice,
    //     switching: info.switching.sumPrice,
    //     enchant: info.equipment.sumEnchantPrice,
    //     equip: info.equipment.sumPrice
    // }

    return (
        <div className="flex justify-center p-2 pt-4 text-white md:w-[45%]">
            <img className="border-2 rounded-lg border-[rgb(23,27,36)] max-w-[204px] max-h-[234px]"
                src={`https://img-api.neople.co.kr/df/servers/${serverId}/characters/${data.characterId}?zoom=1`} />

            <div className="ml-2 flex flex-col p-2">
                <span className="font-bold text-[18px] mb-2">{data.characterName}</span>
                <span className="text-[14px]">{data.jobGrowName}</span>
                <span>{transServerId(serverId)}</span>
                <span className="flex items-center">
                    <span className="text-[#3e965b]">
                        {data.adventureName || ''}
                    </span>
                    {data.adventureName && (<div className="v-s"></div>)}
                    <span>
                        {data.guildName || '-'}
                    </span>
                </span>
            </div>
        </div>
    );
}

export default CharProfileComponent;