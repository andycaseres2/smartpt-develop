import { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Calendar from "../../assets/Icons/Calendar";
import { getData } from "../../services/getData";
import { userStore } from "../../store/userStore";

const InputDate = ({
  text,
  position,
  styleInput,
  urlBase,
  setTasks,
  setUrlBase,
  newFilter,
  key_name,
  handleChange,
  fieldReset,
  minValue,
  setUpdateState,
}) => {
  const { token } = userStore();
  const [selectedDate, setSelectedDate] = useState(null);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const calendarRef = useRef(null);
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (fieldReset) {
      setSelectedDate(null);
      if (setUpdateState) {
        setUpdateState(null);
      }
    }
  }, [fieldReset]);

  const handleDate = async (date, filter) => {
    setSelectedDate(date);
    if (setUpdateState) {
      setUpdateState(date.toISOString());
    }

    const formattedDate = date.toISOString();
    if (handleChange) {
      handleChange({
        target: { name: key_name, value: formattedDate },
      });
    } else {
      const urlObject = new URL(urlBase);

      // Verificar si ya existe el parámetro en la URL
      if (urlObject.searchParams.has(filter)) {
        // Reemplazar el valor existente
        urlObject.searchParams.set(filter, formattedDate);
      } else {
        // Agregar el nuevo parámetro
        urlObject.searchParams.append(filter, formattedDate);
      }

      const newUrl = urlObject.toString();

      try {
        const tasksData = await getData(newUrl, token);

        // Actualizar el estado con la nueva URL
        setUrlBase(newUrl);

        // Actualizar el estado de los datos
        setTasks(tasksData);
      } catch (error) {
        console.error("Error fetching clients data:", error);
      }
    }

    setCalendarOpen(false);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setCalendarOpen(false);
    handleDate(date, newFilter);
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

  function convertirFechaISOaFecha(fechaISO) {
    return new Date(fechaISO).toISOString().split("T")[0];
  }

  return (
    <div
      className={`bg-white h-[40px] shadow-3xl rounded px-4 z-[1] py-2 flex justify-between items-center gap-2 relative cursor-pointer ${
        !text ? "w-[157px]" : styleInput || ""
      }`}
      onClick={() => setCalendarOpen(true)}
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
            min={(minValue && convertirFechaISOaFecha(minValue)) || today}
          />
        </div>
      )}
    </div>
  );
};

export default InputDate;
