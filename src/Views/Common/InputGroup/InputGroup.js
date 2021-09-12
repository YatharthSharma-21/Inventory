import React, { useState } from "react";

import "./InputGroup.css";

const InputGroup = ({
  label,
  placeholder,
  value,
  type,
  onChange,
  disabled,
  name,
  theme,
  hasDrop,
  dropOptions,
  onDropChange,
}) => {
  const [isFocus, setIsFocus] = useState(false);

  const [isHidden, setIsHidden] = useState(true);

  return (
    <div className={`input-group ${theme === "dark" ? "border-dark" : ""}`}>
      <label htmlFor="name">{label}</label>
      {/* <div
        className={`form-input ${value ? "is-valid" : ""} ${
          isFocus && !value ? "not-valid" : ""
        }  `}
      > */}
      <div className={`form-input`}>
        <input
          type={!isHidden ? "" : type}
          value={value}
          placeholder={placeholder}
          name={name}
          onChange={onChange}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          disabled={disabled}
        />

        {hasDrop && (
          <select
            name="cars"
            id="cars"
            onChange={(e) => onDropChange(e.target.value)}
          >
            {dropOptions.map((opt, i) => (
              <option key={i} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        )}

        {type === "password" && (
          <span
            className={`fas fa-eye${isHidden ? "-slash" : ""}`}
            onClick={() => setIsHidden(!isHidden)}
          ></span>
        )}

        {/* {value && (
          <span className="success-circle validity-circle">
            <i className="fa fa-check"></i>
          </span>
        )}

        {isFocus && !value && (
          <span className="danger-circle validity-circle">
            <i className="fa fa-times"></i>
          </span>
        )} */}
      </div>
    </div>
  );
};

export default InputGroup;
