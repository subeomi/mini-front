import { useEffect, useState } from "react";
import { getTargetIncrease, handleAddElement, handleMoreCustom, handleTargetCoolTime, handleTargetList } from "../../common/skill/skillCustomFunction";
import { groupBy } from "lodash";
import Tooltip from "../../common/item/ToolTip";
import { lv105ItemId } from "../../common/itemInfo";
import { skillCastingTime } from "../../common/skillInfo";
import SkillModalComponent from "./SkillModalComponent";

const SkillCustomComponent = ({ skills }) => {

    const [skillObj, setSkillObj] = useState({});
    const [target, setTarget] = useState({});
    const [setting, setSetting] = useState(false);
    const [cList, setCList] = useState({});
    const [modalInfo, setModalInfo] = useState({ lvl: 0, type: "" });
    const [moreListModal, setMoreListModal] = useState(false);

    const handleTargetList = (skills) => {
        const result = {};

        for (const skill in skills) {
            const cal = skills[skill].cal;

            if (cal) {
                result[skill] = {
                    inc: [],
                    rec: [],
                    red: []
                };
            }
        }

        return result;
    }

    const isEmptyObject = (obj) => {
        return Object.keys(obj).length !== 0;
    };

    const closeModal = () => {
        setMoreListModal(false);
    };

    const listModal = (lvl, type) => {
        setModalInfo({ lvl: lvl, type: type });
        setMoreListModal(true);
    }

    // 모달 true = 스크롤 잠금, false = 스크롤 유지
    if (moreListModal) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }

    // 체크된 요소의 인덱스번호 추가 제거
    const handleCListOption = (target, type, list) => {
        if (setting) {
            setCList(prevCList => {
                const updatedCList = { ...prevCList };
                if (updatedCList[target][type].includes(list)) {
                    // 이미 리스트에 있는 경우 해당 요소를 제거합니다.
                    updatedCList[target][type] = updatedCList[target][type].filter((item) => item !== list);
                } else {
                    // 리스트에 없는 경우 해당 요소를 추가합니다.
                    updatedCList[target][type] = [...updatedCList[target][type], list];
                }
                return updatedCList;
            });
        }
    };

    const addElement = (name, list, type) => {
        const newObj = handleAddElement(name, list, skillObj, type);
        setSkillObj(newObj);
        setTarget({ [Object.keys(target)[0]]: newObj[Object.keys(target)[0]] });
    };

    useEffect(() => {
        setSkillObj(JSON.parse(JSON.stringify(skills)));
        const handleCList = handleTargetList(skills);
        setCList(handleCList);
    }, [skills])

    console.log('skillObj ', skillObj)
    // console.log('cList: ', cList)
    console.log('target: ', target)
    // console.log('skills: ', skills)

    const nextCT = () => {
        const sk = target?.[Object.keys(target)[0]]
        const skName = Object.keys(target)[0]
        console.log(((40 / (sk.count + 1)) - 0.01), (sk.defaultCoolTime + (skillCastingTime[skName] || 0) * (sk.count + 1)))
        return ' ' + ((1 - ((40 / sk.count - 0.01) / (sk.defaultCoolTime + (skillCastingTime[skName] || 0) * (sk.count + 1)))) * 100).toFixed(2)
    }


    return (
        <div className="flex relative h-screen">
            {moreListModal &&
                <SkillModalComponent target={target} lvl={modalInfo.lvl} type={modalInfo.type} closeModal={closeModal} addElement={addElement} />}
            <div className="w-[45%] p-2 mb-10">
                {
                    isEmptyObject(target) && (
                        <div className="text-white">
                            <span className="text-[22px] font-bold">
                                <span>
                                    {Object.keys(target)[0]}
                                </span>
                                <span className={`pl-1 text-[16px] ${parseFloat(((1 - new Function('return ' + target?.[Object.keys(target)[0]]?.cal?.calMath)()) * 100).toFixed(1)) > 70 && 'text-red-600'}`}>
                                    {parseFloat(((1 - new Function('return ' + target?.[Object.keys(target)[0]]?.cal?.calMath)()) * 100).toFixed(1))}%
                                </span>
                                <span className="text-[16px]">
                                    {' 감소됨'}
                                </span>
                            </span>
                            <div className="font-bold">
                                횟수
                                <span className={`${target?.[Object.keys(target)[0]]?.count === skills?.[Object.keys(target)[0]]?.maxCnt && 'text-[rgb(224,67,67)]'}`}>
                                    {target?.[Object.keys(target)[0]]?.count}
                                </span>
                                /
                                <span className="text-[rgb(224,67,67)]">
                                    {skills?.[Object.keys(target)[0]]?.maxCnt}
                                </span>
                                회
                                {skills?.[Object.keys(target)[0]]?.maxCnt > target?.[Object.keys(target)[0]]?.count &&
                                    <span className="ml-2">다음 횟수
                                        {
                                            // ' ' + (((target?.[Object.keys(target)[0]]?.castingCoolTime - (40 / (target?.[Object.keys(target)[0]]?.count + Number.EPSILON))) / target?.[Object.keys(target)[0]]?.castingCoolTime * 100).toFixed(1) - parseFloat(((1 - new Function('return ' + target?.[Object.keys(target)[0]]?.cal?.calMath)()) * 100).toFixed(1))).toFixed(2)
                                            nextCT()
                                        }
                                        %
                                    </span>
                                }
                            </div>
                            <div className="mt-2">
                                <>
                                    <div className="text-[18px] h-[39px] flex items-center">
                                        <span className="font-bold text-[rgb(224,67,67)]">쿨타임 증가</span>
                                        <span className="pl-1 font-bold">{getTargetIncrease(target, 'inc')}</span>
                                        {setting &&
                                            <span className="pl-1 text-[24px] font-bold cursor-pointer"
                                                onClick={() => { listModal(target.requiredLevel, 'inc') }}
                                            >+</span>}
                                    </div>
                                    {target[Object.keys(target)[0]].cal.increase.map((item, index) => (
                                        <div key={index} className="pl-2">
                                            {item[3] * 100 > 0 && (
                                                <>
                                                    <span
                                                        className={`flex items-center ${cList[Object.keys(target)[0]]?.inc?.includes(item)
                                                            ? 'text-gray-500 line-through' : ''}`}
                                                        onClick={() => { handleCListOption(Object.keys(target)[0], 'inc', item) }}
                                                    >
                                                        {setting &&
                                                            // JSON.stringify(skills[Object.keys(target)[0]].cal.increase).includes(JSON.stringify(item)) &&
                                                            <input
                                                                className="mr-2 ml-1"
                                                                type="checkbox"
                                                                checked={cList[Object.keys(target)[0]]?.inc?.includes(item)}
                                                                onChange={() => { }}
                                                            />}
                                                        <span className="ml-1">
                                                            {item[1]} - {(item[3] * 100)}%
                                                        </span>
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    ))}
                                </>
                            </div>
                            <div>
                                <>
                                    <div className="text-[18px] h-[39px] flex items-center">
                                        <span className="font-bold text-[rgb(147,184,95)]">쿨타임 회복 속도 증가</span>
                                        <span className="pl-1 font-bold">{getTargetIncrease(target, 'rec')}</span>
                                        {setting &&
                                            <span className="pl-1 text-[26px] font-bold cursor-pointer"
                                                onClick={() => { listModal(target.requiredLevel, 'rec') }}
                                            >+</span>}
                                    </div>
                                    {target[Object.keys(target)[0]].cal.recovery.map((item, index) => (
                                        <div key={index} className="pl-2">
                                            {item[3] * 100 > 0 && (
                                                <>
                                                    <span
                                                        className={`flex items-center ${cList[Object.keys(target)[0]]?.rec?.includes(item)
                                                            ? 'text-gray-500 line-through' : ''}`}
                                                        onClick={() => { handleCListOption(Object.keys(target)[0], 'rec', item) }}
                                                    >
                                                        {setting &&
                                                            // JSON.stringify(skills[Object.keys(target)[0]].cal.recovery).includes(JSON.stringify(item)) &&
                                                            <input
                                                                className="mr-2 ml-1"
                                                                type="checkbox"
                                                                checked={cList[Object.keys(target)[0]]?.rec?.includes(item)}
                                                                onChange={() => { }}
                                                            />}
                                                        <span className="ml-1">
                                                            {item[1]} - {(item[3] * 100)}%
                                                        </span>
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    ))}
                                    { }
                                </>
                            </div>
                            <div>
                                <>
                                    <div className="text-[18px] h-[39px] flex items-center">
                                        <span className="font-bold text-[rgb(90,189,216)]">쿨타임 감소</span>
                                        <span className="pl-1 font-bold">{getTargetIncrease(target, 'red')}</span>
                                        {setting &&
                                            <span className="pl-1 text-[26px] font-bold cursor-pointer"
                                                onClick={() => { listModal(target.requiredLevel, 'red') }}
                                            >+</span>}
                                    </div>
                                    {target[Object.keys(target)[0]].cal.reduce.map((item, index) => (
                                        <div key={index} className="pl-2">
                                            {item[3] * 100 > 0 && (
                                                <>
                                                    <span
                                                        className={`flex items-center ${cList[Object.keys(target)[0]]?.red?.includes(item)
                                                            ? 'text-gray-500 line-through' : ''}`}
                                                        onClick={() => { handleCListOption(Object.keys(target)[0], 'red', item) }}
                                                    >
                                                        {setting &&
                                                            // JSON.stringify(skills[Object.keys(target)[0]].cal.reduce).includes(JSON.stringify(item)) &&
                                                            <input
                                                                className="mr-2 ml-1"
                                                                type="checkbox"
                                                                checked={cList[Object.keys(target)[0]]?.red?.includes(item)}
                                                                onChange={() => { }}
                                                            />}
                                                        <span className="ml-1">
                                                            {item[1]} - {(item[3] * 100)}%
                                                        </span>
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    ))}
                                </>
                            </div>
                            <div className="flex justify-between w-full">
                                <div></div>
                                <div>
                                    {skillObj[Object.keys(target)[0]]?.cal.calMath !== skills[Object.keys(target)[0]]?.cal.calMath
                                        && <button
                                            className="border-4 border-black"
                                            onClick={() => {
                                                // 동기적으로 수행
                                                const newSkillObj = {
                                                    ...skillObj,
                                                    [Object.keys(target)[0]]: JSON.parse(JSON.stringify(skills[Object.keys(target)[0]]))
                                                };
                                                setSkillObj(newSkillObj);
                                                setTarget({ [Object.keys(target)[0]]: newSkillObj[Object.keys(target)[0]] });
                                                const updatedCList = {
                                                    ...cList,
                                                    [Object.keys(target)[0]]: {
                                                        inc: [],
                                                        rec: [],
                                                        red: []
                                                    }
                                                };
                                                setCList(updatedCList);
                                            }}>
                                            초기화</button>}
                                    {!setting
                                        ? <button className="border-4 border-black" onClick={() => setSetting(!setting)}>설정버튼</button>
                                        : <button className="border-4 border-black"
                                            onClick={() => {
                                                setSetting(!setting)
                                                const newObj = handleTargetCoolTime(Object.keys(target)[0], cList, skillObj, skills)
                                                setSkillObj(newObj);
                                                setTarget({ [Object.keys(target)[0]]: newObj[Object.keys(target)[0]] });
                                            }}>완료버튼</button>}
                                </div>
                            </div>
                        </div>
                    )
                }

            </div>
            <div className="w-[45%] right-0 absolute text-white p-2">
                <span className="pb-2 font-bold">스킬 정보</span>
                <Tooltip text="횟수: 40초 동안 해당 스킬만 사용했을 때">
                    <button className='w-5 h-5 bg-[rgb(40,50,57)] rounded-full flex items-center justify-center mx-1' type="button">
                        <span className="text-white text-sm">?</span>
                    </button>
                </Tooltip>
                <div className="my-2">
                    {skillObj && Object.keys(skillObj).reverse().map((skillName, index) => {
                        if (skillName === 'math') return;
                        const skill = skillObj[skillName];
                        return (
                            <div
                                className={`cursor-pointer hover:bg-[rgb(23,27,36)] mb-1 py-1 px-3 border-2
                                ${index % 2 === 0 ? 'bg-[rgb(40,50,57)] border-[rgb(40,50,57)]' : 'bg-[rgb(35,41,50)] border-[rgb(35,41,50)]'}
                                ${Object.keys(target).includes(skillName) && 'bg-[#171b24] font-bold'}
                                `}
                                onClick={() => {
                                    setSetting(false);
                                    const newTarget = JSON.parse(JSON.stringify({ [skillName]: { ...skill } }));
                                    setTarget(newTarget);
                                }}
                                key={skill.skillId}
                            >
                                <div className="flex justify-between">
                                    <span
                                    // className={`${new Function('return ' + skill.cal.calMath)() <= 0.3 && 'border-b-4 border-[rgb(224,67,67)]'}`}
                                    >
                                        <span>{skillName}</span>
                                        <span className={`ml-[5px] ${skill.count === skill.maxCnt && 'text-[rgb(224,67,67)] font-bold'}`}>{skill.count}</span>회
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
        </div >
    );
}

export default SkillCustomComponent;