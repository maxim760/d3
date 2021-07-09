import React, { useState } from "react";
import { Dropdown } from "./Dropdown";

const options = [
  { value: "dog", label: "Dog" },
  { value: "cat", label: "Cat" },
  { value: "hamster", label: "Hamster" },
  { value: "parrot", label: "Parrot" },
  { value: "spider", label: "Spider" },
  { value: "goldfish", label: "Goldfish" },
];
const initialValue = "hamster";
export const SELECT_ID = "pet-select";
export const Menus = () => {
  const [selectValue, setSelectValue] = useState(initialValue)
  const onChange = ({ target }) => {
    setSelectValue(target.value)
  }
  return (
    <div>
      <label htmlFor={SELECT_ID} className="label-menu">
        Choose a pet
      </label>
      <Dropdown options={options} onChange={onChange} value={selectValue} id={SELECT_ID} />
    </div>
  );
};
