const WorkerList = ({ list, onSelect, selectedId, showButton }) => {
  return (
    <div className="w-[20%] h-full border border-gray-100 rounded-md shadow-md">
      {showButton && (
        <button className="px-1.5 py-2 cursor-pointer w-full flex jus">
          Ver todos
        </button>
      )}
      {list.map((client) => (
        <div
          key={client.id}
          className={`${
            client.id === selectedId
              ? "bg-primary-red-600 text-white"
              : "hover:bg-gray-200"
          } p-1.5 cursor-pointer`}
          onClick={() => onSelect(client.id)}
        >
          {client.name}
        </div>
      ))}
    </div>
  );
};

export default WorkerList;
