<<<<<<< HEAD
import { useEffect, useState } from "react";

const InputSecondary = ({
  type,
  value,
  key_name,
  handleChange,
  initialValue,
  readOnly,
  onlyNumber,
  className, // Nueva prop para indicar si solo se permiten números
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    let newValue = e.target.value;

    // Si onlyNumber es true, solo se permiten números
    if (onlyNumber) {
      newValue = newValue.replace(/\D/, ""); // Remover todo lo que no sea dígito
    }

    setInputValue(newValue);
    handleChange({
      target: {
        name: key_name,
        value: onlyNumber ? Number(newValue) : newValue,
      },
    });
  };

  const isValidDate = (dateString) => {
    const regexDate = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
    return regexDate.test(dateString);
  };

  const formatDateForInput = (dateString) => {
    if (!isValidDate(dateString)) {
      return "";
    }

    const [day, month, year] = dateString.split("/");
    const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(
      2,
      "0"
    )}`;
    return formattedDate;
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
  }, [value, initialValue, key_name]);

  return (
    <input
      className={`w-full p-2 bg-white rounded shadow-3xl focus:outline-none ${className}`}
      type={type === "date" ? "date" : type}
      name={key_name}
      value={type === "date" ? formatDateForInput(inputValue) : inputValue}
      onChange={handleInputChange}
      readOnly={readOnly || false}
    />
  );
};

export default InputSecondary;
=======
import { useEffect, useState } from "react";

const InputSecondary = ({
  type,
  value,
  key_name,
  handleChange,
  initialValue,
  readOnly,
  onlyNumber,
  className, // Nueva prop para indicar si solo se permiten números
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    let newValue = e.target.value;

    // Si onlyNumber es true, solo se permiten números
    if (onlyNumber) {
      newValue = newValue.replace(/\D/, ""); // Remover todo lo que no sea dígito
    }

    setInputValue(newValue);
    handleChange({
      target: {
        name: key_name,
        value: onlyNumber ? Number(newValue) : newValue,
      },
    });
  };

  const isValidDate = (dateString) => {
    const regexDate = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
    return regexDate.test(dateString);
  };

  const formatDateForInput = (dateString) => {
    if (!isValidDate(dateString)) {
      return "";
    }

    const [day, month, year] = dateString.split("/");
    const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(
      2,
      "0"
    )}`;
    return formattedDate;
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
  }, [value, initialValue, key_name]);

  return (
    <input
      className={`w-full p-2 bg-white rounded shadow-3xl focus:outline-none ${className}`}
      type={type === "date" ? "date" : type}
      name={key_name}
      value={type === "date" ? formatDateForInput(inputValue) : inputValue}
      onChange={handleInputChange}
      readOnly={readOnly || false}
    />
  );
};

export default InputSecondary;
>>>>>>> b7ecf2887956819aed0507d5ec357a78c09ff6b2
