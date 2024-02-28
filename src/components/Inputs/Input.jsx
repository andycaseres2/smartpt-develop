import { useEffect, useState } from "react";

const Input = ({
  value,
  key_name,
  handleChange,
  initialValue,
  resetFieldsAssinedTask,
}) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (resetFieldsAssinedTask) {
      setInputValue("");
    }
  }, [resetFieldsAssinedTask]);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    if (newValue === "") {
      setInputValue(""); // Si el nuevo valor es una cadena vacía, establece el estado en una cadena vacía
    } else {
      setInputValue(newValue); // Si el nuevo valor no es una cadena vacía, actualiza el estado con el nuevo valor
    }
    handleChange({ target: { name: key_name, value: newValue } });
  };

  useEffect(() => {
    if (value !== undefined && value !== null && value !== "") {
      setInputValue(value);
      handleChange({ target: { name: key_name, value } });
    } else {
      const initial = initialValue || "";
      setInputValue(initial);
      handleChange({ target: { name: key_name, value: initial } });
    }
  }, [key_name]);

  return (
    <input
      className="w-full border-none p-2 bg-gray-100 rounded-md  focus:outline-none"
      type="text"
      name={key_name}
      value={inputValue}
      onChange={handleInputChange}
    />
  );
};

export default Input;
