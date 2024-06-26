import { useState, useEffect } from "react";

const InputTime = ({ defaultValue, handleChange, key_name, type }) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (defaultValue) {
      setInputValue(defaultValue);
      handleChange({
        target: {
          name: key_name,
          value: defaultValue,
        },
      });
    }
  }, [defaultValue]);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    handleChange({
      target: { name: key_name, value: newValue },
    });
  };

  return (
    <input
      className={` border-none p-2 bg-white shadow-3xl rounded-md  focus:outline-none ${
        !defaultValue ? "w-[112px]" : "w-full"
      }`}
      type={type}
      value={inputValue}
      onChange={handleInputChange}
      name={key_name}
    />
  );
};

export default InputTime;
