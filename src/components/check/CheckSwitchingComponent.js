import { transFameRank } from "../../common/check/checkFunction";
import { checkSwitching } from "../../common/check/switchingFunction";
import CheckBlock from "../../common/item/CheckBlock";

const CheckSwitchingComponent = (switching, buff, jobName) => {

    const chkList = checkSwitching(switching, buff, jobName)

    const switchingGridSlot = {
        머리어깨: '1/1',
        상의: '1/2',
        무기: '1/4',
        칭호: '1/5',
        크리쳐: '1/9',
        하의: '2/1',
        벨트: '2/2',
        팔찌: '2/4',
        목걸이: '2/5',
        '상의 아바타': '2/7',
        신발: '3/1',
        보조장비: '3/4',
        반지: '3/5',
        '하의 아바타': '3/7',
        귀걸이: '4/4',
        마법석: '4/5'
    }

    return (
        <div className="flex md:flex-row flex-col">
            <div className="grid 
            md:grid-cols-[repeat(9,39px)] md:grid-rows-[repeat(4,39px)] 
            grid-cols-[repeat(9,34px)] grid-rows-[repeat(4,34px)] 
            md:w-[50%] md:min-w-[350px]">
                {switching?.map((item, index) => {
                    const gridItem = switchingGridSlot[item.slotName];
                    if (!gridItem) return null;
                    return (
                        <div
                            key={item.itemId}
                            style={{ gridArea: gridItem }}
                            className={`m-[2px]`}>
                            <img width={`42px`} src={`https://img-api.neople.co.kr/df/items/${item.itemId}`} />
                        </div>
                    )
                })}
            </div>
            <div className="md:w-[50%] md:mt-0 mt-4">
                {chkList.map(item => {
                    if (!item.hasOwnProperty('msg')) {
                        return null;
                    } else {
                        return <CheckBlock key={item.msg} chk={item}></CheckBlock>
                    }
                })}
            </div>
        </div>
    );
}

export default CheckSwitchingComponent;