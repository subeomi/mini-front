import { useState } from "react";
import { commaGold, emblemColors } from "../../common/globalFunction";
import Tooltip from "../../common/item/Tooltip";
import Accordion from "../../common/item/Accordion";

const SwitchingComponent = ({ switching }) => {
    console.log('switching: ', switching)

    const [accordion, setAccordion] = useState([])

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

    return (
        <div className="text-white flex justify-center">
            <div className="md:w-[90%] w-full p-2">
                <div className="pb-2 font-bold flex justify-between">
                    <span>
                        버프강화
                    </span>
                    {/* <span>
                        {commaGold(switching.sumPrice)}
                    </span> */}
                </div>
                {combinedArray.length > 0 && combinedArray.map((item, index) => (
                    <Accordion
                        key={index + 'switching'}
                        headerContent={
                            <div
                                className="w-full py-1"
                                style={{
                                    borderRight: item.price || item.emblems?.some(em => em.price) ? '4px solid rgb(255,180,0)' : ''
                                }}>
                                <div className="flex min-h-[60px] flex-col md:flex-row md:text-[14px] text-[12px]">
                                    {/* 스위칭 아이템 */}
                                    <p className="min-w-[64px] items-center justify-center flex md:mx-1 md:text-[13px] text-[10px] pb-1 md:p-0">
                                        {item.slotName ? item.slotName.includes('아바타') ? item.slotName.replace(' 아바타', '') : item.slotName : "크리쳐"}
                                    </p>
                                    <div className="flex items-center md:w-[60%] md:p-0 pl-2">
                                        <span className="flex">
                                            <img className="min-w-[28px] min-h-[28px]" src={`https://img-api.neople.co.kr/df/items/${item.itemId}`} />
                                        </span>
                                        <span className="px-2">
                                            <p>{item.itemName}</p>
                                            {item.clone && item.clone.itemName != null && (
                                                <p>{item.clone.itemName}</p>
                                            )}
                                        </span>
                                    </div>
                                    {/* 엠블렘 블럭 */}
                                    <div className="flex w-full items-center md:justify-end md:mr-2 mt-2">
                                        {item.emblems && item.emblems.length > 0 && item.emblems.map((em, index) => (
                                            <div className="px-2" key={index + 'switchingEm'}>
                                                {emblemColors(em)}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        }>
                        <div className="flex h-full md:items-center md:flex-row flex-col md:text-[14px] text-[12px]">
                            <div className={`h-full grid md:w-[50%] grid-rows-1 md:flex-row flex-col md:mb-0 mb-4`}>
                                <div className="flex items-center pr-4 py-1">
                                    <img src={`https://img-api.neople.co.kr/df/items/${item.itemId}`} />
                                    <span className="text-ellipsis overflow-hidden ml-1">
                                        {item.itemName}
                                    </span>
                                </div>
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
                            {item.emblems && (
                                // 스위칭 엠블렘은 서버에서 플래티넘만 가져오는 중
                                <div className={`h-full md:w-[50%] md:text-[14px] text-[12px]`}>
                                    {item.emblems && item.emblems.length > 0 && item.emblems.map((em, index) => (
                                        <div className="py-1 flex flex-col items-start" key={index + em.itemName}>
                                            <div className="flex items-center pr-4">
                                                <span className="text-ellipsis overflow-hidden whitespace-nowrap">
                                                    {/* {emblemColors(em)} */}
                                                    {em.itemName}
                                                </span>
                                            </div>
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
    );
}

export default SwitchingComponent;