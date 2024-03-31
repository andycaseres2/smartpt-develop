import { useState } from "react";
import ButtonWithIcon from "../../components/Buttons/ButtonWithIcon";
import Select from "../../components/Selects/Select";

const WorkerPlanning = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [initialOptionSelect, setInitialOptionSelect] = useState("Cliente");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const tabs = [
    { id: 1, label: "Tab 1" },
    { id: 2, label: "Tab 2" },
  ];

  const options = ["Opción 1", "Opción 2", "Opción 3"];

  const handleSelect = (selectedOption) => {
    setInitialOptionSelect(selectedOption);
  };

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between">
        <div className="flex items-end tab">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={
                activeTab === tab.id
                  ? "w-[151px] h-[51px] text-black font-semibold bg-white rounded-t-lg"
                  : "w-[151px] h-[40px] text-black bg-[#E4E4E4] rounded-t-lg border border-white"
              }
              onClick={() => handleTabClick(tab.id)}
            >
              {tab.label}
            </button>
          ))}
          <div className="flex gap-2 items-center ml-5 h-full ">
            <p className="font-base font-semibold">Total horas programadas:</p>
            <span className="py-1 px-4 rounded-lg text-white font-base bg-primary-green-500 ">
              25 horas
            </span>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <Select
            options={options}
            onSelect={handleSelect}
            initialOption={initialOptionSelect}
          />
          <ButtonWithIcon
            buttonColor={"bg-primary-red-600"}
            text={"Añadir actividad"}
          />
        </div>
      </div>

      <div className="bg-white rounded-bl-md rounded-r-md">
        {activeTab === 1 && (
          <div>
            <h2>Contenido de la pestaña 1</h2>
            {/* Contenido de la pestaña 1 */}
          </div>
        )}
        {activeTab === 2 && (
          <div>
            <h2>Contenido de la pestaña 2</h2>
            {/* Contenido de la pestaña 2 */}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkerPlanning;
