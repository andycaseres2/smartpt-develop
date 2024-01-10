import { useState } from "react";
import Button from "../Buttons/Button";

const ModalNotifications = ({ styleContainer }) => {
  const [activeTab, setActiveTab] = useState(1);

  const tabs = [
    { id: 1, label: "Pendiente" },
    { id: 2, label: "Aceptado" },
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleClickInsideModal = (e) => {
    e.stopPropagation(); // Evita que el evento se propague
  };

  return (
    <div
      className={`${styleContainer} w-[370px] h-[450px] bg-white rounded-lg shadow-lg z-[9999] overflow-hidden`}
    >
      <div className="flex justify-start p-3 border-b border-gray-300">
        <h1 className="text-2xl font-semibold text-black">Actividades</h1>
      </div>
      <div
        className="flex items-center w-full"
        onClick={handleClickInsideModal}
      >
        {tabs.map((tab) => (
          <div
            className={`text-black cursor-pointer text-base flex justify-between w-full items-center text-center mt-2 ${
              activeTab === tab.id && "border-b border-primary-red-600"
            }`}
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
          >
            <span className={`text-black text-base w-full`}>{tab.label}</span>
          </div>
        ))}
      </div>

      {activeTab === 1 && (
        <div className="flex flex-col mt-1 p-3 w-full overflow-y-auto overflow-hidden h-[290px]">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="w-7 h-7 accent-primary-red-600"
              />
              <p className="text-black">
                <strong>Juan Camilo Motta Ospina </strong>
                te ha asignado una tarea. (4/12/2023 - 4:25pm)
              </p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="w-7 h-7 accent-primary-red-600"
              />
              <p className="text-black">
                <strong>Juan Camilo Motta Ospina </strong>
                te ha asignado una tarea. (4/12/2023 - 4:25pm)
              </p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="w-7 h-7 accent-primary-red-600"
              />
              <p className="text-black">
                <strong>Juan Camilo Motta Ospina </strong>
                te ha asignado una tarea. (4/12/2023 - 4:25pm)
              </p>
            </div>
          </div>
        </div>
      )}
      {activeTab === 2 && (
        <div className="flex flex-col mt-1 p-3 w-full overflow-y-auto overflow-hidden h-[290px]">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <p className="text-black">
                <strong>Juan Camilo Motta Ospina </strong>
                te ha asignado una tarea. (4/12/2023 - 4:25pm)
              </p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-black">
                <strong>Juan Camilo Motta Ospina </strong>
                te ha asignado una tarea. (4/12/2023 - 4:25pm)
              </p>
            </div>
          </div>
        </div>
      )}
      {activeTab === 1 && (
        <div className="w-full flex justify-center p-2">
          <Button text={"Aceptar tareas"} />
        </div>
      )}
    </div>
  );
};

export default ModalNotifications;
