<div>
    {info.equipment.equipment.length > 0 && info.equipment.equipment.map(equip => (

        <div key={equip.itemName}>
            <span className="text-green-700 px-2">{equip.itemName}</span>
            {equip.bakalInfo?.options?.map((option, index) => (
                (option.explainDetail.includes('스킬 쿨타임') || option.explainDetail.includes('스킬의 쿨타임')) && (
                    <div key={equip.itemName + '_' + index}>

                        {
                            checkCoolTimeOptions(option.explainDetail, index === 2 ? "불의 숨결" : "바칼 융합")
                                ? <span className="font-bold">{option.explainDetail}</span>
                                : <span>{option.explainDetail}</span>
                        }

                    </div>
                )))}
            {equip.fixedOption && (
                <div>
                    {
                        checkCoolTimeNomalGear(equip.itemName, equip.slotName)
                            ? <span className="font-bold">{equip.fixedOption.explainDetail}</span>
                            : <></>
                    }
                </div>
            )}
            {equip.customOption?.options?.map(option => (
                (option.explainDetail.includes('스킬 쿨타임') || option.explainDetail.includes('스킬의 쿨타임')) && (
                    <div key={option.explainDetail}>
                        {
                            checkCoolTimeOptions(option.explainDetail, equip.slotName)
                                ? <span className="font-bold">{option.explainDetail}</span>
                                : <span>{option.explainDetail}</span>
                        }
                    </div>
                )))}
            {(equip.machineRevolutionInfo?.options?.[0]?.explainDetail?.includes('스킬 쿨타임') || equip.machineRevolutionInfo?.options?.[0]?.explainDetail?.includes('스킬의 쿨타임')) && (
                <div>
                    {checkCoolTimeOptions(equip.machineRevolutionInfo.options[0].explainDetail, "융합" + equip.slotName)
                        ? <span className="font-bold">{equip.machineRevolutionInfo.options[0].explainDetail}</span>
                        : <span>{equip.machineRevolutionInfo.options[0].explainDetail}</span>
                    }
                </div>
            )}
        </div>
    ))}
</div>