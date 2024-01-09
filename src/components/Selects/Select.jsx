import { useEffect, useState } from "react";
import ArrowDown from "../../assets/Icons/ArrowDown";

const Select = ({
  options,
  onSelect,
  initialOption,
  colorArrow,
  modeEdit,
  styleSelect,
  handleChange,
  key_name,
  zIndez,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    if (initialOption && Array.isArray(options)) {
      setSelectedOption(initialOption);
      const foundOption = options.find(
        (option) => option.value === initialOption
      );
      if (foundOption && modeEdit) {
        if (handleChange) {
          handleChange({ target: { name: key_name, value: foundOption.id } });
        }
      }
    }
  }, [initialOption, key_name, modeEdit]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option, id) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
    if (handleChange) {
      handleChange({ target: { name: key_name, value: id } });
    }
  };

  function selectColors(option) {
    switch (option) {
      case "Pendiente":
        return "bg-red-500 text-white fill-white";
      case "En proceso":
        return "bg-yellow-500 text-white fill-white";
      case "Finalizado":
        return "bg-green-500 text-white fill-white";
      case "En ejecucion":
        return "bg-blue-500 text-white fill-white";
      default:
        return "bg-white";
    }
  }

  return (
    <div
      className="relative inline-block z-0"
      onBlur={() => setIsOpen(false)}
      tabIndex={0}
    >
      <div
        className={`${selectColors(selectedOption)} py-2 ${
          styleSelect || "px-4"
        } rounded cursor-pointer font-semibold relative flex items-center justify-between gap-4 ${zIndez}`}
        onClick={toggleDropdown}
      >
        {selectedOption}

        {modeEdit && (
          <>
            {isOpen ? (
              <ArrowDown fill={colorArrow} className="rotate-180" />
            ) : (
              <ArrowDown fill={colorArrow} />
            )}
          </>
        )}
      </div>
      {isOpen && modeEdit && (
        <div className="absolute top-[37px] left-0 w-full bg-white border border-gray-300 mt-1 rounded shadow-lg">
          {options.map((option) => (
            <div
              key={option.id}
              className="p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleOptionClick(option.value, option.id)}
            >
              {option.value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
