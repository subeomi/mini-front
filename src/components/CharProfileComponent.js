import { transServerId } from "../common/globalFunction";
import CharTitlecomponent from "./CharTitleComponent";

const CharProfileComponent = ({ info, serverId }) => {

    const data = info.data;
    const price = {
        avatar: info.avatar.sumPrice,
        creature: info.creature.sumPrice,
        switching: info.switching.sumPrice,
        enchant: info.equipment.sumEnchantPrice,
        equip: info.equipment.sumPrice
    }

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
            <CharTitlecomponent price={price} />
        </div>
    );
}

export default CharProfileComponent;