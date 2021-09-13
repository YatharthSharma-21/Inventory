import React from "react";

import "./Button.css";

const Button = ({ text, onClick, type, title }) => {
  return (
    <button onClick={onClick} type={type} className="button" title={title}>
      {text}
    </button>
  );
};

export default Button;
