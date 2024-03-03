import { useEffect, useState } from "react";
import { handleMoreCustom } from "../../common/skill/skillCustomFunction";

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

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-sm z-50"
            onClick={closeModal}
        >
            <div className="bg-white p-4 shadow-xl border-t-8 rounded-3xl border-t-[rgb(228,108,10)]" onClick={(e) => e.stopPropagation()}>
                <div className="text-6xl self-center mr-2 flex items-center">
                    <h2 className="text-2xl font-bold m-2">type 옵션 추가</h2>
                </div>
                {moreList.length > 0 && moreList.map((item,index) => (
                    <div className="flex justify-between w-[300px]" key={index}>
                        <span>
                            {item[1]} - {(item[3] * 100)}%
                        </span>
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