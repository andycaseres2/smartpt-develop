import { useEffect, useState } from "react";
import ArrowDown from "../../assets/Icons/ArrowDown";

const SelectStatus = ({
  options,
  onSelect,
  initialOption,
  colorArrow,
  readOnly,
  editStatus,
  styleSelect,
  handleChange,
  key_name,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptionId, setSelectedOptionId] = useState(null);

  useEffect(() => {
    if (initialOption && Array.isArray(options)) {
      setSelectedOption(initialOption);
      const foundOption = options.find(
        (option) => option.value === initialOption
      );
      if (foundOption) {
        setSelectedOptionId(foundOption.id);
        if (handleChange) {
          handleChange({ target: { name: key_name, value: foundOption.id } });
        }
      }
    } else {
      setSelectedOptionId(1);
      setSelectedOption("Pendiente");
    }
  }, [initialOption, key_name]);

  const toggleDropdown = () => {
    if (readOnly) {
      return;
    }
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option, id) => {
    setSelectedOption(option);
    setSelectedOptionId(id);
    setIsOpen(false);
    onSelect(option);
    if (handleChange) {
      handleChange({ target: { name: key_name, value: id } });
    }
  };

  function selectColors(id) {
    switch (id) {
      case 1:
        return "bg-red-500 text-white fill-white";
      case 2:
        return "bg-yellow-500 text-white fill-white";
      case 3:
        return "bg-green-500 text-white fill-white";
      case 4:
        return "bg-blue-500 text-white fill-white";
      default:
        return "bg-white";
    }
  }

  return (
    <div
      className="relative inline-block"
      onBlur={() => setIsOpen(false)}
      tabIndex={0}
    >
      <div
        className={`${selectColors(selectedOptionId)} py-2 text-[15px] ${
          styleSelect || "px-4"
        } rounded cursor-pointer font-semibold relative flex items-center justify-between gap-4 w-44`}
        onClick={toggleDropdown}
      >
        {selectedOption}
        {(!readOnly || (editStatus !== undefined && editStatus)) && (
          <>
            {editStatus ? (
              isOpen ? (
                <ArrowDown fill={colorArrow} className="rotate-180" />
              ) : (
                <ArrowDown fill={colorArrow} />
              )
            ) : null}
          </>
        )}
      </div>
      {isOpen && (
        <div className="absolute top-[37px] left-0 bg-white border border-gray-300 mt-1 rounded shadow-lg z-50 w-full">
          {options.map((option) => (
            <div
              key={option.id}
              className="p-2 cursor-pointer hover:bg-gray-100 w-full"
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

export default SelectStatus;
