import { emblemGrade } from "../globalFunction";
import { avatarSlot } from "./checkFunction";

export function checkAvatar(avatar) {
    const checkAvatarList = [];
    // export const avatarSlot = ['오라', '무기', '모자', '머리', '얼굴', '목가슴', '상의', '하의', '허리', '신발', '스킨']
    const avatarSet = new Set(avatarSlot);
    const emblems = {};

    // 아바타 탐색 + 수준 확인
    if (!avatar?.avatar) {
        checkAvatarList.push({ lvl: 1, msg: '아바타가 존재하지 않습니다.' })
    } else {
        for (const av of avatar.avatar) {
            const slot = av.slotName.replace(' 아바타', '');
            avatarSet.delete(slot)

            // 엠블렘 확인
            if (!emblems[slot] && !slot.includes('오라 스킨')) {
                emblems[slot] = []; // 슬롯이 처음 발견되면 배열로 초기화
            }
            if (av.emblems) {
                for (const em of av.emblems) {
                    emblems[slot].push(em.itemRarity)
                }
            }

            // 오라 수준 확인
            if (slot === '오라') {
                if (av.rank === 1) {
                    checkAvatarList.push({ lvl: 4, msg: `종결 오라를 보유하고 있습니다.` })
                } else if (av.rank === 2) {
                    checkAvatarList.push({ lvl: 3, msg: `준종결 오라를 보유하고 있습니다.` })
                } else if (av.rank >= 3) {
                    checkAvatarList.push({ lvl: 2, msg: `하급 오라를 보유하고 있습니다.` })
                }
            }
        }
    }

    // 엠블렘 확인
    if (Object.keys(emblems).length === 0) {
        checkAvatarList.push({ lvl: 1, msg: `모든 아바타에 엠블렘이 누락되어 있습니다.` })
    } else {
        // 아바타 순회하여 엠블렘 확인
        let missingEmblems = [];
        let rowLvlEmblems = [];
        for (const em in emblems) {
            if (em.includes('상의') || em.includes('하의')) {
                if (emblems[em].length < 3 || !emblems[em]) {
                    missingEmblems.push(transSkinToPibu(em))
                }
                // 플래티넘 엠블렘 등급 확인
                if (!emblems[em]?.includes('레전더리')) {
                    rowLvlEmblems.push(em)
                }
            } else {
                if (emblems[em].length < 2 || !emblems[em]) {
                    missingEmblems.push(transSkinToPibu(em))
                }
            }
        }

        // 아바타 누락 확인
        const missingAvatar = Array.from(avatarSet);
        if (missingAvatar?.length > 0) {
            const missingAvatarStr = missingAvatar.map(transSkinToPibu).join(', ');
            checkAvatarList.push({ lvl: 1, msg: `누락된 아바타가 있습니다: ${missingAvatarStr}` })
        }

        // 엠블렘 누락 확인
        if (missingEmblems.length > 0) {
            const missingEmblemStr = missingEmblems.join(', ');
            checkAvatarList.push({ lvl: 1, msg: `엠블렘이 누락된 아바타가 있습니다: ${missingEmblemStr}` })
        }
        // 플래티넘 엠블렘 레전더리 누락 확인
        if (rowLvlEmblems.length > 0) {
            const rowLvlEmblemsStr = rowLvlEmblems.join(', ');
            checkAvatarList.push({ lvl: 1, msg: `레전더리 플래티넘 엠블렘이 누락된 아바타가 있습니다: ${rowLvlEmblemsStr}` })
        }
        checkAvatarList.push(emblems)
    }

    return checkAvatarList;
}

function transSkinToPibu(n) {
    if (n === '스킨') {
        return '피부'
    } else {
        return n
    }
}