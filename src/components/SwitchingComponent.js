import { useState } from "react";
import { commaGold, emblemColors } from "../common/globalFunction";

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
                    <span>
                        {commaGold(switching.sumPrice)}
                    </span>
                </div>
                {combinedArray.length > 0 && combinedArray.map((item, index) => (
                    <div key={index + '번'}
                        className={`min-h-[63px] mb-1 p-2 hover:bg-[rgb(35,41,50)] cursor-pointer w-full grid grid-rows-1
                        ${accordion.includes(index) ? 'bg-[rgb(35,41,50)]' : 'bg-[rgb(40,50,57)]'}`}
                        onClick={() => handleAccordionIndex(index)}
                        style={{
                            borderRight: item.price || item.emblems?.some(em => em.price) ? '4px solid rgb(255,180,0)' : ''
                        }}
                    >
                        <div className="flex justify-between">
                            <div className="flex items-center">
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
                        {/* 아코디언 */}
                        <div className={`overflow-hidden flex ease-in-out transition-all duration-300 bg-[rgb(35,41,50)] 
                                cursor-pointer
                            ${accordion.includes(index)
                                ? 'opacity-100 h-[150px]'
                                : 'opacity-0 h-0'
                            }`}
                            onClick={() => handleAccordionIndex(index)}
                        >
                            <div className="mx-1 pt-1 w-[50%] text-[13px] flex items-center">
                                <span className="flex items-center pr-4">
                                    <img src={`https://img-api.neople.co.kr/df/items/${item.itemId}`} />
                                    <span className="text-ellipsis overflow-hidden whitespace-nowrap max-w-[150px]">
                                        {item.itemName}
                                    </span>
                                </span>
                                {item.price ?
                                    (<div>
                                        <p>
                                            최근 평균 거래가 : {commaGold(item.price)}
                                        </p>
                                        <div>
                                            최근 거래내역 : {item.history ? item.history.map((hstr, index) => (
                                                <p key={index} className="text-gray-400">
                                                    {hstr.soldDate} {commaGold(hstr.unitPrice)}
                                                </p>
                                            )) : (<span className="text-gray-400">거래 내역 없음</span>)}
                                        </div>
                                    </div>)
                                    :
                                    (<span className="text-gray-400">
                                        거래 내역 없음
                                    </span>)
                                }
                            </div>
                            {item.emblems && (
                                <div className={`h-full grid w-[50%] ${item.emblems && item.emblems.length === 3 ? 'grid-rows-3' : item.emblems.length === 1 ? 'grid-rows-1' : item.emblems.length === 2 ? 'grid-rows-2' : 'grid-auto-rows'}`}>
                                    {item.emblems && item.emblems.length > 0 && item.emblems.map((em, index) => (
                                        <div className="mx-1 pt-1 text-[13px] flex items-center" key={index}>
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
                                                    <div>
                                                        최근 거래내역 : {em.history ? (<span className="text-blue-400">[거래내역]</span>
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
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SwitchingComponent;