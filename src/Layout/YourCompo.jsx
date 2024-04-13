import React, { useState } from 'react';

const YourCompo = ({ handleToggleCol, handleButtonClick }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClick = () => {
    handleButtonClick();
    handleToggleCol();
  };

  const handleHide = () => {
    console.log("Hiding component");
    setIsVisible(false);
  };

  console.log("isVisible:", isVisible);

  return (
    <div>
      {isVisible && (
        <div>
          <button onClick={handleClick} className="btn hoverNav">
            <i className="fa-solid fa-bars"></i>
          </button>
       
        </div>
      )}
    </div>
  );
};

export default YourCompo;
