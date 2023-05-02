import React from 'react';
import './Switch.css';
const Switch = ({ id, isOn, onColor, onChange }) => {
    console.log("why")
  return (
    <>
      <input
        checked={isOn}
        className="react-switch-checkbox"
        id={id}
        type="checkbox"
        onChange={(e) => onChange(e.target.checked)}
      />
      <label
        style={{ background: isOn && onColor }}
        className="react-switch-label"
        htmlFor={id}
      >
        <span className={`react-switch-button`} />
      </label>
    </>
  );
};

export default Switch;