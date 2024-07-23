import { useState } from "react";
import { commaGold } from "../common/globalFunction";

const CreatureComponent = ({ creature }) => {

    const [accordion, setAccordion] = useState([])

    const handleAccordionIndex = (i) => {
        const checkIndex = accordion.includes(i)

        if (checkIndex) {
            setAccordion(accordion.filter((index) => index !== i))
        } else {
            setAccordion([...accordion, i])
        }
    }

    console.log(creature)

    const translateSlotColor = (color) => {
        switch (color) {
            case "RED":
                return "레드";
            case "BLUE":
                return "블루";
            case "GREEN":
                return "그린";
            default:
                return color;
        }
    }

    const artifactArray = Array.isArray(creature?.creature?.artifact) ? creature?.creature?.artifact : [];

    const combinedArray = [{
        itemId: creature?.creature?.itemId,
        history: creature?.creature?.history,
        itemName: creature?.creature?.itemName,
        price: creature?.creature?.price
    }
        , ...artifactArray];

    console.log(combinedArray)

    return (
        <div className="flex justify-center text-white">
            <div className="p-2 w-[70%]">
                <div className="pb-2 font-bold flex justify-between">
                    <span>
                        크리쳐
                    </span>
                    <span>
                        {commaGold(creature.sumPrice)}
                    </span>
                </div>
                {creature.creature && (
                    <div>
                        {combinedArray && combinedArray.map((item, index) => (
                            <div key={index}
                                className={`h-min-[50px] mb-1 p-2 hover:bg-[rgb(35,41,50)] cursor-pointer
                            ${accordion.includes(index) ? 'bg-[rgb(35,41,50)]' : 'bg-[rgb(40,50,57)]'}`}
                                onClick={() => handleAccordionIndex(index)}
                                style={{
                                    borderRight: item.price ? '4px solid rgb(255,180,0)' : ''
                                }}
                            >
                                <div className="flex items-center">
                                    <p className="w-[64px] items-center justify-center flex mx-1 text-[13px]">
                                        {translateSlotColor(item.slotColor) || '크리쳐'}
                                    </p>
                                    <span>
                                        <span className="flex">
                                            <img src={`https://img-api.neople.co.kr/df/items/${item?.itemId}`} />
                                        </span>
                                    </span>
                                    <span className="px-2 text-[14px]">
                                        <p>{item.itemName}</p>
                                        <p>{commaGold(item.price)}</p>
                                    </span>
                                </div>
                                {/* 아코디언 */}
                                <div className={`overflow-hidden grid ease-in-out transition-all duration-300 bg-[rgb(35,41,50)] 
                                cursor-pointer
                                    ${accordion.includes(index)
                                        ? 'grid-rows-[1fr] opacity-100 h-[150px]'
                                        : 'grid-rows-[0fr] opacity-0 h-0'
                                    }`}
                                    onClick={() => handleAccordionIndex(index)}
                                >
                                    <div className="mx-1 pt-1 text-[13px] flex items-center">
                                        <span className="flex items-center pr-4">
                                            <img src={`https://img-api.neople.co.kr/df/items/${item.itemId}`} />
                                            <span className="text-ellipsis overflow-hidden whitespace-nowrap w-max-[189px] ml-1">
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
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default CreatureComponent;