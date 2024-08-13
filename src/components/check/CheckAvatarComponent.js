import { checkAvatar } from "../../common/check/avatarFunction";
import { transFameRank } from "../../common/check/checkFunction";
import CheckBlock from "../../common/item/CheckBlock";

const CheckAvatarComponent = (avatar) => {

    const chkList = checkAvatar(avatar)

    const avatarGridSlot = {
        '무기 아바타': '1/1',
        '머리 아바타': '1/2',
        '모자 아바타': '1/3',
        '얼굴 아바타': '1/4',
        '오라 아바타': '2/1',
        '목가슴 아바타': '2/2',
        '상의 아바타': '2/3',
        '스킨 아바타': '2/4',
        '허리 아바타': '3/2',
        '하의 아바타': '3/3',
        '신발 아바타': '3/4'
    }

    return (
        <div className="flex">
            <div className="grid grid-cols-[repeat(9,42px)] grid-rows-[repeat(4,46px)] w-[50%]">
                {avatar?.avatar?.map((item, index) => {
                    const gridItem = avatarGridSlot[item.slotName];
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
            <div className="w-[50%]">
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

export default CheckAvatarComponent;