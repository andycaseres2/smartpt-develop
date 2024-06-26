import { useEffect, useRef } from "react";

const OptionsEmployees = ({ employees, onSelect, setShowSelectEmployee }) => {
  const selectRef = useRef(null);
  const handleClickOutside = (event) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      setShowSelectEmployee(false);
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
      ref={selectRef}
      className="absolute top-7 right-20 bg-white shadow-3xl rounded-md z-50 overflow-hidden overflow-y-auto h-[400px] flex flex-col w-max"
    >
      {employees.map((employee) => (
        <span
          className="cursor-pointer p-2 hover:bg-gray-100"
          key={employee.id}
          onClick={() => onSelect(employee.id)}
        >
          {employee.fullname}
        </span>
      ))}
    </div>
  );
};

export default OptionsEmployees;
