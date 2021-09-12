import React from "react";

import "./RoundBtn.css";

const RoundBtn = ({ text, onClick }) => {
  return (
    <button className="roundBtn" onClick={onClick}>
      {text}
    </button>
  );
};

export default RoundBtn;
