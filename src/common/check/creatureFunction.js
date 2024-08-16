export function checkCreature(creature) {
    const checkCreatureList = [];
    const artifactSlot = ['레드', '블루', '그린'];
    const artifactSet = new Set(artifactSlot);
    const checkArtifactRank = { unique: [], rare: [], uncommon: [] }

    // 크리쳐 탐색 + 수준 확인
    if (!creature?.creature) {
        checkCreatureList.push({ lvl: 1, msg: '크리쳐가 존재하지 않습니다.' })
    } else {
        if (creature?.creature?.rank === 1) {
            checkCreatureList.push({ lvl: 4, msg: `종결 크리쳐를 보유하고 있습니다.` })
        } else if (creature?.creature?.rank === 2) {
            checkCreatureList.push({ lvl: 3, msg: `준종결 크리쳐를 보유하고 있습니다.` })
        } else if (creature?.creature?.rank >= 3) {
            checkCreatureList.push({ lvl: 2, msg: `하급 크리쳐를 보유하고 있습니다.` })
        }
    }

    const artifacts = creature?.creature?.artifact
    // 아티팩트 탐색
    if (artifacts && artifacts.length > 0) {
        for (const arti of artifacts) {
            artifactSet.delete(transArtifactColors(arti.slotColor))

            if (arti.itemRarity === '유니크') {
                checkArtifactRank.unique.push(arti.slotColor)
            } else if (arti.itemRarity === '레어') {
                checkArtifactRank.rare.push(arti.slotColor)
            } else if (arti.itemRarity === '언커먼') {
                checkArtifactRank.uncommon.push(arti.slotColor)
            }
        }
    }

    // 아티팩트 누락 확인
    const missingArtifact = Array.from(artifactSet);
    if (missingArtifact?.length > 0) {
        const missingArtifactStr = missingArtifact.join(', ');
        checkCreatureList.push({ lvl: 1, msg: `누락된 아티팩트가 있습니다: ${missingArtifactStr}` })
    }

    // 아티팩트 수준 확인
    if (checkArtifactRank.unique.length >= 3) {
        checkCreatureList.push({ lvl: 4, msg: `모든 아티팩트가 유니크 등급입니다.` })
    } else if (checkArtifactRank.rare.length >= 3) {
        checkCreatureList.push({ lvl: 3, msg: `모든 아티팩트가 레어 등급입니다.` })
    } else if (checkArtifactRank.uncommon.length >= 3) {
        checkCreatureList.push({ lvl: 2, msg: `모든 아티팩트가 언커먼 등급입니다.` })

    }


    console.log('creature: ', checkCreatureList)

    checkCreatureList.push(checkArtifactRank);
    return checkCreatureList;
}

function transArtifactColors(c) {
    switch (c) {
        case "RED": return "레드";
        case "BLUE": return "블루";
        case "GREEN": return "그린";
    }
}