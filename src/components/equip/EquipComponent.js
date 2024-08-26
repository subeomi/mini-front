import { useState } from "react";
import { commaGold, transformStatusArray } from "../../common/globalFunction";
import Tooltip from "../../common/item/Tooltip";
import Accordion from "../../common/item/Accordion";

const EquipComponent = ({ skills, equipment }) => {

    const [accordion, setAccordion] = useState([])

    const handleAccordionIndex = (i) => {
        const checkIndex = accordion.includes(i)

        if (checkIndex) {
            setAccordion(accordion.filter((index) => index !== i))
        } else {
            setAccordion([...accordion, i])
        }
    }

    return (
        <div>
            <div className="flex justify-center relative text-white">
                <div className="md:w-[90%] w-[60%] p-2">
                    <div className="pb-2 font-bold flex justify-between">
                        <span>
                            장착 장비
                        </span>
                        {/* <div className="flex flex-col">
                            <span>
                                마법부여 {commaGold(equipment.sumEnchantPrice)}
                            </span>
                            <span>
                                장비 {commaGold(equipment.sumPrice)}
                            </span>
                        </div> */}
                    </div>
                    {equipment.length > 0 && equipment.map((equip, index) => {
                        const hasPrice = equip.enchantPrice || equip.price;
                        return (
                            <Accordion
                                key={index + 'equip'}
                                headerContent={
                                    <div
                                        className="w-full"
                                        style={{
                                            borderRight: equip.enchantPrice || equip.price ? '4px solid rgb(255,180,0)' : ''
                                        }}
                                    >
                                        {/* 장비 */}
                                        <div className="flex items-center min-h-[75px]">
                                            <div className="w-[70%] flex items-center">
                                                <p className="w-[64px] items-center justify-center flex mx-1 text-[13px]">
                                                    {equip.slotName}
                                                </p>
                                                <div className="flex">
                                                    {equip.itemId && (
                                                        <img src={`https://img-api.neople.co.kr/df/items/${equip.itemId}`} />
                                                    )}
                                                    {equip.upgradeInfo && (
                                                        <img src={`https://img-api.neople.co.kr/df/items/${equip.upgradeInfo.itemId}`} />
                                                    )}
                                                    {!equip.upgradeInfo && (
                                                        <span className="w-[28px] h-[21px]"></span>
                                                    )}
                                                </div   >
                                                <div className="flex items-center justify-center">
                                                    <p className={`text-[14px] flex justify-center w-[28px] h-[21px] ${equip.amplificationName !== null ? 'text-[#FF00FF]' : ''}`}>+{equip.reinforce}</p>
                                                    {equip.fixedOption?.level && (
                                                        <span className="text-[#df9f3f] text-[14px] justify-center flex w-[28px] h-[21px]">Lv{equip.fixedOption.level}</span>
                                                    )}
                                                    {equip.customOption?.level && (
                                                        <span className="text-[#df9f3f] text-[14px] justify-center flex w-[28px] h-[21px]">Lv{equip.customOption.level}</span>
                                                    )}
                                                    {!(equip.fixedOption?.level || equip.customOption?.level) && (
                                                        <span className="w-[28px] h-[21px]"></span>
                                                    )}
                                                </div>
                                                <div className={`px-2 text-[14px] grid 
                                                ${equip.upgradeInfo ? 'grid-rows-2' : 'grid-rows-1'}`}
                                                >
                                                    <span className="flex items-center">
                                                        {equip.itemName}
                                                    </span>
                                                    {equip.upgradeInfo && (
                                                        <span className="text-[#df9f3f] flex items-center">{equip.upgradeInfo.itemName}</span>
                                                    )}
                                                </div>
                                            </div>
                                            {/* 마부 */}
                                            <div className="flex justify-start px-1 w-[220px]">
                                                {equip.enchant && (
                                                    <div className="text-[13px] p-1 ml-12 flex items-center">
                                                        <div className="w-[28px]">
                                                            {equip.enchant.itemId && (<img src={`https://img-api.neople.co.kr/df/items/${equip.enchant.itemId}`} />)}
                                                        </div>
                                                        <div className="px-2 w-[125px]">
                                                            {equip.enchant.explain && (
                                                                <span>
                                                                    {equip.enchant.explain}
                                                                </span>
                                                            )}
                                                            {transformStatusArray(equip.enchant.status).map(item =>
                                                                <p key={item}>
                                                                    {item}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                }
                            >
                                <div className="mx-1 pt-1 text-[13px] flex items-center">
                                    {equip.itemTypeDetail.includes('칭호') && equip.price && (
                                        <div className="flex mr-4">
                                            <div className="flex items-center pr-4">
                                                <img src={`https://img-api.neople.co.kr/df/items/${equip.itemId}`} />
                                                <span className="ml-1 max-w-[135px]">
                                                    {equip.itemName}
                                                </span>
                                            </div>
                                            {equip.itemTypeDetail.includes('칭호') && equip.price ?
                                                (<div>
                                                    <p>
                                                        최근 평균 거래가 : {commaGold(equip.price)}
                                                    </p>
                                                    <div>
                                                        <div className="flex">
                                                            최근 거래내역 : {equip.history ? (
                                                                <Tooltip text={equip.history}>
                                                                    <span className="text-blue-400">
                                                                        [거래내역]
                                                                    </span>
                                                                </Tooltip>
                                                            ) : (<span className="text-gray-400">거래 내역 없음</span>)}
                                                        </div>
                                                    </div>
                                                </div>) :
                                                (<span className="text-gray-400">
                                                    거래 내역 없음
                                                </span>)}
                                        </div>
                                    )}
                                    {equip.enchant && equip.enchant.itemId ? (
                                        <div className="flex">
                                            <div className="flex items-center pr-4">
                                                <img src={`https://img-api.neople.co.kr/df/items/${equip.enchant.itemId}`} />
                                                <span className="ml-1 max-w-[190px]">
                                                    {equip.enchant.itemName}
                                                </span>
                                            </div>
                                            {equip.enchantPrice ?
                                                (<div>
                                                    <p>
                                                        최근 평균 거래가 : {commaGold(equip.enchantPrice)}
                                                    </p>
                                                    <div>
                                                        최근 거래내역 : {equip.enchantHistory && equip.enchantHistory.map((hstr, index) => (
                                                            <p key={index} className="text-gray-400">
                                                                {hstr.soldDate} {commaGold(hstr.unitPrice)}
                                                            </p>
                                                        ))}
                                                    </div>
                                                </div>) : (<span className="text-gray-400">거래 내역 없음</span>)}
                                        </div>
                                    ) : (<span className="text-gray-400">거래 내역 없음</span>)}
                                </div>
                            </Accordion>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default EquipComponent;