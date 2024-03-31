import { useEffect, useState } from "react";
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
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const { activities, setActivitiesByProcess } = stateStore();

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

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option, id) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
    handleChange({ target: { name: key_name, value: id } });
    if (key_name === "idprocesses") {
      const activitiesOptiones = activities.filter(
        (activity) => activity.idprocess === id
      );
      setActivitiesByProcess(activitiesOptiones);
    }
  };

  return (
    <div
      className="relative inline-block w-full"
      onBlur={() => setIsOpen(false)}
      tabIndex={0}
    >
      <div
        className={`py-2 ${styleSelect || "px-4"} rounded ${
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
        <div className="absolute top-[37px] left-0 w-full bg-gray-100 border border-gray-100 mt-1 rounded h-[300px] overflow-y-auto">
          {options.map((option) => (
            <div
              key={option.id}
              className="p-2 cursor-pointer hover:bg-gray-200"
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

export default SelectGeneric;
