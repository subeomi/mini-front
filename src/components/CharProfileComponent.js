import { transServerId } from "../common/globalFunction";

const CharProfileComponent = ({ data, serverId, custom, setCustom }) => {
    return (
        <>
            <div className="flex relative p-2">
                <img className="border-2 rounded-lg border-slate-700"
                    src={`https://img-api.neople.co.kr/df/servers/${serverId}/characters/${data.characterId}?zoom=1`} />
                <span className="ml-2">
                    <span className="font-bold text-[18px]">{data.characterName}</span>
                    <p className="text-[14px]">{data.jobGrowName}</p>
                    <span>{transServerId(serverId)}</span>
                    <span className="flex items-center">
                        <span>{data.adventureName}</span>
                        <i id="v-s"></i>
                        <span>{data.guildName}</span>
                    </span>
                </span>
                <div className="absolute bottom-0 left-[220px] bg-gray-200 p-1 rounded-3xl text-gray-600">
                    <button
                        onClick={() => setCustom(false)}
                        className={`inline-flex items-center py-2 px-3 rounded-3xl
                    ${custom ? '' : 'bg-white text-blue-500'}
                    `}
                    >
                        장비정보
                    </button>

                    <button
                        onClick={() => setCustom(true)}
                        className={`inline-flex items-center py-2 px-3 rounded-3xl
                    ${custom ? 'bg-white text-blue-500' : ''}
                    `}
                    >
                        스킬상세
                    </button>

                </div>
            </div>
        </>
    );
}

export default CharProfileComponent;