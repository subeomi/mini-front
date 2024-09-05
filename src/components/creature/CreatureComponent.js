import { commaGold } from "../../common/globalFunction";
import Accordion from "../../common/item/Accordion";

const CreatureComponent = ({ creature }) => {

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

    const artifactArray = Array.isArray(creature?.artifact) ? creature?.artifact : [];

    const combinedArray = [{
        itemId: creature?.itemId,
        history: creature?.history,
        itemName: creature?.itemName,
        price: creature?.price
    }
        , ...artifactArray];

    return (
        <div className="flex justify-center text-white">
            <div className="md:w-[90%] w-full p-2">
                <div className="pb-2 font-bold flex justify-between">
                    <span>
                        크리쳐
                    </span>
                    {/* <span>
                        {commaGold(creature.sumPrice)}
                    </span> */}
                </div>
                {creature && (
                    <div>
                        {combinedArray && combinedArray.map((item, index) => (
                            <Accordion
                                key={index + 'creature'}
                                headerContent={
                                    <div className="flex items-center py-2">
                                        <p className="w-[64px] items-center justify-center flex mx-1 text-[13px]">
                                            {translateSlotColor(item.slotColor) || '크리쳐'}
                                        </p>
                                        <span className="flex">
                                            <img src={`https://img-api.neople.co.kr/df/items/${item?.itemId}`} />
                                        </span>
                                        <span className="px-2 text-[14px]">
                                            <p>{item.itemName}</p>
                                            {/* <p>{commaGold(item.price)}</p> */}
                                        </span>
                                    </div>
                                }>
                                <div className="mx-1 py-1 text-[13px] flex md:flex-row flex-col md:items-center">
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
                            </Accordion>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default CreatureComponent;