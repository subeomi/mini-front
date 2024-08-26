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
            <div className="w-[90%] p-2">
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
                                className="w-full"
                                style={{
                                    borderRight: item.price || item.emblems?.some(em => em.price) ? '4px solid rgb(255,180,0)' : ''
                                }}>
                                <div className="flex min-h-[60px]">
                                    {/* 스위칭 아이템 */}
                                    <div className="flex items-center w-[70%]">
                                        <p className="w-[64px] items-center justify-center flex mx-1 text-[13px]">
                                            {item.slotName ? item.slotName.includes('아바타') ? item.slotName.replace(' 아바타', '') : item.slotName : "크리쳐"}
                                        </p>
                                        <span>
                                            <span className="flex">
                                                <img src={`https://img-api.neople.co.kr/df/items/${item.itemId}`} />
                                            </span>
                                        </span>
                                        <span className="px-2 text-[14px]">
                                            <p>{item.itemName}</p>
                                            {item.clone && item.clone.itemName != null && (
                                                <p>{item.clone.itemName}</p>
                                            )}
                                        </span>
                                    </div>
                                    {/* 엠블렘 블럭 */}
                                    <div className="flex items-center">
                                        {item.emblems && item.emblems.length > 0 && item.emblems.map((em, index) => (
                                            <div className="text-[13px] py-1" key={index}>
                                                {emblemColors(em)}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        }>
                            <div className="flex h-full p-2 items-center">
                                <div className={`h-full grid w-[50%]grid-rows-1`}>
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
    );
}

export default SwitchingComponent;