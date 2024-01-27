import { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Calendar from "../../assets/Icons/Calendar";

const InputDate = ({ text, position, styleInput }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const calendarRef = useRef(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setCalendarOpen(false);
  };

  const handleClickOutside = (event) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target)) {
      setCalendarOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const formatSelectedDate = (date) => {
    if (!date) {
      return "";
    }
    const formattedDate = `${date.getFullYear()}/${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")}`;
    return formattedDate;
  };

  return (
    <div
      className={`bg-white h-[40px] shadow-3xl rounded px-4 z-[1] py-2 flex justify-between items-center gap-2 relative cursor-pointer ${
        !text ? "w-[157px]" : styleInput || ""
      }`}
      onClick={() => setCalendarOpen(!calendarOpen)}
      ref={calendarRef}
    >
      {selectedDate ? (
        <span className="font-semibold w-max">
          {formatSelectedDate(selectedDate)}
        </span>
      ) : (
        <span className="font-semibold w-max">{text}</span>
      )}

      <div className="relative">
        <Calendar />
      </div>
      {calendarOpen && (
        <div className={`${position ?? "absolute top-11 right-0 h-max"}`}>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            showPopperArrow={false}
            popperPlacement="bottom-start"
            inline
          />
        </div>
      )}
    </div>
  );
};

export default InputDate;
