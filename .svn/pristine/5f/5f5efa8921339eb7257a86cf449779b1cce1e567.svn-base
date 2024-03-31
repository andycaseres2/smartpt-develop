import { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Calendar from "../../assets/Icons/Calendar";

const InputDate = ({ text, position, styleInput }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const calendarRef = useRef(null);

  const handleDateChange = (date) => {
    const formattedDate = `${("0" + date.getDate()).slice(-2)}/${(
      "0" +
      (date.getMonth() + 1)
    ).slice(-2)}/${date.getFullYear()}`;
    setSelectedDate(formattedDate);
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

  return (
    <div
      className={`bg-white h-[40px] shadow-3xl rounded-lg px-4 py-2 flex justify-between items-center gap-2 relative cursor-pointer ${
        !text ? "w-[157px]" : styleInput || ""
      }`}
      onClick={() => setCalendarOpen(!calendarOpen)}
      ref={calendarRef}
    >
      {selectedDate ? (
        <span className="font-semibold w-max">{selectedDate}</span>
      ) : (
        <span className="font-semibold w-max">{text}</span>
      )}

      <div className="relative">
        <Calendar />
      </div>
      {calendarOpen && (
        <div className={`${position ?? "absolute top-11 right-0"}`}>
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
