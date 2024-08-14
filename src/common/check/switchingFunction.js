import { jobBuffSkills } from "../skill/buffSkillsInfo";
import { equipSlot, switchingSlot } from "./checkFunction";

export function checkSwitching(switching, buff, jobName) {
    const checkSwitchingList = [];
    const switchingSet = new Set(switchingSlot);
    let switchingEquip = equipSlot.filter(item => item !== '칭호')
    const checkSwitchingRank = { r1: [], r2: [], title: 0, jacket: 0, pants: 0, creature: 0 }
    const mismatch = [];

    // 스위칭 순회
    if (switching.length === 0) {
        checkSwitchingList.push({ lvl: 1, msg: `버프강화 아이템이 존재하지 않습니다!` })
    } else {
        for (const sw of switching) {
            switchingSet.delete(sw.slotName);

            // 스위칭 장비 체크
            if (switchingEquip.includes(sw.slotName)) {
                // 편린 장비에 버프명이 포함되어있지 않음
                if (!sw.itemName.includes(buff.name)) {
                    mismatch.push(sw.slotName)
                } else {
                    if (sw.itemName.includes('심연의')) {
                        if (sw.itemName.includes('짙은')) {
                            checkSwitchingRank.r1.push(sw.slotName)
                        } else {
                            checkSwitchingRank.r2.push(sw.slotName)
                        }
                    }
                }
            }
            // 아바타 옵션 체크
            if (sw.slotName === '상의 아바타') {
                if(!sw.optionAbility.includes(buff.name)){
                    checkSwitchingList.push({ lvl: 1, msg: `상의 아바타의 옵션이 직업 버프와 일치하지 않습니다.` })
                }
            } else if(sw.slotName === '크리쳐'){
                checkSwitchingRank.creature = checkSwitchingCreture(sw, jobName, buff)
            }

            // 스위칭 칭호 스킬레벨 체크
            if (sw.slotName === '칭호') {
                checkSwitchingRank.title = checkSwitchingTitle(sw, jobName, buff)
            }
        }
    }
    checkSwitchingList.push(checkSwitchingRank)

    // 스위칭 누락부위 체크
    const missingSwitching = Array.from(switchingSet);
    if (missingSwitching.length > 0 && missingSwitching.length < 16) {
        const missingSwitchingStr = missingSwitching.join(', ');
        checkSwitchingList.push({ lvl: 1, msg: `누락된 버프강화가 있습니다: ${missingSwitchingStr}` })
    }

    // 장비 버프 불일치 체크
    if (mismatch.length > 0) {
        const mismatchStr = mismatchStr.join(', ');
        checkSwitchingList.push({ lvl: 1, msg: `버프가 일치하지 않는 편린 장비가 있습니다: ${mismatchStr}` })
    }

    // 편린 짙편린 체크
    if (checkSwitchingRank.r1.length === 12) {
        checkSwitchingList.push({ lvl: 4, msg: `모든 장비가 짙편린 장비입니다.` })
    } else if (checkSwitchingRank.r2.length === 12) {
        checkSwitchingList.push({ lvl: 3, msg: `모든 장비가 편린 장비입니다.` })
    }

    // 칭호 스킬레벨 체크
    if (!missingSwitching.includes('칭호')) {
        checkSwitchingList.push({ lvl: checkSwitchingRank.title + 1, msg: `칭호의 스킬 레벨이 ${checkSwitchingRank.title} 입니다.` })
    }

    // 크리쳐 스킬레벨 체크
    if (!missingSwitching.includes('크리쳐') && checkSwitchingRank.creature < 1) {
        checkSwitchingList.push({ lvl: 1, msg: `크리쳐의 옵션이 직업 버프와 일치하지 않습니다.` })
    }


    return checkSwitchingList;
}

// 캐릭터의 버프 {name: 버프명, level: 습득레벨}
export function findBuff(jG, jN) {
    let result = null;

    for (const category in jobBuffSkills) {
        for (const job in jobBuffSkills[category]) {
            if (job === jG && category === jN) {
                result = jobBuffSkills[category][job];
                break;
            }
        }
        if (result) break;
    }

    return result;
}

// 칭호 스킬레벨 체크
function checkSwitchingTitle(c, jobName, result) {

    let value = 0

    // 칭호 기본 스킬레벨
    if (c?.reinforceSkill?.reinforce) {
        // 범위
        if (c?.reinforceSkill?.reinforce?.levelRange) {
            const min = c.reinforceSkill.reinforce.levelRange[0].minLevel
            const max = c.reinforceSkill.reinforce.levelRange[0].maxLevel
            if (result.level >= min && result.level <= max) {
                value += c.reinforceSkill.reinforce.levelRange[0].value
            }
            // 특정스킬
        } else if (c?.reinforceSkill?.reinforce?.skills) {
            for (const skill of c.reinforceSkill.reinforce.skills) {
                if (skill.name === result.name) {
                    value += skill.value
                }
            }
        }
    }

    // 칭호에 발린 마법부여 
    if (c?.enchant?.reinforceSkill) {
        // 스킬들은 객체들로 이루어져있다
        for (const item of c.enchant.reinforceSkill) {
            if (jobName === item.jobName && Array.isArray(item.skills)) {
                // 객체 안의 skills 배열에서 내 버프명과 비교
                for (const skill of item.skills) {
                    if (skill.name === result.name) {
                        value += skill.value
                    }
                }
            }
        }
    }

    return value
}
// 크리쳐 스킬레벨 체크 >> 추후 칭호 함수와 비교
function checkSwitchingCreture(c, jobName, result) {

    let value = 0

    if (c?.reinforceSkill?.reinforce) {
        if (c?.reinforceSkill?.reinforce?.levelRange) {
            const min = c.reinforceSkill.reinforce.levelRange[0].minLevel
            const max = c.reinforceSkill.reinforce.levelRange[0].maxLevel
            if (result.level >= min && result.level <= max) {
                value += c.reinforceSkill.reinforce.levelRange[0].value
            }
        } else if (c?.reinforceSkill?.reinforce?.skills) {
            for (const skill of c?.reinforceSkill?.reinforce?.skills) {
                if (skill.name === result.name) {
                    value = skill.value
                }
            }
        }
    } else if (c?.enchant?.reinforceSkill) {
        for (const item of c?.enchant?.reinforceSkill) {
            if (jobName === item.jobName && Array.isArray(item.skills)) {
                for (const skill of item.skills) {
                    if (skill.name === result.name) {
                        value = skill.value
                    }
                }
            }
        }
    }

    return value
}
