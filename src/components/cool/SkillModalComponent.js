import { useEffect, useState } from "react";
import { handleMoreCustom } from "../../common/skill/skillCustomFunction";
import Tooltip from "../../common/item/ToolTip";

const SkillModalComponent = ({ target, lvl, type, closeModal, addElement }) => {


    const [moreList, setMoerList] = useState([]);
    const [addEle, setAddEle] = useState([]);

    const handleAddEle = (item) => {
        if (addEle.includes(item)) {
            const updatedAddEle = addEle.filter(ele => ele !== item);
            setAddEle(updatedAddEle);
        } else {
            setAddEle(prevAddEle => [...prevAddEle, item]);
        }
    }

    const handleAddButton = () => {
        console.log(Object.keys(target)[0], addEle, type)
        addElement(Object.keys(target)[0], addEle, type);
        closeModal();
    }

    useEffect(() => {
        if (target) {
            const list = handleMoreCustom(target, type);
            setMoerList(list);
            console.log(target, "target")
        }
    }, [target])

    // console.log('moreList', moreList)
    // console.log('addEle', addEle)

    const isType = () => {
        switch (type) {
            case 'inc':
                return <span className="text-[rgb(224,67,67)]">쿨타임 증가 옵션 추가</span>;
            case 'rec':
                return <span className="text-[rgb(147,184,95)]">쿨타임 회복 속도 증가 옵션 추가</span>;
            case 'red':
                return <span className="text-[rgb(90,189,216)]">쿨타임 감소 옵션 추가</span>;
        }
    }

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-sm z-10"
            onClick={closeModal}
        >
            <div className="bg-[rgb(23,27,36)] bg-opacity-90 p-4 shadow-xl border-2 rounded-sm border-gray-950 text-white" onClick={(e) => e.stopPropagation()}>
                <div className="text-6xl self-center mr-2 mb-2 flex items-center justify-between">
                    <span className="text-2xl font-bold">{isType()}</span>
                    <span className="text-4xl font-bold cursor-pointer" onClick={closeModal}>×</span>
                </div>
                <div className="overflow-y-auto max-h-[60vh] w-[40vw] min-w-[400px] max-w-[600px]">
                    {moreList.length > 0 && moreList.map((item, index) => (
                        <div
                            className={`flex items-center justify-between px-6 py-2 text-white
                            hover:bg-[rgb(35,41,50)] cursor-pointer border-b-[1px] border-[rgb(23,27,36)]
                        ${addEle?.includes(item) ? 'bg-[rgb(35,41,50)]' : 'bg-[rgb(40,50,57)]'}`}
                        onClick={() => handleAddEle(item)}
                            key={index}>
                            <div>
                                <span className="font-bold text-[16px]">
                                    {item[1]} - {(item[3] * 100)}%
                                </span>
                                {item[0].split(/<br>/g).map(text => (<p className="text-[14px] text-gray-300" key={text}>{text}</p>))}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center">
                    <button
                        className="close-button mt-4 bg-sky-600 focus:bg-sky-700 text-white font-bold py-2 px-4 rounded-sm"
                        onClick={handleAddButton}
                    >
                        적용
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SkillModalComponent;