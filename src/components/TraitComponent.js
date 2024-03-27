import { skillGrid } from "../common/skill/skilltreeInfo";
import skillImage from "../common/skillImages";

const TraitComponent = ({ trait }) => {

    const renderGridCell = (rowStart, colStart, colEnd, content, index) => (
        <div
            style={{ gridArea: `${rowStart} / ${colStart} / span 1 / span ${colEnd - colStart + 1}` }}
            key={index}
            className={`flex justify-center items-center text-[12px] p-[1px] w-full h-full bg-cat3 border-2 border-[rgb(23,27,36)]`}
        >
            {content}
        </div>
    );

    const traitName = trait.category.name;

    const lvl = (name) => {
        const isTrait = trait.options.find(option => option.name === name);

        if (isTrait) {
            return isTrait.level;
        } else {
            return 0;
        }
    }

    console.log('trait: ', trait)
    console.log(skillGrid[trait.category.name])

    return (
        <div className="text-white flex justify-center">
            <div className="p-2">
                <span className="font-bold">
                    보조특성
                </span>
                <div className="p-2 flex">
                    <div className="my-2 flex font-bold items-center">
                        <div className="mr-4">
                            <img src={skillImage[traitName]} className="w-[48px] h-[48px]" />
                        </div>
                    </div>
                    <div className="relative grid grid-cols-[repeat(4,76px)] grid-rows-[repeat(5,76px)] place-items-center">
                        {Array.from({ length: 5 * 4 }, (_, i) => i + 1).map(index => {
                            const row = Math.ceil(index / 4);
                            const col = index % 4 || 4;
                            return renderGridCell(row, col, col, <div className="" />, index);
                        })}
                        {Object.entries(skillGrid[trait.category.name])?.map((item, i) => (
                            <div key={item[1]} style={{ gridArea: `${item[1]}` }}>
                                <img
                                    src={skillImage[traitName + item[1]]}
                                    alt={item[0]}
                                    style={{
                                        filter: lvl(item[0]) === 0
                                            ? 'grayscale(100%)' : ''
                                    }}
                                />
                                <span className="flex justify-center text-[12px]">
                                    Lv {lvl(item[0])}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TraitComponent;