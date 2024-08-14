import { useState } from "react";
import { commaGold, transformStatusArray } from "../../common/globalFunction";

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
                    <div>
                        {equipment.equipment.length > 0 && equipment.equipment.map((equip, index) => (
                            <div key={index} className="mb-1">
                                <div
                                    className={`flex items-center py-1 hover:bg-[rgb(35,41,50)] cursor-pointer
                                    ${accordion.includes(index) ? 'bg-[rgb(35,41,50)]' : 'bg-[rgb(40,50,57)]'}
                                    `}
                                    onClick={() => handleAccordionIndex(index)}
                                    style={{
                                        borderRight: equip.enchantPrice || equip.price ? '4px solid rgb(255,180,0)' : ''
                                    }}
                                >
                                    <div className="flex w-[70%] h-[75px] items-center">
                                        <p className="w-[64px] items-center justify-center flex mx-1 text-[13px]">
                                            {equip.slotName}
                                        </p>
                                        <div className="">
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
                                    <div className="px-1">
                                        {equip.enchant && equip.enchant.itemId && (
                                            <div className="text-[13px] p-1 ml-12 flex items-center">
                                                <div>
                                                    <div className="flex items-center">
                                                        <span>
                                                            <span className="flex">
                                                                <img src={`https://img-api.neople.co.kr/df/items/${equip.enchant.itemId}`} />
                                                            </span>
                                                        </span>
                                                        <span className="px-2">
                                                            {/* <p>{equip.enchant.itemName}</p>
                                                            <p className=" text-[rgb(255,180,0)]">{commaGold(equip.enchantPrice)}</p> */}
                                                            {transformStatusArray(equip.enchant.status).map(item =>
                                                                <p key={item}>
                                                                    {item}
                                                                </p>
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="w-6 h-full bg-black"></div>
                                </div>
                                {/* 아코디언 */}
                                <div className={`overflow-hidden grid ease-in-out transition-all duration-300 bg-[rgb(35,41,50)] 
                                cursor-pointer
                            ${accordion.includes(index)
                                        ? 'grid-rows-1 opacity-100 h-[160px]'
                                        : 'grid-rows-0 opacity-0 h-0'
                                    }`}
                                    onClick={() => handleAccordionIndex(index)}
                                >
                                    <div className="mx-1 pt-1 text-[13px] flex items-center">
                                        {equip.enchant && equip.enchant.itemId && (
                                            <div className="flex items-center pr-4">
                                                <img src={`https://img-api.neople.co.kr/df/items/${equip.enchant.itemId}`} />
                                                <span className="ml-1">
                                                    {equip.enchant.itemName}
                                                </span>
                                            </div>
                                        )}
                                        {equip.itemTypeDetail.includes('칭호') && equip.price && (
                                            <div className="flex items-center pr-4">
                                                <img src={`https://img-api.neople.co.kr/df/items/${equip.itemId}`} />
                                                <span className="ml-1">
                                                    {equip.itemName}
                                                </span>
                                            </div>
                                        )}
                                        {equip.enchantPrice ?
                                            (<div>
                                                <p>
                                                    최근 평균 거래가 : {commaGold(equip.enchantPrice)}
                                                </p>
                                                <div>
                                                    최근 거래내역 : {equip.enchantHistory ? equip.enchantHistory.map((hstr, index) => (
                                                        <p key={index} className="text-gray-400">
                                                            {hstr.soldDate} {commaGold(hstr.unitPrice)}
                                                        </p>
                                                    )) : (<span className="text-gray-400">거래 내역 없음</span>)}
                                                </div>
                                            </div>)
                                            : equip.itemTypeDetail.includes('칭호') && equip.price ?
                                                (<div>
                                                    <p>
                                                        최근 평균 거래가 : {commaGold(equip.price)}
                                                    </p>
                                                    <div>
                                                        최근 거래내역 : {equip.history ? equip.history.map((hstr, index) => (
                                                            <p key={index} className="text-gray-400">
                                                                {hstr.soldDate} {commaGold(hstr.unitPrice)}
                                                            </p>
                                                        )) : (<span className="text-gray-400">거래 내역 없음</span>)}
                                                    </div>
                                                </div>) :
                                                (<span className="text-gray-400">
                                                    거래 내역 없음
                                                </span>)
                                        }
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EquipComponent;