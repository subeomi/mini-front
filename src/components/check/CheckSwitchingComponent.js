import { transFameRank } from "../../common/check/checkFunction";
import { checkSwitching } from "../../common/check/switchingFunction";

const CheckSwitchingComponent = (switching, buff, jobName) => {

    const chkList = checkSwitching(switching, buff, jobName)

    const switchingGridSlot = {
        머리어깨: '1/1',
        상의: '1/2',
        무기: '1/3',
        칭호: '1/4',
        크리쳐: '1/9',
        하의: '2/1',
        벨트: '2/2',
        팔찌: '2/3',
        목걸이: '2/4',
        '상의 아바타': '2/7',
        신발: '3/1',
        보조장비: '3/3',
        반지: '3/4',
        '하의 아바타': '3/7',
        귀걸이: '4/3',
        마법석: '4/4'
    }

    return (
        <div>
            <div>

            </div>
            <div className="grid grid-cols-[repeat(9,42px)] grid-rows-[repeat(4,46px)]">
                {switching?.map((item, index) => {
                    const gridItem = switchingGridSlot[item.slotName];
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
    );
}

export default CheckSwitchingComponent;