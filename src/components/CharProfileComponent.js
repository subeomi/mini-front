import { transServerId } from "../common/globalFunction";
import CharTitlecomponent from "./CharTitleComponent";

const CharProfileComponent = ({ data, serverId, custom, setCustom, title }) => {
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
                <div className="absolute bottom-3 left-[220px] bg-[rgb(40,50,57)] p-1 rounded-3xl text-gray-600">
                    <button
                        onClick={() => setCustom('equip')}
                        className={`inline-flex items-center py-2 px-3 rounded-3xl
                    ${custom ? '' : 'bg-[rgb(35,41,50)] text-white'}
                    `}
                    >
                        장비정보
                    </button>

                    <button
                        onClick={() => setCustom('skilltree')}
                        className={`inline-flex items-center py-2 px-3 rounded-3xl
                    ${custom ? 'bg-[rgb(35,41,50)] text-white' : ''}
                    `}
                    >
                        스킬트리
                    </button>

                    <button
                        onClick={() => setCustom('custom')}
                        className={`inline-flex items-center py-2 px-3 rounded-3xl
                    ${custom ? 'bg-[rgb(35,41,50)] text-white' : ''}
                    `}
                    >
                        스킬상세
                    </button>

                </div>
            </div>
            <CharTitlecomponent title={title} />
        </div>
    );
}

export default CharProfileComponent;