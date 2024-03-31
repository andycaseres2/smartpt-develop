const WorkerList = ({ employees, onSelect, selectedId }) => {
  return (
    <div className="!w-[300px] h-full overflow-y-auto border border-gray-100 rounded-md shadow-md">
      {employees.map((client) => (
        <div
          key={client.id}
          className={`${
            client.id === selectedId
              ? "bg-primary-red-600 text-white"
              : "hover:bg-gray-200"
          } p-1.5 cursor-pointer`}
          onClick={() => onSelect(client.id)}
        >
          {client.fullname}
        </div>
      ))}
    </div>
  );
};

export default WorkerList;
