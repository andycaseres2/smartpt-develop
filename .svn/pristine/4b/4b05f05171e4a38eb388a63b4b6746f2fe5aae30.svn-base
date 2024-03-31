import { useState } from "react";

const WorkerList = ({ employees, onSelect, selectedId }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const defaultOption = {
    fullname: "Pendiente",
    id: 0,
  };

  // Filtrar la lista de empleados según el término de búsqueda
  const filteredEmployees = employees.filter((employee) =>
    employee.fullname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="!w-[300px] h-full overflow-y-auto border border-gray-100 rounded-md shadow-md">
      {/* Buscador */}
      <input
        type="text"
        placeholder="Buscar trabajador..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 border-b border-gray-200 focus:outline-none"
      />
      {/* Lista de empleados filtrada */}
      <div>
        <div
          className={`${
            defaultOption.id === selectedId
              ? "bg-primary-red-600 text-white"
              : "hover:bg-gray-200"
          } p-1.5 cursor-pointer`}
          onClick={() => onSelect(defaultOption.id)}
        >
          {defaultOption.fullname}
        </div>
        {filteredEmployees.map((employee) => (
          <div
            key={employee.id}
            className={`${
              employee.id === selectedId
                ? "bg-primary-red-600 text-white"
                : "hover:bg-gray-200"
            } p-1.5 cursor-pointer`}
            onClick={() => onSelect(employee.id)}
          >
            {employee.fullname}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkerList;
