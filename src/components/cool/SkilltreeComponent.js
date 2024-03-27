import { useState } from "react";
import { getJob } from "../../common/globalFunction";
import { basicSkills, skillGrid } from "../../common/skill/skilltreeInfo";
import skillImage from "../../common/skillImages";

const SkilltreeComponent = ({ skills, jobSkill, jobName, jobGrowName, jobId }) => {

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

    const renderGridCell = (rowStart, colStart, colEnd, content, index) => (
        <div
            style={{ gridArea: `${rowStart} / ${colStart} / span 1 / span ${colEnd - colStart + 1}` }}
            key={index}
            className={`flex justify-center items-center text-[12px] p-[1px] w-full h-full ${rowStart % 2 === 0 && 'bg-cat3'}`}
        >
            {content}
        </div>
    );

    const myJob = getJob(jobName, jobGrowName);
    const jobRow = () => {
        switch (myJob) {
            case '다크나이트(자각2)': return 13;
            case '크리에이터(자각2)': return 6;
            default: return 17;
        }
    }

    console.log('jobskill: ', jobSkill)
    console.log('jobId: ', jobId)
    console.log('jobName: ', jobName)

    return (
        <div className="text-white flex justify-center">
            <div className="flex flex-col w-[576px] p-2">
                <div className="pb-2">
                    <span className="font-bold">
                        스킬트리
                    </span>
                </div>
                <div
                    className={`relative grid grid-cols-[repeat(12,48px)]
                place-items-center mb-20 mx-auto w-full 
                ${myJob === '다크나이트(자각2)'
                            ? 'grid-rows-[repeat(13,48px)]' :
                            myJob === '크리에이터(자각2)' ? 'grid-rows-[repeat(6,48px)]' : 'grid-rows-[repeat(17,48px)]'}`}
                >
                    {Array.from({ length: jobRow() * 12 }, (_, i) => i + 1).map(index => {
                        const row = Math.ceil(index / 12);
                        const col = index % 12 || 12;
                        return renderGridCell(row, col, col, <div className="" />, index);
                    })}

                    {renderGridCell(1, 1, 1, <span>공용<br />스킬</span>)}
                    {myJob !== '다크나이트(자각2)' && myJob !== '크리에이터(자각2)' && (
                        <>
                            {renderGridCell(2, 1, 1, <span>1</span>)}
                            {renderGridCell(4, 1, 1, <span>10</span>)}
                            {renderGridCell(6, 1, 1, <span>20</span>)}
                            {renderGridCell(8, 1, 1, <span>30</span>)}
                            {renderGridCell(10, 1, 1, <span>40</span>)}
                            {renderGridCell(12, 1, 1, <span>50</span>)}
                            {renderGridCell(13, 1, 1, <span>60</span>)}
                            {renderGridCell(14, 1, 1, <span>70</span>)}
                            {renderGridCell(15, 1, 1, <span>80</span>)}
                            {renderGridCell(16, 1, 1, <span>90</span>)}
                            {renderGridCell(17, 1, 1, <span>100</span>)}
                        </>
                    )}

                    {/* 공용 스킬 */}
                    {basicSkills.map((item, idx) => (
                        <div key={idx} style={{ gridArea: skillGrid['공용 스킬'][item] }} className="text-[10px] p-[1px]">
                            <img
                                src={skillImage[item]}
                                className={`${lvl(item) === 0 ? 'filter grayscale' : ''} `}
                            />
                            <span className="flex justify-center">
                                {/* {skillGrid[item.name]?.name || ''} */}
                                Lv {lvl(item)}
                            </span>

                        </div>
                    ))}

                    {/* 일반 스킬 */}
                    {jobSkill?.filter(item => !basicSkills.includes(item.name))
                        .filter(item => item.costType !== 'TP')
                        .filter(item => !(item.name === "내딛는 한걸음" || item.name === "찰나의 깨달음" || item.name === "각성의 실마리" || item.name === "자각의 실마리"))
                        .map((item, idx) => (
                            <div
                                key={idx}
                                style={{ gridArea: skillGrid[myJob]?.[item.name] }}
                                className={`text-[10px] p-[1px]`}
                            >
                                <img src={skillImage[item.name]}
                                    className={`${lvl(item.name) === 0 ? 'filter grayscale' : ''} `}
                                    style={{
                                        filter: item.name === '방어구 마스터리' || item.name === '배틀메이지의 무기 마스터리' || item.name === '실전형 위상변화'
                                            ? 'grayscale(100%) invert(3%) sepia(17%) saturate(961%) hue-rotate(65deg) brightness(103%) contrast(105%)'
                                            : ''
                                    }}
                                />
                                <span className="flex justify-center">
                                    Lv {item.level || 0}
                                </span>
                            </div>
                        ))}

                </div>
                {/* TP */}
                <span className="font-bold pb-2">
                    TP
                </span>
                <div className="relative grid grid-cols-[repeat(12,48px)] grid-rows-[repeat(5,48px)] place-items-center mb-20 p-2">
                    {Array.from({ length: 5 * 12 }, (_, i) => i + 1).map(index => {
                        const row = Math.ceil(index / 12);
                        const col = index % 12 || 12;
                        return renderGridCell(row, col, col, <div className="" />, index);
                    })}
                    {renderGridCell(1, 1, 1, <span>TP</span>)}
                    {jobSkill?.filter(item => !basicSkills.includes(item.name))
                        .filter(item => item.costType === 'TP')
                        .map((item, idx) => (
                            <div key={idx} style={{ gridArea: skillGrid[myJob]?.[item.name] }} className="text-[10px] p-[1px]">
                                <img
                                    src={skillImage[item.name.replace(' 강화', '')]}
                                    style={{
                                        filter: lvl(item.name) === 0
                                            ? 'grayscale(100%)'
                                            : 'grayscale(100%) invert(3%) sepia(17%) saturate(961%) hue-rotate(65deg) brightness(103%) contrast(105%)'
                                    }}
                                    className={`${lvl(item.name) === 0 ? 'filter grayscale' : ''}`}
                                />
                                <span className="flex justify-center">
                                    Lv {item.level || 0}
                                </span>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}

export default SkilltreeComponent;