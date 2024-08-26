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
            <div className="md:w-[90%] w-[60%] p-2">
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
                                    className="w-full"
                                    style={{
                                        borderRight: auraSkin?.price || item?.price || item?.emblems?.some(em => em.price)
                                            ? '4px solid rgb(255,180,0)' : ''
                                    }}
                                >
                                    <div className="flex items-center min-h-[85px] w-full">
                                        {/* 아바타 블럭 */}
                                        <div className="w-[70%] flex items-center">
                                            <p className="w-[64px] flex items-center justify-center mx-1 text-[13px]">
                                                {transAvatarSlotName(item.slotName)}
                                            </p>
                                            <span className="flex">
                                                <img src={`https://img-api.neople.co.kr/df/items/${item.itemId}`} />
                                                {item.clone && item.clone.itemId != null && (
                                                    <img className="ml-[2px]" src={`https://img-api.neople.co.kr/df/items/${item.clone.itemId}`} />
                                                )}
                                                {item.slotName === '오라 아바타' && auraSkin && (
                                                    <img className="ml-[2px]" src={`https://img-api.neople.co.kr/df/items/${auraSkin.itemId}`} />
                                                )}
                                            </span>
                                            <span className="px-2 text-[14px]">
                                                <p>{item.itemName}</p>
                                                {item.clone && item.clone.itemName != null && (
                                                    <p>{item.clone.itemName}</p>
                                                )}
                                                {item.slotName === '오라 아바타' && auraSkin && (
                                                    <p>{auraSkin.itemName}</p>
                                                )}
                                            </span>
                                        </div>
                                        {item.slotName === '오라 아바타' && auraSkin && (
                                            <div className="py-1">
                                                <div className="flex items-center">
                                                </div>
                                            </div>
                                        )}
                                        {/* 엠블렘 블럭 */}
                                        <div className="flex justify-start flex-col w-[30%]">
                                            {item.emblems && item.emblems.length > 0 && item.emblems.map((em, index) => (
                                                <div className="text-[13px] py-1 px-2" key={index}>
                                                    {emblemColors(em)}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            }
                        >
                            <div className="flex h-full p-2 items-center">
                                <div className={`h-full grid w-[50%]
                                    ${item.clone.itemId ? 'grid-rows-2' : 'grid-rows-1'}
                                    `}>
                                    <div className="mx-1 text-[13px] flex items-center">
                                        <span className="flex items-center pr-4 py-1">
                                            <img src={`https://img-api.neople.co.kr/df/items/${item.itemId}`} />
                                            <span className="text-ellipsis overflow-hidden whitespace-nowrap ml-1 max-w-[150px]">
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
                                        <div className="mx-1 text-[13px] flex items-center">
                                            <span className="flex items-center pr-4">
                                                <img src={`https://img-api.neople.co.kr/df/items/${item.clone.itemId}`} />
                                                <span className="text-ellipsis overflow-hidden whitespace-nowrap ml-1 max-w-[150px]">
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
                                    <div className={`h-full grid w-[50%] ${item.emblems && item.emblems.length === 3 ? 'grid-rows-3' : item.emblems.length === 1 ? 'grid-rows-1' : item.emblems.length === 2 ? 'grid-rows-2' : 'grid-auto-rows'}`}>
                                        {item.emblems && item.emblems.length > 0 && item.emblems.map((em, index) => (
                                            <div className="mx-1 py-1 text-[13px] flex items-center" key={index}>
                                                <span className="flex items-center pr-4">
                                                    <span className="text-ellipsis overflow-hidden whitespace-nowrap ml-1 max-w-[150px]">
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