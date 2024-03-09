import { jobInfoMap } from "../charInfo";
import { isBuffInList } from "../globalFunction";
import { skillCastingTime } from "../skillInfo";
import { coolTimeInc, coolTimeIncRunes, coolTimeIncTalisman, coolTimeIncWeapons, coolTimeRec, coolTimeRed, coolTimeRedRunes, coolTimeRedTalisman, coolTimeRedTrait, coolTimeRedWeapons, nomalGearCoolTimeInc, nomalGearCoolTimeRec, nomalGearCoolTimeRed } from "./itemCoolTimeInfo";

// const stackDivisionList = {
//     교감: [
//         // 설명 이름 렙제 쿨회수치 최대스택
//         ['95Lv 스킬 시전 시 95Lv 스킬 쿨타임 회복 속도 +20%', '교감 : 동행하는 대지', 95, 0.2, 2],
//         ['45, 80Lv 스킬 시전 시 해당 레벨대 스킬 쿨타임 회복 속도 +15%', '교감 : 내려앉는 이슬', [45, 80, '바람', '왜곡'], 0.15, 3],
//         ['40, 75Lv 스킬 시전 시 해당 레벨대 스킬 쿨타임 회복 속도 +15%', '교감 : 감싸안는 햇살', [40, 75, '수호', '조율'], 0.15, 3],
//         ['30, 60Lv 스킬 시전 시 해당 레벨대 스킬 쿨타임 회복 속도 +10%', '교감 : 공존하는 생명', [30, 60, '냉기', '소멸'], 0.1, 4],
//         ['35, 70Lv 스킬 시전 시 해당 레벨대 스킬 쿨타임 회복 속도 +10%', '교감 : 보호하는 온기', [35, 70, '방해', '재현'], 0.1, 4]
//     ]
// }

// info를 받음
export function setCharMath(s) {
    console.log(s)
    if (s?.equipment?.equipment) {
        const myJob = s.data?.jobGrowName
        const eArr = [];
        const eRed = [];
        const eRec = [];
        const eInc = [];
        // const eOther = [];

        s.equipment.equipment.map(equip => {

            if (equip.bakalInfo) {
                equip.bakalInfo.options?.map((option, index) => {
                    if ((option.explainDetail.includes('스킬 쿨타임') || option.explainDetail.includes('스킬의 쿨타임'))) {

                        let result = {};

                        if (index === 2) {
                            result = checkCoolTimeOptions(option.explainDetail, "불의 숨결");
                        } else {
                            result = checkCoolTimeOptions(option.explainDetail, "바칼 융합");
                        }

                        if (result) eArr.push(result);
                    }
                })
            }
            if (equip.fixedOption) {
                const result = checkCoolTimeNomalGear(equip.itemName, equip.slotName);

                if (result) {
                    if (result.reduce) {
                        eArr.push({ 'reduce': result.reduce });
                    }
                    if (result.recovery) {
                        eArr.push({ 'recovery': result.recovery });
                    }
                    if (result.increase) {
                        eArr.push({ 'increase': result.increase });
                    }
                }
            }
            if (equip.customOption) {

                equip.customOption.options?.map(option => {
                    if ((option.explainDetail.includes('스킬 쿨타임') || option.explainDetail.includes('스킬의 쿨타임'))) {
                        const result = checkCoolTimeOptions(option.explainDetail, equip.slotName);

                        if (result) eArr.push(result);
                    }
                })
            }
            if (equip.machineRevolutionInfo) {
                const result = checkCoolTimeOptions(equip.machineRevolutionInfo.options[0]?.explainDetail, "융합" + equip.slotName);

                if (result) eArr.push(result);
            } else if (equip.duskyIslandOption) {
                const result = checkCoolTimeOptions(equip.duskyIslandOption.options[0]?.explainDetail, "융합" + equip.slotName);

                if (result) eArr.push(result);
            }
        })

        eArr.map(item => {
            if (item.reduce) eRed.push(item);
            if (item.recovery) eRec.push(item);
            if (item.increase) eInc.push(item);
            // if (item.교감) eOther.push(item);
        });

        const runes = checkCoolTimeRunes(s);
        if (runes) {
            eRed.push(...runes.reduce);
            eInc.push(...runes.increase);
        }

        const talis = checkCoolTimeTalisman(s.talisman);

        if (myJob === "眞 트래블러" && talis?.reduce) {
            for (const tal of talis.reduce) {
                if (tal.reduce[2] === "신무병장 유성") {
                    for (const p of s.skill?.passive) {
                        if (p.name === "오토매틱 무브먼트") {
                            tal.reduce.splice(3, 1, 0.2);
                        }
                    }
                }
            }
        }

        eRed.push(...talis.reduce);
        eInc.push(...talis.increase);

        if (checkJobCoolTime(s) && Array.isArray(checkJobCoolTime(s))) {
            for (const arr of checkJobCoolTime(s)) {
                if (Object.keys(arr).includes('reduce')) {
                    eRed.push(arr);
                } else if (Object.keys(arr).includes('increase')) {
                    eInc.push(arr);
                }
            }
        } else if (checkJobCoolTime(s)) {
            if (Object.keys(checkJobCoolTime(s)).includes('reduce')) {
                eRed.push(checkJobCoolTime(s));
            } else if (Object.keys(checkJobCoolTime(s)).includes('increase')) {
                eInc.push(checkJobCoolTime(s));
            }
        }

        if (findWeaponCoolTime(s)) {
            for (const w in findWeaponCoolTime(s)) {
                if (w === 'reduce') {
                    eRed.push({ 'reduce': findWeaponCoolTime(s)[w] });
                } else if (w === 'increase') {
                    eInc.push({ 'increase': findWeaponCoolTime(s)[w] });
                }
            }
        }

        if (checkTraitCoolTime(s.trait)) {
            eRed.push(...checkTraitCoolTime(s.trait));
        }

        if (checkCommandCoolTime(s?.equipment?.equipment)) {
            eRed.push(...checkCommandCoolTime(s?.equipment?.equipment));
        }

        // 스킬 스택형 체크 + 횟수만 증가
        if (checkStackSkill(s)[0]?.reduce) {
            eRed.push({ reduce: checkStackSkill(s)[0].reduce })
        }

        return {
            'reduce': eRed,
            'recovery': eRec,
            'increase': eInc
        };
    }
}

// info를 받음
export function findCharSkill(s) {
    if (s?.skill?.active?.length > 0) {
        let updateSkills = {};
        const tal = [];
        let swc = false;
        let creator = s?.data?.jobName === '크리에이터' ? true : false;

        // 탈리스만 이름 저장
        if (Array.isArray(s?.talisman?.talismans)) {
            for (const t of s?.talisman?.talismans) {
                tal.push(t.talisman?.itemName);
            }
        }

        // 특수 쿨감
        s?.skill?.passive?.map(p => {
            if (p.name === "알파 서포트" || p.name === "얼리전트" || p.name === "썬더 스트라이크") {
                swc = true;
            }
        })

        // 스택형 탈리스만 {스킬명 : 쿨타임을 나눌 수}
        const stackName = checkStackTalisman(tal);

        s?.skill?.active.map(skill => {
            if (!creator && (skill.requiredLevel === 50 || skill.requiredLevel === 85 || skill.requiredLevel === 100 || skill.requiredLevel <= 15)) { return; }
            if (skill.coolTime > 0 && skill.level > 0 && !isBuffInList(skill.name)) {

                if (skill.name === "분신") {
                    skill.name = '환영폭쇄';
                    skill.coolTime = 10;
                }
                if (swc && skill.name === "FM-92 mk2 랜서") {
                    skill.coolTime *= 0.6
                } else if (swc && skill.name === "교차 사격") {
                    skill.coolTime = 10;
                } else if (swc && skill.name === "썬더 콜링") {
                    skill.coolTime = 20;
                }

                if (typeof skillCastingTime[skill.name] !== 'undefined') {
                    skill.castingTime = skillCastingTime[skill.name];
                }

                if (stackName) {
                    for (const s in stackName) {
                        if (skill.name === s) {
                            // console.log('스택네임', s);
                            updateSkills[skill.name] = {
                                'requiredLevel': skill.requiredLevel,
                                'skillId': skill.skillId,
                                'skillCoolTime': skill.coolTime / stackName[s],
                                'skillLevel': skill.level,
                                'castingTime': skill.castingTime,
                                'consumeValue': skill.consumeValue,
                                'cal': {},
                                'defaultCoolTime': skill.coolTime,
                                'maxCnt': Math.ceil(40 / (skill.coolTime / stackName[s] * 0.3 + (skillCastingTime[skill.name] || 0)))
                            };
                            return;
                        }
                    }
                }

                updateSkills[skill.name] = {
                    'requiredLevel': skill.requiredLevel,
                    'skillId': skill.skillId,
                    'skillCoolTime': skill.coolTime,
                    'skillLevel': skill.level,
                    'castingTime': skill.castingTime,
                    'consumeValue': skill.consumeValue,
                    'cal': {},
                    'defaultCoolTime': skill.coolTime,
                    'maxCnt': Math.ceil(40 / (skill.coolTime * 0.3 + (skillCastingTime[skill.name] || 0)))
                };

                // creator가 true이고 skill에 type 속성이 없을 때만 type 속성을 추가합니다.
                if (creator && skill.type) {
                    updateSkills[skill.name]['type'] = skill.type;
                }
            }
        });

        const coolTimeMath = setCharMath(s);
        const result = calSkillCT(updateSkills, s, coolTimeMath);

        return result;
    }
}

// 비교할 스킬 레벨, 쿨감 적용되는 레벨
const isSkillMatch = (target, condition) => {
    if (typeof condition === 'number') {
        return target === condition;
    } else if (Array.isArray(condition)) {
        return condition.includes(target);
    } else {
        return condition === 'all';
    }
}

// findCharSkill의 updateSkills, info, coolTimeMath
function calSkillCT(k, s, coolTimeMath) {
    if (k) {
        const updateSkills = {}

        for (const skill in k) {
            const skillValue = k[skill];

            const cal = {
                reduce: [],
                recovery: [],
                increase: [],
                calMath: ''
            };

            let calRed = 1;
            let calRec = 1;
            let calInc = 1;
            let count = 0;

            // 스킬 스택형 체크 + 횟수만 증가
            if (checkStackSkill(s)) {
                const stackSkillResult = checkStackSkill(s)
                if (stackSkillResult[0].count[0] === skill) {
                    // console.log(stackSkillResult[0].count,'asddasdasda')
                    count += stackSkillResult[0].count[1];
                }
            }

            for (const red of coolTimeMath['reduce']) {

                // 무큐/비무큐
                if (red.reduce?.length === 5) {
                    if (red.reduce[4] === 0 && skillValue.consumeValue === 0) {

                        calRed *= (1 - red.reduce[3]);
                        cal['reduce'].push(red.reduce);
                    } else if (red.reduce[4] > 0 && red.reduce[4] <= skillValue.consumeValue && red.reduce[2] === 0) {

                        calRed *= (1 - red.reduce[3]);
                        cal['reduce'].push(red.reduce);
                    } else if (red.reduce[4] > 0 && red.reduce[4] <= skillValue.consumeValue && Array.isArray(red.reduce[2]) && red.reduce[2].includes(skillValue.requiredLevel)) {
                        calRed *= (1 - red.reduce[3]);
                        cal['reduce'].push(red.reduce);
                    }

                } else if (red.reduce[1] === "커맨드" && isSummonerNotCommandSkill(skill)) {
                    // 미적용
                } else if (isSkillMatch(skillValue.requiredLevel, red.reduce[2])) {

                    calRed *= (1 - red.reduce[3]);
                    cal['reduce'].push(red.reduce);
                } else if (typeof red.reduce[2] === 'string' && red.reduce[2] !== 'all' && red.reduce[2] === skill) {

                    calRed *= (1 - red.reduce[3]);
                    cal['reduce'].push(red.reduce);
                } else if (Array.isArray(red.reduce[2]) && red.reduce[2].includes(skill)) {

                    calRed *= (1 - red.reduce[3]);
                    cal['reduce'].push(red.reduce);
                }
            }

            for (const rec of coolTimeMath['recovery']) {
                if (isSkillMatch(skillValue.requiredLevel, rec.recovery[2])) {

                    calRec += rec.recovery[3];
                    cal['recovery'].push(rec.recovery);
                }
            }

            for (const inc of coolTimeMath['increase']) {
                if (inc.increase?.length === 5) {
                    if (inc.increase[4] === 0 && skillValue.consumeValue === 0) {

                        calInc *= 1 + inc.increase[3];
                        cal['increase'].push(inc.increase);
                    } else if (inc.increase[4] > 0 && inc.increase[4] <= skillValue.consumeValue) {

                        calInc *= 1 + inc.increase[3];
                        cal['increase'].push(inc.increase);
                    }
                } else if (isSkillMatch(skillValue.requiredLevel, inc.increase[2])) {

                    calInc *= 1 + inc.increase[3];
                    cal['increase'].push(inc.increase);
                } else if (typeof inc.increase[2] === 'string' && inc.increase[2] !== 'all' && inc.increase[2] === skill) {
                    calInc *= 1 + inc.increase[3];
                    cal['increase'].push(inc.increase);
                } else if (Array.isArray(inc.increase[2]) && inc.increase[2].includes(skill)) {

                    calInc *= 1 + inc.increase[3];
                    cal['increase'].push(inc.increase);
                }
            }

            let calMath = ((calRed * calInc) / calRec);
            cal['calMath'] = calRed + '*' + calInc + '/' + calRec;

            if (1 - calMath >= 0.7 && skill !== 'FM-92 mk2 랜서') {
                calMath = 0.3
            }

            // 소숫점 2자리에서 반올림
            let result = parseFloat((k[skill].skillCoolTime * calMath).toFixed(2));

            // if (coolTimeMath['other'] &&
            //     coolTimeMath['other'].some(item => {
            //         const type = typeof item.교감[2];
            //         if (type === 'number') {
            //             return item.교감[2] === skillValue.requiredLevel;
            //         } else if (type === 'string' || Array.isArray(item.교감[2])) {
            //             return item.교감[2].includes(skillValue.type);
            //         }
            //         return false;
            //     })
            // ) {
            //     const z = calOtherMath(coolTimeMath['other'], k[skill].skillCoolTime, skillValue.requiredLevel, calRed, calInc, calRec, skillValue.type);
            //     result = parseFloat(z[0].toFixed(2));
            //     cal['other'].push(z[1].교감);
            // }

            if (skill === 'AT-SO Walker') {
                result = 30;
            }

            const tal = [];

            // 탈리스만 이름 저장
            if (Array.isArray(s.talisman?.talismans)) {
                for (const t of s.talisman?.talismans) {
                    tal.push(t.talisman?.itemName);
                }
            }

            count += Math.ceil(40 / (result + skillValue.castingTime));

            // 스택형 탈리스만 {스킬명 : 쿨타임을 나눌 수}
            const stackName = checkStackTalisman(tal);
            for (const s in stackName) {
                if (s === skill) {
                    count += (stackName[s] - 1);
                }
            }

            updateSkills[skill] = { ...k[skill], skillCoolTime: result, count: count, cal: cal };
        }

        updateSkills['math'] = coolTimeMath;

        // state skills
        return updateSkills;
    }
}



// 장비 옵션 체크(커스텀, 융합)
export function checkCoolTimeOptions(tooltip, t) {

    if (t) {
        const redData = coolTimeRed[t];
        const recData = coolTimeRec[t];
        const incData = coolTimeInc[t];
        const result = {};

        if (redData) {
            for (const option of redData) {
                const optTooltip = option[0].split('<br>');

                // 각 배열 요소에 대해 every 메서드를 사용하여 비교
                const isMatch = optTooltip.every(part => tooltip.includes(part));
                if (isMatch) {
                    result['reduce'] = option;
                }
            }
        }

        if (recData) {
            for (const option of recData) {
                const optTooltip = option[0].split('<br>');

                // 각 배열 요소에 대해 every 메서드를 사용하여 비교
                const isMatch = optTooltip.every(part => tooltip.includes(part));
                if (isMatch) {
                    result['recovery'] = option;
                }
            }
        }

        if (incData) {
            for (const option of incData) {
                const optTooltip = option[0].split('<br>');

                // 각 배열 요소에 대해 every 메서드를 사용하여 비교
                const isMatch = optTooltip.every(part => tooltip.includes(part));
                if (isMatch) {
                    result['increase'] = option;
                }
            }
        }

        // for (const item of stackDivisionList['교감']) {
        //     if (tooltip.includes(item[0])) {
        //         result['교감'] = item;
        //     }
        // }


        return result;
    }

    return false;
}

// 고정픽 옵션 체크
export function checkCoolTimeNomalGear(name, t) {

    if (t) {
        const redData = nomalGearCoolTimeRed[t];
        const recData = nomalGearCoolTimeRec[t];
        const incData = nomalGearCoolTimeInc[t];
        const result = {};

        if (redData) {
            for (const item of redData) {
                const itemName = item[1];

                const isMatch = name.includes(itemName);
                if (isMatch) {
                    result['reduce'] = item;
                }
            }
        }

        if (recData) {
            for (const item of recData) {
                const itemName = item[1];

                const isMatch = name.includes(itemName);
                if (isMatch) {
                    result['recovery'] = item;
                }
            }
        }

        if (incData) {
            for (const item of incData) {
                const itemName = item[1];

                const isMatch = name.includes(itemName);
                if (isMatch) {
                    result['increase'] = item;
                }
            }
        }

        if (Object.keys(result).length === 0) {
            return false;
        } else {
            return result;
        }
    }

    return false;
}

// info에서 룬 체크
export function checkCoolTimeRunes(i) {

    const skills = i.skill?.active;
    const tals = i.talisman?.talismans;
    const result = { reduce: [], increase: [] };

    // console.log('배열인가?', Array.isArray(tals));

    if (Array.isArray(tals)) {
        for (const tal of tals) {

            if (Array.isArray(tal.runes)) {
                // for (const rune of tal.runes) {
                tal.runes.forEach((rune, index) => {
                    let skillLv = 0;
                    let skillName = '';

                    for (const skill of skills) {
                        if (rune.itemName.includes('[' + skill.name + ']')) {
                            skillLv = skill.requiredLevel;
                            skillName = skill.name;
                            break;
                        }
                    }

                    for (const type in coolTimeRedRunes) {
                        if (rune.itemName.includes(type)) {
                            let arr = coolTimeRedRunes[type];
                            arr.splice(2, 1, skillName);
                            arr.splice(0, 1, arr[0].concat("I"));
                            result.reduce[result.reduce.length] = { 'reduce': [...arr] };
                            break;
                        }
                    }
                    for (const type in coolTimeIncRunes) {
                        if (rune.itemName.includes(type)) {
                            let arr = coolTimeIncRunes[type];
                            arr.splice(2, 1, skillName);
                            arr.splice(0, 1, arr[0].concat("I"));
                            result.increase[result.increase.length] = { 'increase': [...arr] };
                            break;
                        }
                    }
                })
            }
        }

        return result;
    }
}

const jobCoolTimeMap = {
    '귀검사(남)': {
        '眞 웨펀마스터': (i) => {
            return i.skill?.passive?.map(s => {
                if (s.name === "광검 사용 가능") {
                    return { reduce: ['쿨타임 n*1% 감소', s.name, 'all', s.level * 0.01] }
                }
            }).filter(Boolean);
        },
        // '眞 아수라': (i) => { },
        // '眞 소울브링어': (i) => { },
        '眞 버서커': (i) => {
            return i.skill?.active?.map(s => {
                if (s.name === "프렌지") {
                    return { 'reduce': ['쿨타임 10% 감소', s.name, 'all', 0.1] }
                }
            }).filter(Boolean);
        },
        // '眞 검귀': (i) => { }
    },

    '귀검사(여)': {
        '眞 소드마스터': (i) => {
            return i.skill?.passive?.map(s => {
                if (s.name === "쾌속의 도 마스터리") {
                    if (i.equipment?.equipment[0]?.itemTypeDetail === '도') {
                        return { 'reduce': ['쿨타임 10% 감소', s.name, 'all', 0.1] }
                    }
                }
            }).filter(Boolean);
        },
        // '眞 데몬슬레이어': (i) => { },
        // '眞 다크템플러': (i) => { },
        '眞 베가본드': (i) => {
            return i.skill?.passive?.map(s => {
                if (s.name === "광검 사용 가능") {
                    return { 'reduce': ['쿨타임 10% 감소', s.name, 'all', 0.1] }
                }
            }).filter(Boolean);
        },
        '眞 블레이드': (i) => {
            return i.skill?.passive?.map(s => {
                if (s.name === "인퍼머스") {
                    return { 'reduce': ['쿨타임 10% 감소', s.name, 'all', 0.1] }
                }
            }).filter(Boolean);
        }
    },

    '격투가(여)': {
        // '眞 넨마스터': (i) => { },
        // '眞 스트리트파이터': (i) => { },
        // '眞 그래플러': (i) => { },
        '眞 스트라이커': (i) => {
            return i.skill?.passive?.map(s => {
                if (s.name === "권투글러브 사용 가능") {

                    let lvl = s.level;
                    if (lvl > 10) {
                        lvl = 10
                    }
                    return {
                        'reduce': ['쿨타임 n*1% 감소', s.name, 'all', lvl * 0.01]
                    }
                }
            }).filter(Boolean);
        }
    },

    '격투가(남)': {
        // '眞 넨마스터': (i) => { },
        // '眞 스트리트파이터': (i) => { },
        '眞 그래플러': (i) => {
            return i.skill?.passive?.map(s => {
                if (s.name === "건틀릿 마스터리") {
                    return { 'reduce': ['쿨타임 10% 감소', s.name, 'all', 0.1] }
                }
            }).filter(Boolean);
        },
        '眞 스트라이커': (i) => {
            return i.skill?.passive?.map(s => {
                if (s.name === "권투글러브 사용 가능") {

                    let lvl = s.level;
                    if (lvl > 10) {
                        lvl = 10
                    }
                    return {
                        'reduce': ['쿨타임 n*1% 감소 + 1각 사용 후 30초간 쿨타임 10% 감소', s.name, 'all', 1 - (1 - (lvl * 0.01)) * (1 - 0.15)]
                    }
                }
            }).filter(Boolean);
        }
    },

    '거너(남)': {
        // '眞 레인저': (i) => { },
        '眞 메카닉': (i) => {
            return i.skill?.passive?.map(s => {
                if (s.name === "HS-1 친구들") {
                    return { 'reduce': ['쿨타임 15% 감소', s.name, 'all', 0.15] }
                }
            }).filter(Boolean);
        },
        '眞 런처': (i) => {
            return i.skill?.passive?.map(s => {
                if (s.name === "중화기 마스터리") {

                    let lvl = s.level;
                    if (lvl > 10) {
                        lvl = 10
                    }
                    return {
                        'reduce': ['쿨타임 n*1% 감소', s.name, 'all', lvl * 0.01]
                    }
                }
            }).filter(Boolean);
        },
        '眞 스핏파이어': (i) => {
            return i.skill?.passive?.map(s => {
                if (s.name === "병기 숙련") {
                    return { reduce: ['쿨타임 n*1% 감소', s.name, 'all', s.level * 0.01] }
                }
            }).filter(Boolean);
        },
        '眞 어썰트': (i) => {
            return i.skill?.active?.map(s => {
                if (s.name === "AT-SO Walker") {
                    return { reduce: ['쿨타임 30% 감소', s.name, ['다이렉트 피드백', '맥피스', '네오디뮴 퓨지', '트리플 건샷', '버스트 밤'], 0.3] }
                }
            }).filter(Boolean);
        }
    },

    '거너(여)': {
        // '眞 레인저': (i) => { },
        '眞 메카닉': (i) => {
            return i.skill?.passive?.map(s => {
                if (s.name === "G-오퍼레이터") {
                    return { 'reduce': ['쿨타임 15% 감소', s.name, 'all', 0.15] }
                }
            }).filter(Boolean);
        },
        '眞 런처': (i) => {
            return i.skill?.passive?.map(s => {
                if (s.name === "중화기 마스터리") {

                    let lvl = s.level;
                    if (lvl > 10) {
                        lvl = 10
                    }
                    return {
                        'reduce': ['쿨타임 n*1% 감소', s.name, 'all', lvl * 0.01]
                    }
                }
            }).filter(Boolean);
        },
        '眞 스핏파이어': (i) => {
            return i.skill?.passive?.map(s => {
                if (s.name === "병기 숙련") {
                    return { reduce: ['쿨타임 n*1% 감소', s.name, 'all', s.level * 0.01] }
                }
            }).filter(Boolean);
        }
    },

    '마법사(여)': {
        '眞 엘레멘탈마스터': (i) => {
            const result = [];
            i.skill?.active?.map(s => {
                if (s.name === "쇼타임") {
                    result.push({ reduce: ['쿨타임 n*2.16% 감소', s.name, 'all', s.level * 0.0216] })
                } else if (s.name === "초월의 룬" && result.length === 1) {
                    const r = result[0].reduce[3] * (1 + (s.level * 0.014 + 0.146));
                    result[0].reduce.splice(3, 1, r);
                }
            }).filter(Boolean);
            return result
        },
        '眞 마도학자': (i) => {
            return i.skill?.active?.map(s => {
                if (s.name === "쇼타임") {
                    return {
                        reduce: ['쿨타임 n*2.16% 감소',
                            s.name,
                            ['도발 인형 : 슈르르', '용암지대 생성물약', '성난 불길 가열로', '애시드 클라우드', '메가 드릴', '고출력 매직 미사일', '빗자루 스핀', '플로레 컬라이더', '반중력 기동장치', '플로레 전기토끼', '잭 프로스트 빙수', '잭 오 할로윈', '블랙 망토'],
                            s.level * 0.0216]
                    }
                }
            }).filter(Boolean);
        },
        // '眞 소환사': (i) => { },
        '眞 배틀메이지': (i) => {
            return i.skill?.passive?.map(s => {
                if (s.name === "배틀메이지의 무기 마스터리") {
                    return { 'reduce': ['쿨타임 5% 감소', s.name, 'all', 0.05] }
                }
            }).filter(Boolean);
        },
        // '眞 인챈트리스': (i) => { }
    },

    '마법사(남)': {
        '眞 엘레멘탈 바머': (i) => {
            return i.skill?.passive?.map(s => {
                if (s.name === "원소 폭격") {
                    return { 'reduce': ['쿨타임 20% 감소', s.name, 'all', 0.2] }
                }
            }).filter(Boolean);
        },
        '眞 블러드 메이지': (i) => {
            return i.skill?.passive?.map(s => {
                if (s.name === "블러드") {
                    return { 'reduce': ['쿨타임 10% 감소', s.name, ['블러드 윙', '오퍼링', '쉬카리', '팽', '토먼트', '커럽션', '럼블독', '머로더', '팬텀 베일', '페이탈리티', '블러드 스틴저'], 0.1] }
                }
            }).filter(Boolean);
        },
        // '眞 빙결사': (i) => { },
        // '眞 디멘션워커': (i) => { },
        '眞 스위프트 마스터': (i) => {
            return i.skill?.passive?.map(s => {
                if (s.name === "휘몰아치는 질풍의 봉 마스터리") {
                    return { 'reduce': ['쿨타임 10% 감소', s.name, 'all', 0.1] }
                }
            }).filter(Boolean);
        }
    },

    '프리스트(남)': {
        '眞 크루세이더': (i) => { },
        '眞 퇴마사': (i) => {
            return i.skill?.passive?.map(s => {
                if (s.name === "거병 마스터리") {
                    return { 'reduce': ['쿨타임 10% 감소', s.name, 'all', 0.1] }
                }
            }).filter(Boolean);
        },
        '眞 인파이터': (i) => {
            return i.skill?.active?.map(s => {
                if (s.name === "윌 드라이버") {
                    return { 'reduce': ['쿨타임 10% 감소', s.name, 'all', 0.1] }
                }
            }).filter(Boolean);
        },
        '眞 어벤저': (i) => {
            const result = [];

            i.skill?.active?.map(s => {
                if (s.name === "악마화") {
                    result.push({ 'increase': ['일부 스킬 쿨타임 50~60% 증가', s.name, ['데스 사이드', '복수의 가시'], 0.6] })
                    result.push({ 'increase': ['일부 스킬 쿨타임 50~60% 증가', s.name, '지뢰진', 0.55] })
                    result.push({ 'increase': ['일부 스킬 쿨타임 50~60% 증가', s.name, ['스핀커터', '스피닝 디포메이션'], 0.5] })
                }
            }).filter(Boolean);

            if (result.length > 1) {
                return result;
            } else {
                return false;
            }
        }
    },

    '프리스트(여)': {
        '眞 크루세이더': (i) => { },
        '眞 이단심판관': (i) => {
            return i.skill?.passive?.map(s => {
                if (s.name === "세큐리스 말레피카룸") {
                    return { 'reduce': ['쿨타임 15% 감소', s.name, ['성화', '플레게의 정수'], 0.15] }
                }
                if (s.name === "화형") {
                    return { 'reduce': ['1각 사용 후 30초간 쿨타임 10% 감소', s.name, 'all', 0.075] }
                }
            }).filter(Boolean);
        },
        // '眞 미스트리스': (i) => { },
        // '眞 무녀': (i) => { }
    },

    '도적': {
        // const weapon = i.equipment?.equipment[0]?.itemTypeDetail
        // 단검로그 패시브는 무기수준에서 적용할 예정
        '眞 로그': (i) => {
            return i.skill?.passive?.map(s => {
                const weapon = i.equipment?.equipment[0]?.itemTypeDetail
                if (weapon === '단검') {
                    if (s.name === "단검 마스터리") {
                        return { reduce: ['쿨타임 0.7+0.3n% 감소', s.name, 'all', 0.007 + (s.level * 0.003)] }
                    }
                }
            }).filter(Boolean);
        },
        '眞 쿠노이치': (i) => {
            return i.skill?.passive?.map(s => {
                if (s.name === "인술") {
                    return [{ 'reduce': ['쿨타임 20% 감소', s.name, 'all', 0.2] },
                    { 'reduce': ['쿨타임 32% 감소', s.name, '구옥지화 : 카마이타치', 0.32] }]
                }
            }).filter(Boolean);

        },
        // '眞 섀도우댄서': (i) => { },
        '眞 사령술사': (i) => {
            return i.skill?.passive?.map(s => {
                if (s.name === "완드 마스터리") {
                    return { 'reduce': ['쿨타임 10% 감소', s.name, 'all', 0.1] }
                }
            }).filter(Boolean);
        }
    },

    '나이트': {
        '眞 엘븐나이트': (i) => {
            return i.skill?.passive?.map(s => {
                if (s.name === "강인한 신념") {
                    return { 'reduce': ['쿨타임 10% 감소', s.name, 'all', 0.1] }
                }
            }).filter(Boolean);
        },
        // '眞 카오스': (i) => { },
        // '眞 드래곤나이트': (i) => { },
        '眞 팔라딘': (i) => {
            return i.skill?.passive?.map(s => {
                if (s.name === "세라픽 페더") {
                    return { 'reduce': ['쿨타임 5% 감소', s.name, 'all', 0.05] }
                }
            }).filter(Boolean);
        }
    },

    '마창사': {
        '眞 뱅가드': (i) => {
            return i.skill?.passive?.map(s => {
                if (s.name === "유 다이드") {
                    return { 'reduce': ['1각 사용 후 30초간 쿨타임 10% 감소', s.name, 'all', 0.075] }
                }
            }).filter(Boolean);
        },
        '眞 듀얼리스트': (i) => {
            return i.skill?.passive?.map(s => {
                if (s.name === "장창 숙련") {
                    return { 'reduce': ['쿨타임 13% 감소', s.name, 'all', 0.13] }
                }
            }).filter(Boolean);
        },
        // '眞 다크 랜서': (i) => { },
        '眞 드래고니안 랜서': (i) => {
            return i.skill?.passive?.map(s => {
                if (s.name === "드래곤 슬레이어") {
                    return { 'reduce': ['1각 사용 후 30초간 쿨타임 10% 감소', s.name, 'all', 0.075] }
                }
            }).filter(Boolean);
        }
    },

    '총검사': {
        '眞 요원': (i) => {
            return i.skill?.passive?.map(s => {
                if (s.name === "요인 암살") {
                    return { 'reduce': ['1각 사용 후 30초간 쿨타임 10% 감소', s.name, 'all', 0.075] }
                }
            }).filter(Boolean);
        },
        '眞 트러블 슈터': (i) => { },
        '眞 히트맨': (i) => {
            return i.skill?.passive?.map(s => {
                if (s.name === "장도 마스터리") {
                    return { 'reduce': ['쿨타임 5% 감소', s.name, 'all', 0.05] }
                }
            }).filter(Boolean);
        },
        '眞 스페셜리스트': (i) => { }
    },

    '아처': {
        '眞 뮤즈': (i) => { },
        '眞 트래블러': (i) => {
            return i.skill?.passive?.map(s => {
                if (s.name === "셋 업 : 섬공") {
                    // return { 'reduce': ['쿨타임 10% 감소', s.name, '헤이즈 스톰', 0.1] }
                    return { 'reduce': ['쿨타임 10% 감소', s.name, '셋 업 : 불꽃놀이', 0.1] }
                }
            }).filter(Boolean);
        },
        '眞 헌터': (i) => { },
        '眞 비질란테': (i) => { }
    },

    '다크나이트': {
        '眞 다크나이트': (i) => { }
    },

    '크리에이터': {
        '眞 크리에이터': (i) => { }
    }

}

// 직업별 패시브 자체쿨감
export function checkJobCoolTime(i) {
    const jobName = i.data?.jobName;
    const jobGName = i.data?.jobGrowName;

    const jobLogic = jobCoolTimeMap[jobName];

    // console.log('jobLogic:', jobLogic);
    // console.log('jobGName:', jobGName);
    // console.log('typeof jobLogic[jobGName]:', typeof jobLogic[jobGName]);

    if (jobLogic && typeof jobLogic[jobGName] === 'function') {
        if (Array.isArray(jobLogic[jobGName](i))) {
            // console.log(jobLogic[jobGName](i))
            return jobLogic[jobGName](i);
        }
    }
}

export function findWeaponCoolTime(i) {

    const result = {};

    const jobName = i.data?.jobName;
    const jobGName = i.data?.jobGrowName;
    const weapon = i.equipment?.equipment[0]?.itemTypeDetail

    const jobs = jobInfoMap[jobName];
    let myType = ''
    if (jobGName.includes('眞')) {
        myType = jobs[jobGName][0];
    } else {
        return
    }

    if (jobGName.includes('퇴마사')) {
        if (weapon === '배틀액스') {
            myType = '물리';
        } else if (weapon === '염주') {
            myType = '마법';
        }
    }

    // console.log(jobGName, "직업")

    // coolTimeRedWeapons['물리'] = [
    //     ['쿨타임 -5%', '도', 'all', 0.05],

    for (const red in coolTimeRedWeapons[myType]) {
        const t = coolTimeRedWeapons[myType][red];

        if (t[1] === weapon) {
            result['reduce'] = t;
        }
    }
    for (const inc in coolTimeIncWeapons[myType]) {
        const t = coolTimeIncWeapons[myType][inc];

        if (t[1] === weapon) {
            result['increase'] = t;
        }
    }

    return result;
}

export function checkCommandCoolTime(e) {
    let result = [];
    let foundDouble = false; // 2배가 나왔는지 여부를 기록하는 변수
    let num1 = 0;
    let num2 = 0;
    let num3 = 0;

    e.map(item => {
        item.customOption?.options?.map(o => {
            if (o.explainDetail.includes('커맨드로 스킬 시전 시 해당 스킬 공격력 12% 증가 (각성기 제외)')) {
                if (!foundDouble) {
                    num1 = 1
                    num2 = 1
                    num3 = 1
                }
            } else if (o.explainDetail.includes("스킬 퀵슬롯의 빈 슬롯 1개마다 최종 데미지 2% 증가 (최대 6중첩)")) {
                num3 = 1
            }
            if (o.explainDetail.includes('스킬 커맨드 사용 효과 +100% (각성기 제외)')) {
                foundDouble = true; // 2배가 나왔다고 표시
                num1 = 2
                num2 = 2
                num3 = 2
            }
        })

        if (item.itemName?.includes('하이테크 고기동 강화 부츠')) {
            if (num2 === 0 || num3 === 0) {
                num2 = 1;
                num3 = 1;
            }
            num2 += 4
            num3 += 4
        }
    });

    if (num3 > 0) {
        result.push({ 'reduce': ['스킬 쿨타임 1*n% 감소', '커맨드', [15, 20, 25, 30], 0.01 * num1] });
        result.push({ 'reduce': ['스킬 쿨타임 2*n% 감소', '커맨드', [35, 40, 45, 55, 60, 65, 70], 0.02 * num2] });
        result.push({ 'reduce': ['스킬 쿨타임 5*n% 감소', '커맨드', [50, 75, 80, 85, 90, 95, 100], 0.05 * num3] });
    }

    return result;
}

// 탈리스만 쿨감
export function checkCoolTimeTalisman(t) {
    const tali = t.talismans
    const result = { reduce: [], increase: [] };

    if (Array.isArray(tali)) {
        for (const tal of tali) {
            const talName = tal.talisman?.itemName

            for (const match in coolTimeRedTalisman) {
                if (talName.includes(match)) {
                    result.reduce.push({ 'reduce': coolTimeRedTalisman[match] });
                }
            }
            for (const match in coolTimeIncTalisman) {
                if (talName.includes(match)) {
                    result.increase.push({ 'increase': coolTimeIncTalisman[match] });
                }
            }
        };
    }

    return result;
}

// 탈리스만 스택형 체크
export function checkStackTalisman(a) {
    const init = ['바이퍼 마인', '스커드 익스플로젼', '라이트웨이트', '타이얼러스', '퍼펙트 스핀', '포르티시모', '엑스트라 옵션', '황룡재림', '태풍의 눈'];

    const result = {};

    if (Array.isArray(a)) {
        for (const d of a) {
            for (const item of init) {
                if (d.includes(item)) {
                    for (const match in coolTimeRedTalisman) {
                        if (d.includes(match)) {
                            if (d === '카펠라의 성흔 : 퍼펙트 스핀' || d === "카펠라의 성흔 : 태풍의 눈") {
                                result[coolTimeRedTalisman[match][2]] = 3;
                            } else {
                                result[coolTimeRedTalisman[match][2]] = 2;
                            }
                        }
                    }
                }
            }
        }
        return result;
    }
}

// 장비 특성
export function checkTraitCoolTime(t) {
    const result = [];

    if (t.equipmentTrait?.options && Array.isArray(t.equipmentTrait?.options)) {
        t.equipmentTrait?.options.map(trait => {

            for (const item in coolTimeRedTrait) {
                if (item === trait.name) {
                    if (trait.level === 1) {
                        result.push({ reduce: coolTimeRedTrait[item] });
                    } else if (trait.level === 2) {
                        result.push({ reduce: [...coolTimeRedTrait[item].slice(0, 3), 0.2] });
                    }
                }
            }
        })

        if (result.length > 0) {
            return result;
        } else {
            return false;
        }
    }
}

// 일반 교감
// export function calOtherMath(o, cd, lvl, red, inc, rec, type) {
//     const result = [];
//     let t = ''
//     let num = 0;
//     const max = 40;

//     if (o.length === 0) {
//         return false;
//     }

//     for (const item of o) {
//         if ((Array.isArray(item.교감[2]) && item.교감[2].includes(lvl))
//             || (typeof item.교감[2] === 'number' && item.교감[2] === lvl)
//             || (Array.isArray(item.교감[2]) && item.교감[2].includes(type))
//         ) {

//             const cdz = 1 - ((red * inc) / rec) >= 0.7 ? 0.3 * cd : ((red * inc) / rec) * cd;
//             const cnt = Math.ceil(max / cdz);
//             // console.log('레벨이 맞아요', lvl, item, cdz, cnt)

//             // i < cnt?
//             for (let i = 0; i < item.교감[4] + 1; i++) {
//                 // 40제 라댄 75제 자이언트스윙 인다라망 홀리생츄어리 디플 95제 식신멸진:합 풀바디 창세의 빛 35제 낙뢰부 암월비보 그리드더러커
//                 // num += ((red * inc) / (rec + item.교감[3] * i % (item.교감[4] + 1))) <= 0.3
//                 //     ? 0.3 * cd
//                 //     : ((red * inc) / (rec + item.교감[3] * i % (item.교감[4] + 1))) * cd;

//                 /* 40제 폭검 폭멸장 35제 난화검 FM-92 mk2 랜서 70제 백보신장 75제 심검, G-S.P. 팔콘 연화검무 
//                 30제 쇄패,슈체, 용암지대 생성물약, 애시드 클라우드
//                  */
//                 num += ((red * inc) / (rec + item.교감[3] * i % (item.교감[4] + 1))) * cd

//             }

//             num /= (item.교감[4] + 1);
//             if (num < cd * 0.3) num = cd * 0.3;
//             t = item;
//         }
//     }
//     result.push(num)
//     result.push(t);
//     return result;
// }

// 스킬 스택형 체크, 2스택인데 쿨감은 40%
export function checkStackSkill(i) {
    const ps = i?.skill?.passive
    const as = i?.skill?.active
    const result = [];

    if (ps) {
        for (const p of ps) {
            if (p.name === '알파 서포트') {
                result.push({
                    // reduce: ['쿨타임 40% 감소', '알파 서포트', 'FM-92 mk2 랜서', 0.4],
                    count: ['FM-92 mk2 랜서', 1]
                })
                return result;
            }
        }

        return false
    }
}

// 상하의 압타 스킬렙 체크
export function checkAvatarSkillLvl(i) {
    let avt = [];
    const ps = i?.skill?.passive
    const as = i?.skill?.active
    let result = [];

    if (i?.avatar?.avatar) {
        avt = i?.avatar?.avatar
    } else {
        return false;
    }

    for (const a of avt) {
        if (a.slotId === "JACKET" || a.slotId === "PANTS") {
            for (const pa of ps) {
                if (a.optionAbility.includes(pa.name + ' 스킬Lv +1')) {
                    result.push(pa.name);
                }
            }
            for (const ac of as) {
                if (a.optionAbility.includes(ac.name + ' 스킬Lv +1')) {
                    result.push(ac.name);
                }
            }
            for (const em of a.emblems) {
                if (em.slotColor === '플래티넘' && em.itemRarity === '레전더리' && em.itemName.startsWith("플래티넘 엠블렘[")) {
                    result.push(em.itemName.substring(9, em.itemName.length - 1));
                }
            }
        }
    }

    if (result.length > 0) {
        return result;
    } else {
        return false
    }
}

// 교감, 이클립스 하이브 스킬은 커맨드쿨감 미적용
export function isSummonerNotCommandSkill(name) {
    const init = ['계약소환 : 타우킹 쿠루타', '정령소환 : 정령왕 에체베리아', '정령소환 : 데드 멀커',
        '정령소환 : 플레임 헐크', '정령소환 : 아퀘리스', '계약소환 : 마계화 아우쿠소',
        '정령소환 : 글레어린', '계약소환 : 검은기사 산도르'];

    for (const i of init) {
        if (i === name) return true;
    }

    return false;
}