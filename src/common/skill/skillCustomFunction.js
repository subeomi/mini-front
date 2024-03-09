import { skillCastingTime } from "../skillInfo";
import { coolTimeInc, coolTimeRec, coolTimeRed } from "./itemCoolTimeInfo";


export function getTargetIncrease(t, type) {
    if (!t || Object.keys(t).length === 0 || type === null) return false;

    const inc = t[Object.keys(t)[0]].cal.increase;
    const rec = t[Object.keys(t)[0]].cal.recovery;
    const red = t[Object.keys(t)[0]].cal.reduce;
    let result = 1

    switch (type) {
        case "inc": {
            inc.map(item => (result *= (1 + item[3])))
            result = ((result - 1) * 100).toFixed(1).replace(/\.0$/, '');
            return result + '%';
        };
        case "rec": {
            rec.map(item => (result += item[3]))
            result = ((result - 1) * 100).toFixed(1).replace(/\.0$/, '');
            return result + '%';
        };
        case "red": {
            red.map(item => (result *= (1 - item[3])))
            result = ((1 - result) * 100).toFixed(1).replace(/\.0$/, '');
            return result + '%';
        };
    }
}

function calSkillCustomCT(cal) {
    let inc = 1;
    let rec = 1;
    let red = 1;

    if (cal.increase.length > 0) {
        for (const i of cal.increase) {
            inc *= 1 + i[3];
        }
    }
    if (cal.recovery.length > 0) {
        for (const i of cal.recovery) {
            rec += i[3];
        }
    }
    if (cal.reduce.length > 0) {
        for (const i of cal.reduce) {
            red *= 1 - i[3];
        }
    }

    cal.calMath = red + '*' + inc + '/' + rec;

    return cal;
}

// 스킬상세 쿨타임커스텀 적용
export function handleTargetCoolTime(name, list, skillObj, skills) {

    const obj = skillObj[name];

    const inc = obj.cal.increase.filter(incItem => !list[name]?.inc?.some(listItem => JSON.stringify(listItem) === JSON.stringify(incItem)));
    const rec = obj.cal.recovery.filter(recItem => !list[name]?.rec?.some(listItem => JSON.stringify(listItem) === JSON.stringify(recItem)));
    const red = obj.cal.reduce.filter(redItem => !list[name]?.red?.some(listItem => JSON.stringify(listItem) === JSON.stringify(redItem)));

    console.log(inc, rec, red)

    obj.cal.increase = inc
    obj.cal.recovery = rec
    obj.cal.reduce = red

    obj.cal = calSkillCustomCT(obj.cal);
    obj.skillCoolTime = parseFloat((new Function('return ' + obj.cal.calMath)() * obj.defaultCoolTime).toFixed(2));
    if (obj.skillCoolTime < obj.defaultCoolTime * 0.3) {
        obj.skillCoolTime = obj.defaultCoolTime * 0.3
    }

    obj.count = Math.ceil(40 / (obj.skillCoolTime + (skillCastingTime[name] || 0)));

    return skillObj
}

// 스킬상세 추가옵션 추가
export function handleAddElement(name, list, skillObj, type) {

    const obj = skillObj[name];

    if (type === 'inc') {
        obj.cal.increase = [...obj.cal.increase, ...list];
    } else if (type === 'rec') {
        obj.cal.recovery = [...obj.cal.recovery, ...list];
    } else if (type === 'red') {
        obj.cal.reduce = [...obj.cal.reduce, ...list];
    }

    obj.cal = calSkillCustomCT(obj.cal);
    obj.skillCoolTime = parseFloat((new Function('return ' + obj.cal.calMath)() * obj.defaultCoolTime).toFixed(2));
    if (obj.skillCoolTime < obj.defaultCoolTime * 0.3) {
        obj.skillCoolTime = obj.defaultCoolTime * 0.3
    }

    return skillObj
}

// 타겟 스킬레벨과 동일한 쿨증 쿨회 쿨감 가져오기
export function handleMoreCustom(target, type) {
    console.log('type: ', type)
    // type = 'inc' or 'rec' or 'red'
    const result = {
        inc: [],
        rec: [],
        red: []
    };
    const ban = {
        inc: target[Object.keys(target)[0]]?.cal?.increase ?? [],
        rec: target[Object.keys(target)[0]]?.cal?.recovery ?? [],
        red: target[Object.keys(target)[0]]?.cal?.reduce ?? []
    };

    function findMatchingElements(source, targetLevel, bannedItems) {
        return source.filter(item => {
            // bannedItems에 포함되어 있지 않은 경우에만 필터링
            if (Array.isArray(item[2])) {
                return item[2].includes(targetLevel) && !bannedItems.includes(item);
            } else if (typeof item[2] === 'number') {
                return item[2] === targetLevel && !bannedItems.includes(item);
            } else {
                return item[2] === 'all' && !bannedItems.includes(item);
            }
        });
    }

    Object.keys(coolTimeInc).forEach(key => {
        const matchingInc = findMatchingElements(coolTimeInc[key], target.requiredLevel, ban.inc);
        if (matchingInc.length > 0) {
            result.inc.push(...matchingInc);
        }
    });

    Object.keys(coolTimeRec).forEach(key => {
        const matchingRec = findMatchingElements(coolTimeRec[key], target.requiredLevel, ban.rec);
        if (matchingRec.length > 0) {
            result.rec.push(...matchingRec);
        }
    });

    Object.keys(coolTimeRed).forEach(key => {
        const matchingRed = findMatchingElements(coolTimeRed[key], target.requiredLevel, ban.red);
        if (matchingRed.length > 0) {
            result.red.push(...matchingRed);
        }
    });

    // console.log('result: ', result)
    if (type === 'inc') {
        console.log('result: ', result.inc)
        return result.inc;
    } else if (type === 'rec') {
        return result.rec;
    } else if (type === 'red') {
        return result.red;
    }
}