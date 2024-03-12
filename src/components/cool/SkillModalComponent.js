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
                return '쿨타임 증가';
            case 'rec':
                return '쿨타임 회복속도 증가';
            case 'red':
                return '쿨타임 감소';
        }
    }

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-sm z-50 overflow-hidden"
            onClick={closeModal}
        >
            <div className="bg-[rgb(23,27,36)] bg-opacity-90 p-4 shadow-xl border-2 rounded-sm border-gray-950 text-white" onClick={(e) => e.stopPropagation()}>
                <div className="text-6xl self-center mr-2 flex items-center">
                    <h2 className="text-2xl font-bold mb-2">{isType()} 옵션 추가</h2>
                </div>
                {moreList.length > 0 && moreList.map((item, index) => (
                    <div
                        className={`flex items-center justify-between w-[350px] p-2 text-white bg-[rgb(35,41,50)] 
                        ${index % 2 === 0 && 'bg-[rgb(40,50,57)]'}`}
                        key={index}>
                        <Tooltip text={item[0].split(/<br>/g).map(text => (<p key={text}>{text}</p>))}>
                            <span>
                                {item[1]} - {(item[3] * 100)}%
                            </span>
                        </Tooltip>

                        <div>
                            {addEle?.includes(item) &&
                                <button className="mr-1" onClick={() => handleAddEle(item)}>
                                    제거
                                </button>
                            }
                            <button className="" onClick={() => handleAddEle(item)}>
                                추가
                            </button>
                        </div>
                    </div>
                ))}
                <div className="flex justify-end">
                    <button
                        className="close-button mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                        onClick={closeModal}
                    >
                        취소
                    </button>

                    <button
                        className="close-button mt-4 ml-2 bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleAddButton}
                    >
                        설정
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SkillModalComponent;