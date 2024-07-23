import { jobBuffSkills } from "../skill/buffSkillsInfo";

export function transSwitchingEquip(s, jG, jN) {

    // result는 캐릭터 직업의 버프명(name)과 습득레벨(level)
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

    // 체크 시작
    if (s?.itemTypeDetail?.includes("칭호")) {
        return checkReinforceSkillTitle(s, jN, result)

    } else if ((s?.itemType?.includes("무기") || s?.itemType?.includes("방어구") ||
        s?.itemType?.includes("액세서리") || s?.itemType?.includes("추가장비"))) {
        const n = s.itemName;

        if (n.includes("짙은") && n.includes("심연의")) {
            // return (<span className="text-sky-400">짙편린</span>)
            return (<span className="text-[rgb(255,100,255)]">짙편린</span>)
        } else if (n.includes("심연의")) {
            // return (<span className="text-emerald-400">편린</span>)
            return (<span className="text-[rgb(179,107,255)]">편린</span>)
        } else if (!n.includes("심연의")) {
            return (<span className="text-yellow-400">하급</span>)
        } else {
            return (<span className="text-red-500">없음</span>)
        }
    } else if (s?.slotName?.includes("상의 아바타") || s?.slotName?.includes("하의 아바타")) {
        return checkReinforceSkillAvatar(s, jN, result)
    } else if (s?.slotName?.includes("크리쳐")) {
        return checkReinforceSkill(s, jN, result)
    } else if(s === null){
        return (<span className="text-red-500">없음</span>)
    }
}

// 스위칭 장비의 칭호, 크리쳐에서 마부, 옵션을 통해 버프 일치하는지 확인
function checkReinforceSkill(c, jobName, result) {

    let value = 0
    let found = false

    if (c?.reinforceSkill?.reinforce) {
        if (c?.reinforceSkill?.reinforce?.levelRange) {
            const min = c.reinforceSkill.reinforce.levelRange[0].minLevel
            const max = c.reinforceSkill.reinforce.levelRange[0].maxLevel
            value = c.reinforceSkill.reinforce.levelRange[0].value
            // console.log(result.level, min, max)
            if (result.level >= min && result.level <= max) {
                return (<span className="text-emerald-400">{result.name} +{value}</span>)
            } else {
                return (<span className="text-red-500">없음</span>)
            }
        } else if (c?.reinforceSkill?.reinforce?.skills) {
            for (const skill of c?.reinforceSkill?.reinforce?.skills) {
                if (skill.name === result.name) {
                    found = true
                    value = skill.value
                }
            }
            if (found && value === 3) {
                return (<span className="text-emerald-400">{result.name} +{value}</span>)
            } else if (found && value < 3) {
                return (<span className="text-sky-400">{result.name} +{value}</span>)
            } else {
                return (<span className="text-red-500">없음</span>)
            }
        }
    } else if (c?.enchant?.reinforceSkill) {
        let found = false

        for (const item of c?.enchant?.reinforceSkill) {
            // console.log(item)
            if (jobName === item.jobName && Array.isArray(item.skills)) {
                for (const skill of item.skills) {
                    if (skill.name === result.name) {
                        found = true
                        value = skill.value
                    }
                }
            }
        }
        if (found) {
            return (<span className="text-emerald-400">{result.name} +{value}</span>)
        } else {
            return (<span className="text-red-500">없음</span>)
        }
    }
}

// 칭호용
function checkReinforceSkillTitle(c, jobName, result) {

    let value = 0
    let found = false

    if (c?.reinforceSkill?.reinforce) {
        if (c?.reinforceSkill?.reinforce?.levelRange) {
            const min = c.reinforceSkill.reinforce.levelRange[0].minLevel
            const max = c.reinforceSkill.reinforce.levelRange[0].maxLevel
            value = c.reinforceSkill.reinforce.levelRange[0].value
            console.log(result.level, min, max)
            if (result.level >= min && result.level <= max) {
                found = true
            }
        } else if (c?.reinforceSkill?.reinforce?.skills) {
            for (const skill of c.reinforceSkill.reinforce.skills) {
                if (skill.name === result.name) {
                    found = true
                    value += skill.value
                }
            }
        }
    }

    if (c?.enchant?.reinforceSkill) {
        for (const item of c.enchant.reinforceSkill) {
            console.log(jobName)
            if (jobName === item.jobName && Array.isArray(item.skills)) {
                for (const skill of item.skills) {
                    console.log(skill.name , result.name)
                    if (skill.name === result.name) {
                        found = true
                        value += skill.value
                    }
                }
            }
        }
    }

    if (found) {
        if (value === 3) {
            return (<span className="text-emerald-400">{result.name} +{value}</span>)
        } else if (value < 3) {
            return (<span className="text-sky-400">{result.name} +{value}</span>)
        }
    }
    
    return (<span className="text-red-500">없음</span>)
}

// 아바타에서 스킬강화 체크
function checkReinforceSkillAvatar(c, jobName, result) {
    let value = 0

    if (c.slotName === "상의 아바타") {
        if (c?.optionAbility?.includes(result.name)) {
            value =+ 1
            // console.log(value)
        }
    }
    if (c?.emblems[0]?.itemName.includes(result.name) && c.emblems[0]?.itemRarity.includes("레전더리")) {
        value += 1
        // console.log(value)
    }

    if (value > 0) {
        return (<span className="text-emerald-400">{result.name} +{value}</span>)
    } else {
        return (<span className="text-red-500">없음</span>)
    }
}