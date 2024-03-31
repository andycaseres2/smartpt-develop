import { useEffect, useRef, useState } from "react";
import ArrowDown from "../../assets/Icons/ArrowDown";

const SelectMonth = ({
  options,
  onSelect,
  initialOption,
  styleSelect,
  key_name,
  readOnly,
  fieldReset,
  resetFieldsAssinedTask,
  classContainer,
  setSelectedMonth,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const selectRef = useRef(null);
  const inputRef = useRef(null); // Referencia al campo de búsqueda

  useEffect(() => {
    if (fieldReset || resetFieldsAssinedTask) {
      setSelectedOption(null);
    }
  }, [fieldReset, resetFieldsAssinedTask]);

  useEffect(() => {
    if (initialOption && Array.isArray(options)) {
      setSelectedOption(initialOption);
      const foundOption = options.find(
        (option) => option.value === initialOption
      );
      if (foundOption) {
        setSelectedMonth(foundOption.numberMonth);
      }
    }
  }, [initialOption, key_name]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus(); // Enfocar el campo de búsqueda cuando se abre el select
    }
  }, [isOpen]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option, numberMonth) => {
    setSelectedOption(option);
    setSelectedMonth(numberMonth);
    setIsOpen(false);
    if (onSelect) {
      onSelect(option);
    }
    toggleDropdown();
  };

  const handleClickOutside = (event) => {
    if (
      selectRef.current &&
      !selectRef.current.contains(event.target) &&
      !isSearchFocused
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={selectRef}
      className={`relative inline-block w-full ${classContainer}`}
    >
      <div
        className={`container-select py-2 px-2 ${
          styleSelect || "px-4"
        } rounded ${
          !readOnly ? "cursor-pointer" : ""
        } font-semibold relative flex items-center  gap-4 bg-white shadow-3xl h-[40px] ${
          !initialOption ? "justify-end pr-2" : "justify-between"
        }`}
        onClick={toggleDropdown}
      >
        <span className="overflow-hidden whitespace-nowrap overflow-ellipsis w-full">
          {selectedOption}
        </span>
        {!readOnly && (
          <>{isOpen ? <ArrowDown className="rotate-180" /> : <ArrowDown />}</>
        )}
      </div>
      {isOpen && !readOnly && !!options.length && (
        <div
          className={`w-max absolute top-[37px] left-0 bg-gray-100 border border-gray-100 mt-1 rounded ${
            options.length > 6 ? "h-[300px]" : "h-max"
          } overflow-y-auto`}
          onClick={(e) => e.stopPropagation()}
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Search..."
            className="p-2 border-b w-full focus:outline-none"
            value={searchTerm}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {options.map((option) => (
            <div
              key={option.id}
              className="p-2 cursor-pointer hover:bg-gray-200 w-full"
              onClick={() =>
                handleOptionClick(option.value, option.numberMonth)
              }
            >
              {option.value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default SelectMonth;
