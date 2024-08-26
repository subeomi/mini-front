import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { commaGold } from '../globalFunction';

const Tooltip = ({ text, children }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const tooltipRef = useRef(null);
  const parentRef = useRef(null);

  useEffect(() => {
    if (isHovered && parentRef.current) {
      const parentRect = parentRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      
      // Calculate the tooltip position relative to the parent element
      setTooltipPosition({
        top: parentRect.bottom + window.scrollY - 150,
        left: parentRect.left + window.scrollX + (parentRect.width - tooltipRect.width) / 2
      });
    }
  }, [isHovered]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // 툴팁에 표시되는 배열 풀이
  const transTextIfArray = (text) => {
    if (Array.isArray(text)) {
      const isAuctionHistory = text.every(item => item.hasOwnProperty("soldDate") && item.hasOwnProperty("unitPrice"));
      if (isAuctionHistory) {
        return (
          <div>
            {text.map((hstr, index) => (
              <p key={index + 'tooltip'} className="text-gray-400">
                {hstr.soldDate} {commaGold(hstr.unitPrice)}
              </p>
            ))}
          </div>
        );
      }
    }
    return text;
  };

  return (
    <div
      ref={parentRef}
      className="relative z-[999] mx-1"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {isHovered && ReactDOM.createPortal(
        <div
          ref={tooltipRef}
          className="absolute bg-cat4 rounded p-2 shadow-md z-[999]"
          style={{ top: tooltipPosition.top, left: tooltipPosition.left }}
        >
          <div className="w-2 h-2 bg-cat3 absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45"></div>
          <div className="whitespace-nowrap text-white text-[14px]">{transTextIfArray(text)}</div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default Tooltip;
