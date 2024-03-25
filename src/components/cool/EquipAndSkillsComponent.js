import Tooltip from "../../common/item/ToolTip";

const EquipAndSkilsComponent = ({ skills, equipment }) => {
    return (
        <div>
            <div className="flex relative text-white">
                <div className="w-[45%] p-2">
                    <p className="pb-2 font-bold">장착 장비</p>
                    {equipment.length > 0 && equipment.map((equip, index) => (
                        <div key={equip.itemId}
                            className={`flex items-center h-min-[50px] mb-1 pt-1 bg-[rgb(35,41,50)] ${index % 2 === 0 && 'bg-[rgb(40,50,57)]'}`}
                        >
                            <p className="w-[64px] items-center justify-center flex mx-1">{equip.slotName}</p>
                            <span>
                                <span className="flex">
                                    <img src={`https://img-api.neople.co.kr/df/items/${equip.itemId}`} />
                                    {equip.upgradeInfo && (
                                        <img src={`https://img-api.neople.co.kr/df/items/${equip.upgradeInfo.itemId}`} />
                                    )}
                                    {!equip.upgradeInfo && (
                                        <span className="w-[28px] h-[21px]"></span>
                                    )}
                                </span>
                                <span className="flex items-center justify-center">
                                    <p className={`text-[14px] flex justify-center w-[28px] h-[21px] ${equip.amplificationName !== null ? 'text-[#FF00FF]' : ''}`}>+{equip.reinforce}</p>
                                    {equip.fixedOption && (
                                        <span className="text-[#df9f3f] text-[14px] justify-center flex w-[28px] h-[21px]">Lv{equip.fixedOption.level}</span>
                                    )}
                                    {equip.customOption && (
                                        <span className="text-[#df9f3f] text-[14px] justify-center flex w-[28px] h-[21px]">Lv{equip.customOption.level}</span>
                                    )}
                                    {!(equip.fixedOption || equip.customOption) && (
                                        <span className="w-[28px] h-[21px]"></span>
                                    )}
                                </span>
                            </span>
                            <span className="px-2">
                                <p>{equip.itemName}</p>
                                {equip.upgradeInfo && (
                                    <span className="text-[#df9f3f]">{equip.upgradeInfo.itemName}</span>
                                )}
                            </span>
                            {/* <span>
                        {equip.enchant && equip.enchant.explain !== null && (
                            <span className="text-[12px] text-[#50a330]">{equip.enchant.explain}</span>
                        )}
                        {equip.enchant && equip.enchant.status.length > 0 && transformStatusArray(equip.enchant.status).map(enc => (

                            <span key={enc.name} className="text-[12px] text-[#50a330]">{enc.name} +{enc.value}</span>
                        ))}
                    </span> */}
                        </div>
                    ))}
                </div>
                <div className="w-[45%] p-2 right-0 absolute text-white h-full">
                    <div>

                    </div>
                    <div className="flex items-center">
                        <span className="font-bold">스킬 정보</span>
                        <Tooltip text="횟수: 40초 동안 해당 스킬만 사용했을 때">
                            <button className='w-5 h-5 bg-[rgb(40,50,57)] rounded-full flex items-center justify-center mx-1' type="button">
                                <span className="text-white text-sm">?</span>
                            </button>
                        </Tooltip>
                    </div>
                    <div className="mt-2">
                        {skills && Object.keys(skills).reverse().map((skillName, index) => {
                            if (skillName === 'math') return;
                            const skill = skills[skillName];
                            return (
                                <div key={skill.skillId} className={`bg-[rgb(35,41,50)] border-[rgb(35,41,50)] border-2 mb-1 py-1 px-3`}>
                                    <div className="flex justify-between">
                                        <span
                                        // className={`${new Function('return ' + skill.cal.calMath)() <= 0.3 && 'border-b-4 border-[rgb(224,67,67)]'}`}
                                        >
                                            <span>{skillName}</span>
                                            <span className={`ml-[5px] ${skill.count === skill.maxCnt && 'text-[rgb(224,67,67)] font-bold'}`}>{skill.count}</span>회
                                            {/* <span className="ml-[5px]">Lv{skill.skillLevel}</span> */}

                                        </span>
                                        <span>
                                            {<span className="ml-[5px]">{skill.skillCoolTime}초</span>}
                                        </span>
                                    </div>
                                    {/* {
                                        new Function('return ' + skill.cal.calMath)() <= 0.3 &&
                                        <div>
                                            <span className="text-12 text-red-600 pl-2">
                                                ! 쿨감 70% 이상
                                            </span>
                                        </div>
                                    } */}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EquipAndSkilsComponent;