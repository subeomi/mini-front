export function checkCreature(creature) {
    const checkCreatureList = [];
    const artifactSlot = ['레드', '그린', '블루'];
    const artifactSet = new Set(artifactSlot);
    const checkArtifactRank = {r1:[], r2:[], r3:[]}

    // 크리쳐 탐색 + 수준 확인
    if (!creature?.creature) {
        checkCreatureList.push({ lvl: 1, msg: '크리쳐가 존재하지 않습니다.' })
    } else {
        if(creature?.creature?.rank === 1){
            checkCreatureList.push({ lvl: 4, msg: `종결 크리쳐를 보유하고 있습니다.` })
        } else if(creature?.creature?.rank === 2){
            checkCreatureList.push({ lvl: 3, msg: `준종결 크리쳐를 보유하고 있습니다.` })
        } else if(creature?.creature?.rank >= 3){
            checkCreatureList.push({ lvl: 2, msg: `하급 크리쳐를 보유하고 있습니다.` })
        }
    }

    // 아티팩트 탐색
    if (creature?.creature?.artifact.length === 0) {
        checkCreatureList.push({ lvl: 1, msg: '누락된 아티팩트가 있습니다: 레드, 블루, 그린' })
    } else {
        for (const arti of creature?.creature?.artifact) {
            artifactSet.delete(transArtifactColors(arti.slotColor))

            if(arti.rank === 1){
                checkArtifactRank.r1.push(arti.slotColor)
            } else if(arti.rank === 2){
                checkArtifactRank.r2.push(arti.slotColor)
            } else if(arti.rank >= 3){
                checkArtifactRank.r3.push(arti.slotColor)
            }
        }
    }

    // 아티팩트 누락 확인
    const missingArtifactment = Array.from(artifactSet);
    if (missingArtifactment?.length > 0) {
        const missingArtifactmentStr = missingArtifactment.join(', ');
        checkCreatureList.push({ lvl: 1, msg: `누락된 아티팩트가 있습니다: ${missingArtifactmentStr}` })
    }

    checkCreatureList.push(checkArtifactRank)

    console.log(checkCreatureList)
}

function transArtifactColors(c) {
    switch (c) {
        case "RED": return "레드";
        case "BLUE": return "블루";
        case "GREEN": return "그린";
    }
}