import { bagicSkills, skillGrid } from "../../common/skill/skilltreeInfo";

const SkilltreeComponent = ({ skills }) => {

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

    return (
        <div className="h-screen text-white flex justify-center">
            <div className="relative grid grid-cols-[repeat(14,1fr)] grid-rows-[repeat(16,1fr)] place-items-center">
                <div style={{ gridArea: 1 / 1 }} className="text-[11px] flex justify-center items-center">
                    <span>
                        공용
                        <br />
                        스킬
                    </span>
                </div>
                {/* 공용 스킬 */}
                {bagicSkills.map((item, idx) => (
                    <div key={idx} style={{ gridArea: skillGrid[item.name]?.gridArea }} className="text-[10px] p-[1px]">
                        <img
                            src={skillGrid[item]?.icon}
                            className={`
                            ${lvl(item) === 0 ? 'filter grayscale' : ''} `}
                            style={{
                                filter: item === '방어구 마스터리' ? 'opacity(.5) drop-shadow(0 0 0 #d6f77b)' : '',
                            }}
                        />
                        <span className="flex justify-center">
                            {/* {skillGrid[item.name]?.name || ''} */}
                            Lv{lvl(item)}
                        </span>

                    </div>
                ))}
                {/* 액티브 */}
                {skills.active.filter(item => !bagicSkills.includes(item.name)).map((item, idx) => (
                    <div key={idx} style={{ gridArea: skillGrid[item.name]?.gridArea }} className="text-[12px] p-[1px]">
                        <img src={skillGrid[item.name]?.icon} />
                        <span className="flex justify-center">
                            {/* {skillGrid[item.name]?.name || ''} */}
                            Lv{item.level}
                        </span>

                    </div>
                ))}
                {/* 패시브 */}
                {skills.passive.filter(item => !bagicSkills.includes(item.name)).map((item, idx) => (
                    <div key={idx} style={{ gridArea: skillGrid[item.name]?.gridArea }} className="text-[12px] p-[1px]">
                        <img src={skillGrid[item.name]?.icon} />
                        <span className="flex justify-center">
                            {/* {skillGrid[item.name]?.name || ''} */}
                            Lv{item.level}
                        </span>

                    </div>
                ))}
            </div>
        </div>
    );
}

export default SkilltreeComponent;