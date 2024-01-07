import { useState } from "react";

const ModalNotifications = ({ styleContainer }) => {
  const [activeTab, setActiveTab] = useState(1);

  const tabs = [
    { id: 1, label: "Pendiente" },
    { id: 2, label: "Aceptado" },
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div
      className={`${styleContainer} bg-white p-20 rounded-lg shadow-lg z-[9999]`}
    >
      <div className="flex justify-start items-center z-50">
        <h1 className="text-2xl font-semibold text-black">Actividades</h1>
      </div>
      <div className="flex items-center">
        {tabs.map((tab) => (
          <span onClick={() => handleTabClick(tab.id)} key={tab.id}>
            {tab.label}
          </span>
        ))}
      </div>

      {activeTab === 1 && (
        <div>
          <h1>Pendiente</h1>
        </div>
      )}
      {activeTab === 2 && (
        <div>
          <h1>Aceptado</h1>
        </div>
      )}
      <div>
        <button>Aceptar tareas</button>
      </div>
    </div>
  );
};

export default ModalNotifications;
