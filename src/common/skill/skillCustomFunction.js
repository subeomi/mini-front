

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

export function handleTargetCoolTime(name, list, skillObj, skills) {

    const obj = skillObj[name];
    const org = skills[name];

    const inc = org.cal.increase.filter((_, index) => !list[name]?.inc?.includes(index));
    const rec = org.cal.recovery.filter((_, index) => !list[name]?.rec?.includes(index));
    const red = org.cal.reduce.filter((_, index) => !list[name]?.red?.includes(index));

    console.log(inc, rec, red)

    obj.cal.increase = inc
    obj.cal.recovery = rec
    obj.cal.reduce = red

    obj.cal = calSkillCustomCT(obj.cal);
    obj.skillCoolTime = parseFloat((new Function('return ' + obj.cal.calMath)() * obj.defaultCoolTime).toFixed(2));
    if (obj.skillCoolTime < obj.defaultCoolTime * 0.3) {
        obj.skillCoolTime = obj.defaultCoolTime * 0.3
    }

    return skillObj
}
