import { useState, useEffect } from "react";

const DateInput = ({ defaultValue, handleChange, key_name }) => {
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    setSelectedDate(defaultValue?.split("T")[0]);
    if (defaultValue) {
      handleChange({
        target: { name: key_name, value: defaultValue },
      });
    }
  }, [defaultValue, key_name]);

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
      className="w-full border-none p-2 bg-gray-100 rounded-md focus:outline-none"
      type="date"
      value={selectedDate}
      onChange={handleDateChange}
      name={key_name}
    />
  );
};

export default DateInput;
