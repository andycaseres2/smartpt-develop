import { useState } from "react";
import ArrowDown from "../../assets/Icons/ArrowDown";
import { getData } from "../../services/getData";
import { userStore } from "../../store/userStore";

const Select = ({
  options,
  initialOption,
  colorArrow,
  styleSelect,
  containerStyle,
  setTasks,
  newFilter,
  setInitialOption,
  handleSelect,
  isFilter,
  setUrlBase,
  urlBase,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { token } = userStore();
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = async (option, id) => {
    if (setInitialOption) {
      setInitialOption(option);
    }
    if (onSelect) {
      console.log(option);
      onSelect(option);
    }
    if (handleSelect) {
      handleSelect(id);
    }
    setIsOpen(false);
    if (isFilter) {
      // Parsear la URL actual en un objeto URL
      const urlObject = new URL(urlBase);

      // Verificar si ya existe el parámetro en la URL
      if (urlObject.searchParams.has(newFilter)) {
        // Reemplazar el valor existente
        urlObject.searchParams.set(newFilter, id);
      } else {
        // Agregar el nuevo parámetro
        urlObject.searchParams.append(newFilter, id);
      }

      // Obtener la nueva URL actualizada
      const newUrl = urlObject.toString();

      try {
        // Obtener los datos usando la nueva URL
        const tasksData = await getData(newUrl, token);

        // Actualizar el estado con la nueva URL
        setUrlBase(newUrl);

        // Actualizar el estado de los datos
        setTasks(tasksData);
      } catch (error) {
        console.error("Error fetching clients data:", error);
      }
    }
  };

  return (
    <div
      className={`relative inline-block ${containerStyle}`}
      onBlur={() => setIsOpen(false)}
      tabIndex={0}
    >
      <div
        className={`bg-white py-2 text-[15px] ${
          styleSelect || "px-4"
        } rounded cursor-pointer shadow-3xl h-[40px] font-semibold relative flex items-center justify-between w-[157px] gap-4`}
        onClick={toggleDropdown}
      >
        <span className="overflow-hidden whitespace-nowrap overflow-ellipsis w-full">
          {initialOption}
        </span>
        {isOpen ? (
          <ArrowDown fill={colorArrow} className="rotate-180" />
        ) : (
          <ArrowDown fill={colorArrow} />
        )}
      </div>
      {isOpen && !!options.length && (
        <div
          className={`absolute top-[37px] left-0 bg-white border border-gray-300 mt-1 rounded shadow-lg z-50 min-w-full w-max ${
            options.length > 7 ? "h-[300px]" : "h-max"
          } h-[300px] overflow-y-auto`}
        >
          {options.map((option) => (
            <div
              key={option.id}
              className="p-2 cursor-pointer hover:bg-gray-100 w-full"
              onClick={() =>
                handleOptionClick(option.name || option.fullname, option.id)
              }
            >
              {option.name || option.fullname}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
