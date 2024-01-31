import { useEffect, useState } from "react";
import ArrowDown from "../../assets/Icons/ArrowDown";

const Select = ({
  options,
  onSelect,
  initialOption,
  colorArrow,
  readOnly,
  editStatus,
  styleSelect,
  handleChange,
  key_name,
  zIndez,
  containerStyle,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    if (initialOption && Array.isArray(options)) {
      setSelectedOption(initialOption);
      const foundOption = options.find(
        (option) => option.Name === initialOption
      );
      if (foundOption) {
        if (handleChange) {
          handleChange({ target: { name: key_name, value: foundOption.id } });
        }
      }
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
    setIsOpen(false);
    onSelect(option);
    if (handleChange) {
      handleChange({ target: { name: key_name, value: id } });
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
        } rounded cursor-pointer shadow-3xl h-[40px] font-semibold relative flex items-center justify-between w-[157px] gap-4  ${zIndez} ${
          !initialOption ? "w-[157px] !justify-end" : ""
        }`}
        onClick={toggleDropdown}
      >
        <span className="overflow-hidden whitespace-nowrap overflow-ellipsis w-full">
          {selectedOption}
        </span>

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
        <div className="absolute top-[37px] left-0 bg-white border border-gray-300 mt-1 rounded shadow-lg z-50 w-max h-[300px] overflow-y-auto">
          {options.map((option) => (
            <div
              key={option.id}
              className="p-2 cursor-pointer hover:bg-gray-100 w-max"
              onClick={() => handleOptionClick(option.name, option.id)}
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
