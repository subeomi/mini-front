import { useState } from "react";
import { commaGold, transformStatusArray } from "../../common/globalFunction";
import Tooltip from "../../common/item/Tooltip";
import Accordion from "../../common/item/Accordion";

const EquipComponent = ({ equipment }) => {

    return (
        <div>
            <div className="flex justify-center relative text-white">
                <div className="md:w-[90%] w-full p-2">
                    <div className="pb-2 font-bold flex justify-between">
                        <span>
                            장착 장비
                        </span>
                    </div>
                    {equipment?.length > 0 && equipment?.map((equip, index) => {
                        return (
                            <Accordion
                                key={index + 'equip'}
                                headerContent={
                                    <div
                                        className="w-full py-1"
                                        style={{
                                            borderRight: equip.enchantPrice || equip.price ? '4px solid rgb(255,180,0)' : ''
                                        }}
                                    >
                                        {/* 장비 */}
                                        <div className="flex items-center min-h-[75px] w-full">
                                            <div className="w-[70%] flex items-center md:pl-4 pl-2">
                                                <div className="md:text-[14px] text-[12px]">
                                                    <div className="flex">
                                                        {equip.itemId && (
                                                            <img src={`https://img-api.neople.co.kr/df/items/${equip.itemId}`} />
                                                        )}
                                                        {equip.upgradeInfo && (
                                                            <img src={`https://img-api.neople.co.kr/df/items/${equip.upgradeInfo.itemId}`} />
                                                        )}
                                                        {!equip.upgradeInfo && (
                                                            <div className="w-[28px] h-[28px]"></div>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center justify-center">
                                                        <p className={`flex justify-center w-[28px] h-[21px] ${equip.amplificationName !== null ? 'text-[#ff51ff]' : ''}`}>+{equip.reinforce}</p>
                                                        {equip.fixedOption?.level && (
                                                            <span className="text-[#df9f3f] justify-center flex w-[28px] h-[21px]">Lv{equip.fixedOption.level}</span>
                                                        )}
                                                        {equip.customOption?.level && (
                                                            <span className="text-[#df9f3f] justify-center flex w-[28px] h-[21px]">Lv{equip.customOption.level}</span>
                                                        )}
                                                        {!(equip.fixedOption?.level || equip.customOption?.level) && (
                                                            <div className="w-[28px] h-[21px]"></div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div
                                                    className={`pl-4 md:text-[14px] text-[12px] grid ${equip.upgradeInfo ? 'grid-rows-2' : 'grid-rows-1'}`}>
                                                    <span className="flex items-center">
                                                        {equip.itemName}
                                                    </span>
                                                    {equip.upgradeInfo && (
                                                        <span className="text-[#df9f3f] flex items-center">{equip.upgradeInfo.itemName}</span>
                                                    )}
                                                </div>
                                            </div>
                                            {/* 마부 */}
                                            <div className="px-1 w-[30%] min-w-[116px] md:text-[13px] text-[10px] md:mr-2 flex items-center justify-end">
                                                {equip.enchant && (
                                                    <div className="p-1 flex items-center">
                                                        <div className="hidden md:block min-w-[32px]">
                                                            {equip.enchant.itemId && (<img src={`https://img-api.neople.co.kr/df/items/${equip.enchant.itemId}`} />)}
                                                        </div>
                                                        <div className="px-2 md:min-w-[125px] min-w-[86px] text-right">
                                                            {equip.enchant.explain && (
                                                                <span>
                                                                    {equip.enchant.explain}
                                                                </span>
                                                            )}
                                                            {transformStatusArray(equip.enchant.status).map(item =>
                                                                <p key={equip.itemName + item}>
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
                                <div className="mx-1 pt-1 md:text-[14px] text-[12px] flex md:flex-row flex-col md:items-center">
                                    {equip.itemTypeDetail.includes('칭호') && equip.price && (
                                        <div className="flex md:mr-4 mb-4 md:flex-row flex-col">
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
                                        <div className="flex md:flex-row flex-col">
                                            <div className="flex items-center pr-4 md:mb-0 mb-4">
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