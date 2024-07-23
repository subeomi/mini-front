export function checkEquip(equip) {
    const checkEquipList = [];
    const equipSlot = ["무기", "칭호", "상의", "하의", "머리어깨", "신발", "벨트", "팔찌", "목걸이", "반지", "보조장비", "마법석", "귀걸이"];
    const equipSet = new Set(equipSlot);
    const missingEnchantSet = new Set();
    const checkEnchantRank = {r1:[], r2:[], r3:[]}

    // 장비 탐색
    if (equip?.equipment?.length > 0) {
        for (const item of equip.equipment) {
            console.log(item)
            equipSet.delete(item.slotName)


            // 마법부여 체크 (누락)
            if (!item.enchant) {
                missingEnchantSet.add(item.slotName)
            }
            // 마법부여 체크 (인챈트랭크, 칭호제외)
            if(item.slotName !== '칭호'){
                if(item.enchantRank === 1){
                    checkEnchantRank.r1.push(item.slotName)
                } else if(item.enchantRank === 2){
                    checkEnchantRank.r2.push(item.slotName)
                } else if(item.enchantRank >= 3){
                    checkEnchantRank.r3.push(item.slotName)
                }
            }
        }
    }

    // 장비 누락 확인
    const missingEquipment = Array.from(equipSet);
    if (missingEquipment?.length > 0) {
        // join은 배열 내 요소들을 연결하여 하나의 문자열로 만듦. 매개변수는 요소의 구분자
        const missingEquipmentStr = missingEquipment.join(', ');
        checkEquipList.push({ lvl: 1, msg: `누락된 장비가 있습니다: ${missingEquipmentStr}` })
    }

    // 마법부여 누락 확인
    const missingEnchant = Array.from(missingEnchantSet)
    if (missingEnchant?.length > 0) {
        const missingEnchantStr = missingEnchant.join(', ');
        checkEquipList.push({ lvl: 1, msg: `누락된 마법부여가 있습니다: ${missingEnchantStr}` })
    }

    // 마법부여 수준 확인
    if(checkEnchantRank.r1.length === 12){
        checkEquipList.push({lvl:4, msg:'모든 장비에 종결 마법부여가 적용되어 있습니다.'})
    } else if(checkEnchantRank.r2.length === 12){
        checkEquipList.push({lvl:3, msg:'모든 장비에 준종결 마법부여가 적용되어 있습니다.'})
    } else if(checkEnchantRank.r3.length === 12){
        checkEquipList.push({lvl:2, msg:'모든 장비에 하급 마법부여가 적용되어 있습니다.'})
    } else if(checkEnchantRank.r3.length === 0 && checkEnchantRank.r2.length === 0 && checkEnchantRank.r1.length === 0){
        checkEquipList.push({lvl:1, msg:'모든 장비에 마법부여가 누락됐거나, 지난 시즌 마법부여가 적용되어 있습니다.'})
    }

    console.log(checkEquipList)
    console.log(checkEnchantRank)
}