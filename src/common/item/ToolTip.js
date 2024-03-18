import React, { useState } from 'react';

const Tooltip = ({ text, children }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div className="relative inline-block" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {children}
          {isHovered && (
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-[rgb(40,50,57)] rounded p-2 shadow-md">
              <div className="w-2 h-2 bg-[rgb(40,50,57)] absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45"></div>
              <div className="whitespace-nowrap text-white text-[14px]">{text}</div>
            </div>
          )}
        </div>
      );
};

export default Tooltip;
