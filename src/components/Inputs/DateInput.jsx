import { useState, useEffect } from "react";

const DateInput = ({
  defaultValue,
  handleChange,
  key_name,
  readOnly,
  resetFieldsAssinedTask,
}) => {
  const [selectedDate, setSelectedDate] = useState("");
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (resetFieldsAssinedTask) {
      setSelectedDate("");
    }
  }, [resetFieldsAssinedTask]);

  useEffect(() => {
    setSelectedDate(defaultValue?.split("T")[0]);
    if (defaultValue) {
      handleChange({
        target: { name: key_name, value: defaultValue },
      });
    }
  }, [defaultValue, key_name, readOnly]);

  const handleDateChange = (e) => {
    const newDate = e.target.value;

    // Convertir la fecha al formato deseado
    const formattedDate = new Date(newDate).toISOString();

    setSelectedDate(newDate);
    handleChange({
      target: { name: key_name, value: formattedDate },
    });
  };

  return (
    <input
      className={
        readOnly
          ? "w-full border-none p-2 bg-transparent rounded-md focus:outline-none"
          : "w-full border-none p-2 bg-gray-100 rounded-md focus:outline-none"
      }
      type="date"
      value={selectedDate}
      onChange={handleDateChange}
      name={key_name}
      readOnly={readOnly}
      min={today}
    />
  );
};

export default DateInput;
