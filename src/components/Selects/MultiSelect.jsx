import { useState, useEffect } from "react";
import ArrowDown from "../../assets/Icons/ArrowDown";
import { getData } from "../../services/getData";
import { userStore } from "../../store/userStore";

const MultiSelect = ({
  options,
  initialOptions,
  colorArrow,
  styleSelect,
  containerStyle,
  setTasks,
  newFilter,
  setSelectedEmployees,
  handleSelect,
  isFilter,
  setUrlBase,
  urlBase,
  colorSelect,
  placeholder,
  fieldReset,
  setFieldReset,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const { token } = userStore();

  useEffect(() => {
    if (initialOptions && initialOptions.length > 0) {
      setSelectedOptions(initialOptions);
      setSelectedEmployees(initialOptions);
    }
  }, [initialOptions]);

  useEffect(() => {
    if (fieldReset) {
      setSelectedOptions([]);
      setSelectedEmployees([]);
    }
    setFieldReset(false);
  }, [fieldReset]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = async (option, id) => {
    let updatedOptions = [...selectedOptions];

    // Si la opción ya está seleccionada, la eliminamos, de lo contrario la añadimos
    if (updatedOptions.includes(id)) {
      updatedOptions = updatedOptions.filter((item) => item !== id);
    } else {
      updatedOptions.push(id);
    }

    setSelectedOptions(updatedOptions);
    setSelectedEmployees(updatedOptions);
    if (handleSelect) {
      handleSelect(updatedOptions);
    }

    if (isFilter) {
      // Parsear la URL actual en un objeto URL
      const urlObject = new URL(urlBase);

      // Reemplazar el valor existente o agregar el nuevo parámetro
      urlObject.searchParams.set(newFilter, updatedOptions.join(","));

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
          {selectedOptions.length > 0
            ? selectedOptions
                .map((id) => {
                  const option = options.find((option) => option.id === id);
                  return option ? option.fullname || option.name : null;
                })
                .join(", ")
            : placeholder}
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
              className={`p-2 cursor-pointer  ${
                !selectedOptions.includes(option.id) && "hover:bg-gray-100"
              }  w-full flex items-center gap-2 ${
                selectedOptions.includes(option.id) && colorSelect
              }`}
              onClick={() =>
                handleOptionClick(option.name || option.fullname, option.id)
              }
            >
              <div
                className={`w-4.5 h-4.5 border-2 border-white flex items-center justify-center ${
                  selectedOptions.includes(option.id) && `bg-primary-red-500`
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-3 w-3 text-white ${
                    selectedOptions.includes(option.id) ? "" : "hidden"
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.293 9.293a1 1 0 0 1 1.414 0L9 13.586l6.293-6.293a1 1 0 1 1 1.414 1.414l-7 7a1 1 0 0 1-1.414 0l-7-7a1 1 0 0 1 0-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>{option.name || option.fullname}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
