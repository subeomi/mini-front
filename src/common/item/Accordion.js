import { useEffect, useRef, useState } from "react";

// isInitOpen = false 는 값을 지정하지 않으면 최초 false, prop으로 제공하면 그 값을 사용
const Accordion = ({ headerContent, children, isInitOpen = false }) => {

    const [isOpen, setIsOpen] = useState(isInitOpen);
    const contentRef = useRef(null);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        if (isOpen) {
            contentRef.current.style.maxHeight = `${contentRef.current.scrollHeight}px`;
        } else {
            contentRef.current.style.maxHeight = '0px';
        }
    }, [isOpen]);

    return (
        <div className="mb-1">
            {/* 아코디언 헤더 */}
            <div
                className={`bg-cat1 cursor-pointer min-h-[60px] flex items-center`}
                onClick={toggleAccordion}
            >
                {headerContent}
            </div>

            {/* 아코디언 컨텐츠 */}
            <div
                ref={contentRef}
                className={`bg-cat3 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0'}`}
            >
                <div className="p-2">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Accordion;