import { useState, useEffect } from "react";

const TimeInput = ({ defaultValue, handleChange, key_name, type }) => {
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
      className="w-full border-none p-2 bg-primary-gray-50 rounded-md bg-transparent"
      type={type}
      value={inputValue}
      onChange={handleInputChange}
      name={key_name}
    />
  );
};

export default TimeInput;
