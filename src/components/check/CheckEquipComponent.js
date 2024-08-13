import { transFameRank } from "../../common/check/checkFunction";
import { checkEquip } from "../../common/check/equipFunction";
import CheckBlock from "../../common/item/CheckBlock";

const CheckEquipComponent = (equip) => {

    const equipGridSlot = {};
    const chkList = checkEquip(equip)

    equipGridSlot['left'] = {
        '머리어깨': '1/1',
        '상의': '1/2',
        '하의': '2/1',
        '벨트': '2/2',
        '신발': '3/1'
    }

    equipGridSlot['right'] = {
        '무기': '1/1',
        '칭호': '1/2',
        '팔찌': '2/1',
        '목걸이': '2/2',
        '보조장비': '3/1',
        '반지': '3/2',
        '귀걸이': '4/1',
        '마법석': '4/2',
    }

    console.log(chkList)

    return (
        <div className="flex">
            {/* 장비 이미지 슬롯 */}
            <div className="flex w-[50%]">
                <div className="grid grid-cols-[repeat(2,42px)] grid-rows-[repeat(3,46px)]">
                    {equip?.equipment?.map((item, index) => {
                        const gridItem = equipGridSlot['left'][item.slotName];
                        if (!gridItem) return null;
                        return (
                            <div
                                key={item.itemId}
                                style={{ gridArea: gridItem }}
                                className={`${transFameRank(item?.enchantRank)} border-b-4 m-[2px]`}>
                                <img width={`42px`} src={`https://img-api.neople.co.kr/df/items/${item.itemId}`} />
                            </div>
                        )
                    })}
                </div>
                {/* 거리두기 */}
                <div className="w-[100px]"></div> 
                <div className="grid grid-cols-[repeat(2,42px)] grid-rows-[repeat(4,46px)]">
                    {equip?.equipment?.map((item, index) => {
                        const gridItem = equipGridSlot['right'][item.slotName];

                        if (!gridItem) return null;
                        return (
                            <div
                                key={item.itemId}
                                style={{ gridArea: gridItem }}
                                className={`${transFameRank(item?.enchantRank)} border-b-4 m-[2px]`}>
                                <img width={`42px`} src={`https://img-api.neople.co.kr/df/items/${item.itemId}`} />
                            </div>
                        )
                    })}
                </div>
            </div>
            {/* 설명 */}
            <div className="w-[50%]">
                {chkList.map(item => {
                    if (!item.hasOwnProperty('msg')) {
                        return null;
                    } else {
                        // 반복문에서 key는 해당 컴포넌트 내부가 아니라 반복문으로 쪼갠 그 자리에서 지정해야한다
                        return <CheckBlock key={item.msg} chk={item}></CheckBlock>
                    }
                })}
            </div>
        </div>
    );
}

export default CheckEquipComponent;