import { useState } from "react";
import { avatarSlot, checkInfo, checkNameList, switchingSlot, transFameRank } from "../common/check/checkFunction";
import { transSwitchingEquip } from "../common/check/switchingFunction";
import { transAvatarSlotName } from "../common/globalFunction";
import { checkEmblems } from "../common/check/avatarFunction";

const CheckInfoComponent = ({ avatar, creature, equipment, switching, jobGrowName, jobName }) => {

    const [checkEquip, setCheckEquip] = useState([]);
    const [checkAvatar, setCheckAvatar] = useState([]);

    console.log('check avatar: ', avatar)
    console.log('check creature: ', creature)
    console.log('check equipment: ', equipment)
    console.log('check switching: ', switching)

    const combinedArray = [
        ...(switching.equip || []),
        ...(switching.avatar || []),
        ...(switching.creature || [])
    ];

    const checkObj = {
        equip: equipment,
        creature: creature,
        switching: switching,
        avatar: avatar
    }

    // 찾고자하는 부위의 버프강화 객체
    const getMatchingItem = (slotName) => {
        return combinedArray.find(item => item.slotName === slotName) || null;
    }

    // 아바타 부위정렬, 칭호객체, 오라객체
    const sortedAvatars = avatar.avatar
        .filter((item) => item.slotName !== '오라 스킨 아바타')
        .sort((a, b) => avatarSlot.indexOf(a.slotName.replace(" 아바타", "")) - avatarSlot.indexOf(b.slotName.replace(" 아바타", "")));

    const titleObj = equipment?.equipment
        ?.filter((item) => item.slotName === '칭호')[0]

    const auraObj = avatar.avatar
        ?.filter((item) => item.slotName === '오라 아바타')[0]

    // console.log(titleObj)

    return (
        <div className="text-white flex justify-center">
            <div className="md:w-[90%] w-[60%] p-2">
                <div className="pb-2 font-bold flex justify-between">
                    <span>
                        진단
                    </span>
                </div>
                <div>
                    {checkNameList.map((chk, index) => (
                        <div key={index + 'chk'}>
                            {checkInfo(chk, checkObj)}
                        </div>
                    ))}
                </div>
                <div className="h-[200px] bg-cat2 w-full mb-2 p-2 flex items-center">
                    <div className="">
                        <div className="mb-2">
                            <div>
                                <span className="mr-2">칭호</span>
                                {transFameRank(titleObj?.rank)}
                            </div>
                        </div>
                        <div className="mb-2">
                            <div>
                                <span className="mr-2">오라</span>
                                {transFameRank(auraObj?.rank)}
                            </div>
                        </div>
                        <div className="">
                            <div>
                                <span className="mr-2">크리쳐</span>
                                {transFameRank(creature?.creature?.rank)}
                            </div>
                        </div>
                    </div>

                </div>
                <div className="flex">
                    {equipment?.equipment && (
                        <div>
                            {equipment?.equipment.map((equip, index) => (
                                <div key={"equip" + index} className="bg-cat3 mb-1 p-1 flex items-center max-w-[200px] h-[32px]">
                                    <div className="pl-2 min-w-[80px] text-[13px]">
                                        {equip.slotName}
                                    </div>
                                    <div className="pl-2 min-w-[100px]">
                                        {transFameRank(equip.enchantRank)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {combinedArray && (
                        <div className="ml-1">
                            {switchingSlot.map((slotName, index) => {
                                const matchingItem = getMatchingItem(slotName);
                                return (
                                    <div key={"switching" + index} className="bg-cat3 mb-1 p-1 flex items-center min-w-[240px] max-w-[240px] h-[32px]">
                                        <div className="pl-2 min-w-[80px] text-[13px]">
                                            {slotName}
                                        </div>
                                        <div className="pl-2 min-w-[100px] text-[13px]">
                                            {transSwitchingEquip(matchingItem, jobGrowName, jobName)}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                    {avatar?.avatar && (
                        <div className="ml-1">
                            {sortedAvatars.map((item, index) => {
                                return (
                                    <div key={"switching" + index} className="bg-cat3 mb-1 p-1 flex items-center min-w-[220px] max-w-[220px] h-[42px]">
                                        <div className="pl-2 min-w-[80px] text-[13px]">
                                            {transAvatarSlotName(item.slotName)}
                                        </div>
                                        <div className="pl-2 min-w-[100px] text-[13px]">
                                            {checkEmblems(item?.emblems)}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CheckInfoComponent;