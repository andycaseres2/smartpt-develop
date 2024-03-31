import { useEffect, useRef, useState } from "react";
import ArrowDown from "../../assets/Icons/ArrowDown";
import { stateStore } from "../../store/stateStore";

const SelectGeneric = ({
  options,
  onSelect,
  initialOption,
  styleSelect,
  key_name,
  handleChange,
  readOnly,
  handleSelect,
  fieldReset,
  resetFieldsAssinedTask,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const { activities, setActivitiesByProcess } = stateStore();
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
        handleChange({ target: { name: key_name, value: foundOption.id } });
        if (key_name === "idprocesses") {
          const activitiesOptiones = activities.filter(
            (activity) => activity.idprocess === foundOption.id
          );
          setActivitiesByProcess(activitiesOptiones);
        }
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

  const handleOptionClick = (option, id) => {
    setSelectedOption(option);
    if (handleSelect) {
      handleSelect(id);
    }
    setIsOpen(false);
    if (onSelect) {
      onSelect(option);
    }
    if (handleChange) {
      handleChange({ target: { name: key_name, value: id } });
    }
    if (key_name === "idprocesses") {
      const activitiesOptiones = activities.filter(
        (activity) => activity.idprocess === id
      );
      setActivitiesByProcess(activitiesOptiones);
    }
    toggleDropdown();
  };

  const filteredOptions = options?.filter((option) => {
    const lowercaseSearchTerm = searchTerm?.toLowerCase();
    return (
      option?.name?.toLowerCase().includes(lowercaseSearchTerm) ||
      option?.fullname?.toLowerCase().includes(lowercaseSearchTerm) ||
      option?.value?.toString().toLowerCase().includes(lowercaseSearchTerm)
    );
  });

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
    <div ref={selectRef} className="relative inline-block w-full">
      <div
        className={`py-2 px-2 ${styleSelect || "px-4"} rounded ${
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
          {filteredOptions.map((option) => (
            <div
              key={option.id}
              className="p-2 cursor-pointer hover:bg-gray-200 w-full"
              onClick={() =>
                handleOptionClick(
                  option.name || option.fullname || option.value,
                  option.id
                )
              }
            >
              {option.name || option.fullname || option.value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default SelectGeneric;
