import React from "react";

export const Dropdown = ({ options, onChange, value: selectedValue, id }) => {
  return (
    <select
      required
      id={id}
      onChange={onChange}
      value={selectedValue}
      name="pets"
      className="menu"
    >
      {options.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
};
