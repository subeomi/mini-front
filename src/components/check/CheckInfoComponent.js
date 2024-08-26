import { useEffect, useRef, useState } from "react";
import { avatarSlot, checkInfo, checkNameList, switchingSlot, transFameRank } from "../../common/check/checkFunction";
import { findBuff, transSwitchingEquip } from "../../common/check/switchingFunction";
import { transAvatarSlotName } from "../../common/globalFunction";
import { checkEmblems } from "../../common/check/avatarFunction";
import EquipCheck from "./CheckEquipComponent";
import Accordion from "../../common/item/Accordion";

const CheckInfoComponent = ({ avatar, creature, equipment, switching, jobGrowName, jobName }) => {

    const [accordion, setAccordion] = useState([])
    const contentRefs = useRef([]);

    useEffect(() => {
        accordion.forEach((index) => {
            if (contentRefs.current[index]) {
                contentRefs.current[index].style.maxHeight = '0px';
            }
        });
        const closedIndexes = checkNameList.map((_, i) => i).filter(i => !accordion.includes(i));
        closedIndexes.forEach((index) => {
            if (contentRefs.current[index]) {
                contentRefs.current[index].style.maxHeight = `${contentRefs.current[index].scrollHeight}px`;

            }
        });
    }, [accordion]);

    const handleAccordionIndex = (i) => {
        const checkIndex = accordion.includes(i)

        if (checkIndex) {
            setAccordion(accordion.filter((index) => index !== i))
        } else {
            setAccordion([...accordion, i])
        }
    }

    const combinedArray = [
        ...(switching.equip || []),
        ...(switching.avatar || []),
        ...(switching.creature || [])
    ];

    console.log('check avatar: ', avatar)
    console.log('check creature: ', creature)
    console.log('check equipment: ', equipment)
    console.log('check switching: ', combinedArray)

    const checkObj = {
        equip: equipment,
        creature: creature,
        switching: combinedArray,
        avatar: avatar
    }

    const transChk = (chk) => {
        switch (chk) {
            case "equip": return "장비";
            case "switching": return "버프강화";
            case "avatar": return "아바타";
            case "creature": return "크리쳐";
        }
    }

    return (
        <div className="text-white flex justify-center">
            <div className="md:w-[90%] w-[60%] p-2">
                <div className="pb-2 font-bold flex justify-between">
                    <span>
                        진단
                    </span>
                </div>
                <div>
                    {/* ['equip', 'switching', 'avatar', 'creature'] */}
                    {checkNameList.map((chk, index) => {
                        return (
                            <Accordion
                                key={index + 'chk'}
                                isInitOpen={true}
                                headerContent={
                                    <div className={`min-h-[50px] p-2 cursor-pointer bg-[rgb(40,50,57)] flex items-center`}>
                                        <span className="text-[18px] font-bold">
                                            {transChk(chk)}
                                        </span>
                                    </div>
                                }>
                                {checkInfo(chk, checkObj, findBuff(jobGrowName, jobName), jobName)}
                            </Accordion>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default CheckInfoComponent;