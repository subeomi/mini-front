import React, { useState } from 'react';
import { commaGold } from '../globalFunction';

const Tooltip = ({ text, children }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // 툴팁에 표시되는 배열 풀이
  const transTextIfArray = (text) => {
    if (Array.isArray(text)) {

      const isAuctionHistory = text.every(item => item.hasOwnProperty("soldDate") && item.hasOwnProperty("unitPrice"))
      // 거래내역 풀이
      if (isAuctionHistory) {

        return (
          <div>
            {text.map((hstr, index) => (
              <p key={index + 'tooltip'} className="text-gray-400">
                {hstr.soldDate} {commaGold(hstr.unitPrice)}
              </p>
            ))}
          </div>
        )
      }

    }
      return text
  }

  console.log(text)

  return (
    <div className="relative h-auto z-[999] mx-1" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {children}
      {isHovered && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-cat3 rounded p-2 shadow-md">
          <div className="w-2 h-2 bg-cat3 absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45"></div>
          <div className="whitespace-nowrap text-white text-[14px]">{transTextIfArray(text)}</div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
