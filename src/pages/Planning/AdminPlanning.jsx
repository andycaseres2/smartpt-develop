import { useState } from "react";
import Select from "../../components/Selects/Select";
import Tabs from "../../components/Tabs/Tabs";
import InputDate from "../../components/Inputs/InputDate";

const AdminPlanning = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [selectedFrequencyOption, setselectedFrequencyOption] =
    useState("Semanal");
  const [selectedMonthOption, setselectedMonthOption] = useState("Septiembre");
  const [selectedClientId, setSelectedClientId] = useState(1);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const tabs = [
    { id: 1, label: "Seguimiento" },
    { id: 2, label: "Asignar actividad" },
    { id: 3, label: "Actividades" },
    { id: 4, label: "Consolidado" },
  ];

  const optionsFrecuency = [
    { id: 1, value: "Anual" },
    { id: 3, value: "Mensual" },
    { id: 4, value: "Semanal" },
    { id: 5, value: "Diario" },
  ];

  const optionsMonths = [
    { id: 1, value: "Diciembre" },
    { id: 2, value: "Noviembre" },
    { id: 3, value: "Octubre" },
    { id: 4, value: "Septiembre" },
  ];

  const handleSelectedFrecuency = (selectedOption) => {
    setselectedFrequencyOption(selectedOption);
  };

  const handleSelectedMonth = (selectedOption) => {
    setselectedMonthOption(selectedOption);
  };

  const ClientList = [
    { id: 1, name: "Client 1" },
    { id: 2, name: "Client 2" },
    { id: 3, name: "Client 3" },
    { id: 4, name: "Client 4" },
  ];

  const handleClientSelection = (clientId) => {
    setSelectedClientId(clientId);
  };

  const data = [
    {
      nombre: "Cliente 2",
      horasReales: 15,
      actividadesProgramadas: 25,
      actividadesCompletadas: 18,
      porcentajeCompletado: "100%",
    },
    {
      nombre: "Cliente 2",
      horasReales: 15,
      actividadesProgramadas: 25,
      actividadesCompletadas: 18,
      porcentajeCompletado: "100%",
    },
    {
      nombre: "Cliente 2",
      horasReales: 15,
      actividadesProgramadas: 25,
      actividadesCompletadas: 18,
      porcentajeCompletado: "100%",
    },
    {
      nombre: "Cliente 3",
      horasReales: 15,
      actividadesProgramadas: 25,
      actividadesCompletadas: 18,
      porcentajeCompletado: "50%",
    },
    {
      nombre: "Cliente 3",
      horasReales: 15,
      actividadesProgramadas: 25,
      actividadesCompletadas: 18,
      porcentajeCompletado: "92%",
    },
  ];

  const columns = [
    "Nombre",
    "Horas reales",
    "Actividades programadas",
    "Actividades completadas",
    "%Completado",
  ];

  const getColorBasedOnPercentage = (percentage) => {
    const numericPercentage = parseFloat(percentage);

    if (numericPercentage >= 90) {
      return "bg-primary-green-500"; // Verde para porcentaje mayor o igual al 90%
    } else if (numericPercentage >= 70) {
      return "bg-primary-yellow-500"; // Amarillo para porcentaje mayor o igual al 70%
    } else if (numericPercentage >= 50) {
      return "bg-orange-500"; // Naranja para porcentaje mayor o igual al 50%
    } else if (numericPercentage >= 30) {
      return "bg-orange-700"; // Naranja oscuro para porcentaje mayor o igual al 30%
    } else if (numericPercentage >= 10) {
      return "bg-primary-red-600"; // Rojo para porcentaje mayor o igual al 10%
    } else {
      return ""; // Otros porcentajes
    }
  };

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between z-[2]">
        <div className="flex items-end tab">
          <div className="flex items-end">
            <Tabs
              tabs={tabs}
              activeTab={activeTab}
              handleTabClick={handleTabClick}
            />
          </div>
        </div>
        {activeTab === 1 ? (
          <div className="flex gap-3 items-center mb-2">
            <Select
              options={optionsFrecuency}
              onSelect={handleSelectedFrecuency}
              initialOption={selectedFrequencyOption}
              modeEdit={true}
            />
            <Select
              options={optionsMonths}
              onSelect={handleSelectedMonth}
              initialOption={selectedMonthOption}
              modeEdit={true}
            />
          </div>
        ) : (
          <div className="flex gap-3 items-center mb-2">
            <Select
              options={optionsMonths}
              onSelect={handleSelectedMonth}
              initialOption={selectedFrequencyOption}
              modeEdit={true}
            />
            <InputDate text={"Fecha inicio"} />
            <InputDate text={"Fecha fin"} />
          </div>
        )}
      </div>

      <div className="bg-white rounded-bl-md rounded-r-md overflow-auto h-[630px] p-4 shadow-lg">
        {activeTab === 1 && (
          <div className="flex w-full h-full gap-3">
            <div className="w-[15%] h-full border border-gray-100 rounded-md shadow-md">
              <button className="px-1.5 py-2 cursor-pointer w-full flex jus">
                Ver todos
              </button>
              {ClientList.map((client) => (
                <div
                  key={client.id}
                  className={`${
                    client.id === selectedClientId
                      ? "bg-primary-red-600 text-white"
                      : "hover:bg-gray-200"
                  } p-1.5 cursor-pointer`}
                  onClick={() => handleClientSelection(client.id)}
                >
                  {client.name}
                </div>
              ))}
            </div>

            <div className="w-full flex flex-col overflow-y-auto border border-gray-100 rounded-md shadow-md">
              {/* AQUI VA EL CONDICIONAL DE CAMBIO DE VISTA CUANDO ES DIARIO */}
              {selectedFrequencyOption === "Diario" ? (
                <div className="w-full flex flex-col gap-5">
                  <div
                    className={`w-full ${
                      data.length > 9 ? "h-[475px]" : "h-max"
                    } border border-gray-100 rounded-md shadow-md overflow-hidden overflow-y-auto`}
                  >
                    <div className="w-full p-3 flex gap-4 items-center">
                      <h2 className="text-xl text-primary-red-600 font-semibold">
                        Semana del 4/07/2023 - 8/07/2023
                      </h2>
                      <span
                        className={`py-1 px-4 rounded-lg text-white font-base ${getColorBasedOnPercentage(
                          100
                        )}`}
                      >
                        100%
                      </span>
                    </div>
                    <h2>Aqui va la tabla</h2>
                  </div>
                </div>
              ) : (
                <div className="w-full flex flex-col gap-5">
                  <div
                    className={`w-full ${
                      data.length > 4 ? "h-[313px]" : "h-max"
                    } border border-gray-100 rounded-md shadow-md overflow-hidden overflow-y-auto`}
                  >
                    <div className="w-full p-3">
                      <h2 className="text-xl text-primary-red-600 font-semibold">
                        Semana del 4/07/2023 - 8/07/2023
                      </h2>
                    </div>
                    <table className="border-collapse w-full">
                      <thead className="w-full justify-center">
                        {columns.map((column, index) => (
                          <th
                            key={index}
                            className=" border-b border-gray-300 p-3"
                          >
                            {column}
                          </th>
                        ))}
                      </thead>
                      <tbody>
                        {data.map((row, index) => (
                          <tr key={index} className="border-b border-gray-300">
                            <td className="p-1 text-center">{row.nombre}</td>
                            <td className="p-1 text-center">
                              {row.horasReales}
                            </td>
                            <td className="p-1 text-center">
                              {row.actividadesProgramadas}
                            </td>
                            <td className="p-1 text-center">
                              {row.actividadesCompletadas}
                            </td>
                            <td className="p-2 text-center flex justify-center text-white">
                              <span
                                className={`px-8 rounded ${getColorBasedOnPercentage(
                                  row.porcentajeCompletado
                                )} w-24 h-9 flex items-center justify-center`}
                              >
                                {row.porcentajeCompletado}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div
                    className={`w-full ${
                      data.length > 4 ? "h-[313px]" : "h-max"
                    } border border-gray-100 rounded-md shadow-md overflow-hidden overflow-y-auto`}
                  >
                    <div className="w-full p-3">
                      <h2 className="text-xl text-primary-red-600 font-semibold">
                        Semana del 4/07/2023 - 8/07/2023
                      </h2>
                    </div>
                    <table className="border-collapse w-full">
                      <thead className="w-full justify-center">
                        {columns.map((column, index) => (
                          <th
                            key={index}
                            className=" border-b border-gray-300 p-3"
                          >
                            {column}
                          </th>
                        ))}
                      </thead>
                      <tbody>
                        {data.map((row, index) => (
                          <tr key={index} className="border-b border-gray-300">
                            <td className="p-1 text-center">{row.nombre}</td>
                            <td className="p-1 text-center">
                              {row.horasReales}
                            </td>
                            <td className="p-1 text-center">
                              {row.actividadesProgramadas}
                            </td>
                            <td className="p-1 text-center">
                              {row.actividadesCompletadas}
                            </td>
                            <td className="p-2 text-center flex justify-center text-white">
                              <span
                                className={`px-8 rounded ${getColorBasedOnPercentage(
                                  row.porcentajeCompletado
                                )} w-24 h-9 flex items-center justify-center`}
                              >
                                {row.porcentajeCompletado}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div
                    className={`w-full ${
                      data.length > 4 ? "h-[313px]" : "h-max"
                    } border border-gray-100 rounded-md shadow-md overflow-hidden overflow-y-auto`}
                  >
                    <div className="w-full p-3">
                      <h2 className="text-xl text-primary-red-600 font-semibold">
                        Semana del 4/07/2023 - 8/07/2023
                      </h2>
                    </div>
                    <table className="border-collapse w-full">
                      <thead className="w-full justify-center">
                        {columns.map((column, index) => (
                          <th
                            key={index}
                            className=" border-b border-gray-300 p-3"
                          >
                            {column}
                          </th>
                        ))}
                      </thead>
                      <tbody>
                        {data.map((row, index) => (
                          <tr key={index} className="border-b border-gray-300">
                            <td className="p-1 text-center">{row.nombre}</td>
                            <td className="p-1 text-center">
                              {row.horasReales}
                            </td>
                            <td className="p-1 text-center">
                              {row.actividadesProgramadas}
                            </td>
                            <td className="p-1 text-center">
                              {row.actividadesCompletadas}
                            </td>
                            <td className="p-2 text-center flex justify-center text-white">
                              <span
                                className={`px-8 rounded ${getColorBasedOnPercentage(
                                  row.porcentajeCompletado
                                )} w-24 h-9 flex items-center justify-center`}
                              >
                                {row.porcentajeCompletado}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 2 && <div className="overflow-x-auto h-full"></div>}
      </div>
    </div>
  );
};

export default AdminPlanning;
