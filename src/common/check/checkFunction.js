import { checkEquip } from "./equipFunction"

export function transFameRank(r) {
    if (r === 1) {
        return (<span className="text-emerald-400 ">종결</span>)
    } else if (r === 2){
        return (<span className="text-sky-400">준종결</span>)
    } else if (r >= 3) {
        return (<span className="text-yellow-400">가성비/하급</span>)
    } else {
        return (<span className="text-red-500">없음</span>)
    }
}

export const switchingSlot = ['무기', '칭호', '상의', '머리어깨', '하의', '신발', '벨트', '목걸이', '팔찌', '반지', '보조장비', '마법석', '귀걸이', '상의 아바타', '하의 아바타', '크리쳐']
export const avatarSlot = ['오라', '무기', '모자', '머리', '얼굴', '목가슴', '상의', '하의', '허리', '신발', '스킨']

// -------------------------------------------------- analyst 방식

export const checkNameList = ['equip', 'switching', 'avatar', 'creature'];

export function checkInfo (type, obj) {

    if(type === 'equip'){
        checkEquip(obj.equip)
    }
}