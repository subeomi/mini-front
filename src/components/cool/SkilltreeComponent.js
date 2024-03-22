import { bagicSkills, skillGrid } from "../../common/skill/skilltreeInfo";
import skillImage from "../../common/skillImages";

const SkilltreeComponent = ({ skills, jobSkill, jobName }) => {

    console.log('스킬트리: ', skills)

    // console.log('test: ', skillGrid['백스텝'].icon)

    const lvl = (name) => {
        const activeSkill = skills.active.find(skill => skill.name === name);
        const passiveSkill = skills.passive.find(skill => skill.name === name);

        if (activeSkill) {
            return activeSkill.level;
        } else if (passiveSkill) {
            return passiveSkill.level;
        } else {
            return 0;
        }
    }

    console.log('jobskill: ', jobSkill)
    console.log('???: ', skillGrid['眞 웨펀마스터']['귀참'])

    return (
        <div className="text-white flex justify-center">
            <div className="flex flex-col">
                <div className="pb-2">
                    <span className="font-bold">
                        스킬트리
                    </span>
                </div>
                <div className="relative grid grid-cols-[repeat(14,1fr)] grid-rows-[repeat(17,1fr)] place-items-center mb-20">
                    <div style={{ gridArea: 1 / 1 }} className="text-[11px] flex justify-center items-center">
                        <span>
                            공용
                            <br />
                            스킬
                        </span>
                    </div>
                    <div style={{ gridArea: 2 / 1 }} className="text-[11px] flex justify-center items-center">
                        <span>
                            1
                        </span>
                    </div>
                    <div style={{ gridArea: 4 / 1 }} className="text-[11px] flex justify-center items-center">
                        <span>
                            10
                        </span>
                    </div>
                    <div style={{ gridArea: 6 / 1 }} className="text-[11px] flex justify-center items-center">
                        <span>
                            20
                        </span>
                    </div>
                    <div style={{ gridArea: 8 / 1 }} className="text-[11px] flex justify-center items-center">
                        <span>
                            30
                        </span>
                    </div>
                    <div style={{ gridArea: 10 / 1 }} className="text-[11px] flex justify-center items-center">
                        <span>
                            40
                        </span>
                    </div>
                    <div style={{ gridArea: 12 / 1 }} className="text-[11px] flex justify-center items-center">
                        <span>
                            50
                        </span>
                    </div>
                    <div style={{ gridArea: 13 / 1 }} className="text-[11px] flex justify-center items-center">
                        <span>
                            60
                        </span>
                    </div>
                    <div style={{ gridArea: 14 / 1 }} className="text-[11px] flex justify-center items-center">
                        <span>
                            70
                        </span>
                    </div>
                    <div style={{ gridArea: 15 / 1 }} className="text-[11px] flex justify-center items-center">
                        <span>
                            80
                        </span>
                    </div>
                    <div style={{ gridArea: 16 / 1 }} className="text-[11px] flex justify-center items-center">
                        <span>
                            90
                        </span>
                    </div>
                    <div style={{ gridArea: 17 / 1 }} className="text-[11px] flex justify-center items-center">
                        <span>
                            100
                        </span>
                    </div>
                    {/* 공용 스킬 */}
                    {bagicSkills.map((item, idx) => (
                        <div key={idx} style={{ gridArea: skillGrid['공용 스킬'][item] }} className="text-[10px] p-[1px]">
                            <img
                                src={skillImage[item]}
                                className={`${lvl(item) === 0 ? 'filter grayscale' : ''} `}
                            />
                            <span className="flex justify-center">
                                {/* {skillGrid[item.name]?.name || ''} */}
                                Lv{lvl(item)}
                            </span>

                        </div>
                    ))}

                    {/* 일반 스킬 */}
                    {jobSkill?.filter(item => !bagicSkills.includes(item.name))
                        .filter(item => item.costType !== 'TP')
                        .filter(item => !(item.name === "내딛는 한걸음" || item.name === "찰나의 깨달음" || item.name === "각성의 실마리"))
                        .map((item, idx) => (
                            <div key={idx} style={{ gridArea: skillGrid[jobName][item.name] }} className="text-[10px] p-[1px]">
                                <img src={skillImage[item.name]}
                                    className={`${lvl(item.name) === 0 ? 'filter grayscale' : ''} `}
                                />
                                <span className="flex justify-center">
                                    {/* {skillGrid[item.name]?.name || ''} */}
                                    Lv{item.level || 0}
                                    {/* {skillGrid[jobName][item.name]} */}
                                </span>
                            </div>
                        ))}
                    {/* TP */}
                </div>
                <span className="font-bold pb-2">
                    TP
                </span>
                <div className="relative grid grid-cols-[repeat(14,1fr)] grid-rows-[repeat(5,1fr)] place-items-center mb-20">
                    <div style={{ gridArea: 1 / 1 }} className="text-[11px] flex justify-center items-center">
                        <span>
                            TP
                        </span>
                    </div>
                    {jobSkill?.filter(item => !bagicSkills.includes(item.name))
                        .filter(item => item.costType === 'TP')
                        .map((item, idx) => (
                            <div key={idx} style={{ gridArea: skillGrid[jobName][item.name] }} className="text-[10px] p-[1px]">
                                <img src={skillImage[item.name]}
                                    className={`${lvl(item.name) === 0 ? 'filter grayscale' : ''} `}
                                />
                                <span className="flex justify-center">
                                    {/* {skillGrid[item.name]?.name || ''} */}
                                    Lv{item.level || 0}
                                    {/* {skillGrid[jobName][item.name]} */}
                                </span>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}

export default SkilltreeComponent;