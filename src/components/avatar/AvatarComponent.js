import { useState } from "react";
import { commaGold, emblemColors, transAvatarSlotName } from "../../common/globalFunction";
import { avatarSlot } from "../../common/check/checkFunction";
import Tooltip from "../../common/item/Tooltip";
import Accordion from "../../common/item/Accordion";

const AvatarComponent = ({ avatar }) => {

    const sortedAvatars = avatar
        .filter((item) => item.slotName !== '오라 스킨 아바타')
        .sort((a, b) => avatarSlot.indexOf(a.slotName.replace(" 아바타", "")) - avatarSlot.indexOf(b.slotName.replace(" 아바타", "")));


    const auraSkin = Object.values(avatar).find(item => item.slotName === '오라 스킨 아바타');
    console.log('avatar: ', avatar)
    console.log(sortedAvatars)

    return (
        <div className="text-white flex justify-center">
            <div className="md:w-[90%] w-full p-2">
                <div className="pb-2 font-bold flex justify-between">
                    <span>
                        아바타
                    </span>
                    {/* <span>
                        {commaGold(avatar.sumPrice)}
                    </span> */}
                </div>
                <div className="text-[14px]">
                    {avatar.length > 0 && sortedAvatars.map((item, index) => (
                        <Accordion
                            key={index + 'avatar'}
                            headerContent={
                                <div
                                    className="w-full py-1"
                                    style={{
                                        borderRight: auraSkin?.price || item?.price || item?.emblems?.some(em => em.price)
                                            ? '4px solid rgb(255,180,0)' : ''
                                    }}
                                >
                                    <div className="flex md:flex-row flex-col min-h-[85px] w-full md:text-[14px] text-[12px]">
                                        {/* 아바타 블럭 */}
                                        <p className="min-w-[64px] flex items-center justify-center mx-1">
                                            {transAvatarSlotName(item.slotName)}
                                        </p>
                                        <div className="md:w-[60%] flex items-center justify-start md:p-0 pl-2">
                                            <div className="flex">
                                                <img src={`https://img-api.neople.co.kr/df/items/${item.itemId}`} />
                                                {item.clone && item.clone.itemId != null && (
                                                    <img className="" src={`https://img-api.neople.co.kr/df/items/${item.clone.itemId}`} />
                                                )}
                                                {item.slotName === '오라 아바타' && auraSkin && (
                                                    <img className="" src={`https://img-api.neople.co.kr/df/items/${auraSkin.itemId}`} />
                                                )}
                                            </div>
                                            <div className="px-2">
                                                <p>{item.itemName}</p>
                                                {item.clone && item.clone.itemName != null && (
                                                    <p>{item.clone.itemName}</p>
                                                )}
                                                {item.slotName === '오라 아바타' && auraSkin && (
                                                    <p>{auraSkin.itemName}</p>
                                                )}
                                            </div>
                                        </div>
                                        {item.slotName === '오라 아바타' && auraSkin && (
                                            <div className="py-1">
                                                <div className="flex items-center">
                                                </div>
                                            </div>
                                        )}
                                        {/* 엠블렘 블럭 */}
                                        <div className="flex justify-start flex-col md:w-[30%] md:m-0 mt-2">
                                            {item.emblems && item.emblems.length > 0 && item.emblems.map((em, index) => (
                                                <div className="md:text-[13px] text-[11px] md:py-1 px-2" key={index+'avatarEm'}>
                                                    {emblemColors(em)}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            }
                        >
                            <div className="flex md:flex-row flex-col h-full md:items-center md:text-[13px] text-[11px]">
                                <div className={`h-full grid md:w-[50%]
                                    ${item.clone.itemId ? 'grid-rows-2' : 'grid-rows-1'}
                                    `}>
                                    <div className="mx-1 flex md:flex-row flex-col md:items-center">
                                        <span className="flex items-center pr-4 py-1">
                                            <img src={`https://img-api.neople.co.kr/df/items/${item.itemId}`} />
                                            <span className="text-ellipsis overflow-hidden md:whitespace-nowrap ml-1 md:max-w-[150px]">
                                                {item.itemName}
                                            </span>
                                        </span>
                                        {item.price ?
                                            (<div>
                                                <p>
                                                    최근 평균 거래가 : {commaGold(item.price)}
                                                </p>
                                                <div className="flex">
                                                    최근 거래내역 : {item.history ? (
                                                        <Tooltip text={item.history}>
                                                            <span className="text-blue-400">
                                                                [거래내역]
                                                            </span>
                                                        </Tooltip>
                                                    ) : (<span className="text-gray-400">거래 내역 없음</span>)}
                                                </div>
                                            </div>)
                                            :
                                            (<span className="text-gray-400">
                                                거래 내역 없음
                                            </span>)
                                        }
                                    </div>
                                    {item.clone.itemId && (
                                        <div className="mx-1 flex md:flex-row flex-col md:items-center mt-1 md:mt-0">
                                            <span className="flex items-center pr-4">
                                                <img src={`https://img-api.neople.co.kr/df/items/${item.clone.itemId}`} />
                                                <span className="text-ellipsis overflow-hidden whitespace-nowrap ml-1 md:max-w-[150px]">
                                                    {item.clone.itemName}
                                                </span>
                                            </span>
                                            {item.clone.price ?
                                                (<div>
                                                    <p>
                                                        최근 평균 거래가 : {commaGold(item.clone.price)}
                                                    </p>
                                                    <div className="flex">
                                                        최근 거래내역 : {item.clone.history ? (
                                                            <Tooltip text={item.clone.history}>
                                                                <span className="text-blue-400">
                                                                    [거래내역]
                                                                </span>
                                                            </Tooltip>
                                                        ) : (<span className="text-gray-400">거래 내역 없음</span>)}
                                                    </div>
                                                </div>)
                                                :
                                                (<span className="text-gray-400">
                                                    거래 내역 없음
                                                </span>)
                                            }
                                        </div>
                                    )}
                                </div>
                                {item.emblems && (
                                    <div className={`h-full md:mt-0 mt-2 grid md:w-[50%] ${item.emblems && item.emblems.length === 3 ? 'grid-rows-3' : item.emblems.length === 1 ? 'grid-rows-1' : item.emblems.length === 2 ? 'grid-rows-2' : 'grid-auto-rows'}`}>
                                        {item.emblems && item.emblems.length > 0 && item.emblems.map((em, index) => (
                                            <div className="mx-1 py-1 flex md:flex-row flex-col md:items-center" key={index}>
                                                <span className="flex items-center pr-4">
                                                    <span className="text-ellipsis overflow-hidden whitespace-nowrap md:ml-1 md:max-w-[150px]">
                                                        {/* {emblemColors(em)} */}
                                                        {em.itemName}
                                                    </span>
                                                </span>
                                                {em.price ?
                                                    (<div>
                                                        <p>
                                                            최근 평균 거래가 : {commaGold(em.price)}
                                                        </p>
                                                        <div className="flex">
                                                            최근 거래내역 : {em.history ? (
                                                                <Tooltip text={em.history}>
                                                                    <span className="text-blue-400">
                                                                        [거래내역]
                                                                    </span>
                                                                </Tooltip>
                                                            ) : (<span className="text-gray-400">거래 내역 없음</span>)}
                                                        </div>
                                                    </div>)
                                                    :
                                                    (<span className="text-gray-400">
                                                        거래 내역 없음
                                                    </span>)
                                                }
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </Accordion>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AvatarComponent;