import CheckAvatarComponent from "../../components/check/CheckAvatarComponent"
import CheckCreatureComponent from "../../components/check/CheckCreatureComponent"
import CheckEquipComponent from "../../components/check/CheckEquipComponent"
import CheckSwitchingComponent from "../../components/check/CheckSwitchingComponent"

export function transFameRank(r) {
    if (r === 1) {
        return "border-b-sky-500"
    } else if (r === 2) {
        return "border-b-green-500"
    } else if (r >= 3) {
        return "border-b-yellow-500"
    } else {
        return "border-b-red-500"
    }
}

export const switchingSlot = ['무기', '칭호', '상의', '머리어깨', '하의', '신발', '벨트', '목걸이', '팔찌', '반지', '보조장비', '마법석', '귀걸이', '상의 아바타', '하의 아바타', '크리쳐']
export const avatarSlot = ['오라', '무기', '모자', '머리', '얼굴', '목가슴', '상의', '하의', '허리', '신발', '스킨']
export const equipSlot = ["무기", "칭호", "상의", "하의", "머리어깨", "신발", "벨트", "팔찌", "목걸이", "반지", "보조장비", "마법석", "귀걸이"];

// -------------------------------------------------- analyst 방식

export const checkNameList = ['equip', 'switching', 'avatar', 'creature'];

export function checkInfo(type, obj, buff, jobName) {

    let result;

    if (type === 'equip') {
        result = CheckEquipComponent(obj.equip)
    } else if (type === 'switching') {
        result = CheckSwitchingComponent(obj.switching, buff, jobName)
    } else if (type === 'avatar') {
        result = CheckAvatarComponent(obj.avatar)
    } else if (type === 'creature') {
        result = CheckCreatureComponent(obj.creature)
    }

    return result
}