import { useState } from "react";
import Select from "../../components/Selects/Select";
import Tabs from "../../components/Tabs/Tabs";
import RowTable from "../../components/Tables/RowTable";
import ColumnTable from "../../components/Tables/ColumnTable";
import WorkerList from "../../components/Sidebar/WorkerList";
import ButtonWithIcon from "../../components/Buttons/ButtonWithIcon";
import RowTableNewActivity from "../../components/Tables/RowTableNewActivity";
import InputDate from "../../components/Inputs/InputDate";
import Pagination from "../../components/Paginations/Pagination";
import { stateStore } from "../../store/stateStore";
import ColumnTableAddActivity from "../../components/Tables/ColumnTableAddActivity";
import CirclePlus from "../../assets/Icons/CirclePlus";

const AdminPlanning = () => {
  const [activeTab, setActiveTab] = useState(1);
  const { setOpenNotifications } = stateStore();
  const [selectedFrequencyOption, setselectedFrequencyOption] =
    useState("Semanal");
  const [selectedMonthOption, setselectedMonthOption] = useState("Septiembre");
  const [selectedUserId, setSelectedUserId] = useState(1);
  const [stateRow, setStateRow] = useState({});
  const [initialOptionSelect, setInitialOptionSelect] = useState("Cliente");
  const [initialOptionSelectActivity, setInitialOptionSelectActivity] =
    useState("Actividad");
  const [initialOptionSelectProcess, setInitialOptionSelectProcess] =
    useState("Proceso");

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
    { id: 4, value: "Semanal" },
    { id: 5, value: "Diario" },
  ];

  const optionsMonths = [
    { id: 1, value: "Diciembre" },
    { id: 2, value: "Noviembre" },
    { id: 3, value: "Octubre" },
    { id: 4, value: "Septiembre" },
    { id: 5, value: "Agosto" },
    { id: 6, value: "Julio" },
    { id: 7, value: "Junio" },
    { id: 8, value: "Mayo" },
    { id: 9, value: "Abril" },
    { id: 10, value: "Marzo" },
    { id: 11, value: "Febrero" },
    { id: 12, value: "Enero" },
  ];

  const handleSelectedFrecuency = (selectedOption) => {
    setselectedFrequencyOption(selectedOption);
  };

  const handleSelectedMonth = (selectedOption) => {
    setselectedMonthOption(selectedOption);
  };

  const userList = [
    { id: 1, name: "Carlos Gonzales" },
    { id: 2, name: "Maria Lopez" },
    { id: 3, name: "Fernando Hernandez" },
    { id: 4, name: "Luisa Rodriguez" },
  ];

  const handleUserSelection = (clientId) => {
    setSelectedUserId(clientId);
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

  const columnWidths = [
    "w-44", // Ancho para Columna 1
    "w-[400px]", // Ancho para Columna 2
    "w-44", // Ancho para Columna 3
    "w-44", // Ancho para Columna 4
    "w-52", // Ancho para Columna 5
    "w-72", // Ancho para Columna 6
    "w-64", // Ancho para Columna 7
    "w-72", // Ancho para Columna 8
    "w-32", // Ancho para Columna 9
    "w-32", // Ancho para Columna 10
    "w-64", // Ancho para Columna 11
    "w-44", // Ancho para Columna 12
    "w-44", // Ancho para Columna 13
  ];

  const columnWidthsNewActivity = [
    "w-[130px]",
    "w-[250px]",
    "w-[120px]",
    "w-[130px]",
    "w-[165px]",
  ];

  const columnsAddActivity = [
    "Cliente",
    "Tarea",
    "Fecha inicio",
    "Fecha estimada",
    "Estado",
  ];

  const listItems = [
    {
      data: "Ford",
      editComponent: "select",
      options: [
        { id: 1, value: "SmartPR" },
        { id: 2, value: "MTC" },
        { id: 3, value: "Ford" },
        { id: 4, value: "Toyota" },
      ],
      key_name: "cliente",
    },
    {
      data: "Construcción del contenido del mes del cliente ",
      editComponent: "input",
      type: "text",
      key_name: "tarea",
    },
    {
      data: "2024-01-26",
      editComponent: "input",
      type: "date",
      key_name: "fecha_inicio",
    },
    {
      data: "2024-01-26",
      editComponent: "input",
      type: "date",
      key_name: "fecha_estimada",
    },
    {
      data: "En proceso",
      editComponent: "status",
      options: [
        { id: 1, value: "Pendiente" },
        { id: 2, value: "Finalizado" },
        { id: 3, value: "En ejecucion" },
        { id: 4, value: "En proceso" },
      ],
      key_name: "estado",
    },
    {
      data: "Contenidos mensual para SmartPR ",
      editComponent: "input",
      type: "text",
      key_name: "comentarios",
    },
    {
      data: "Gestión_Clientes_Actuales",
      editComponent: "input",
      type: "text",
      key_name: "proceso",
    },
    {
      data: "Diseño Plan de Trabajo de  Cliente",
      editComponent: "input",
      type: "text",
      key_name: "actividad",
    },
    {
      data: "01:00",
      editComponent: "input",
      type: "time",
      key_name: "hora_estimada",
    },
    {
      data: "00:30",
      editComponent: "input",
      type: "time",
      key_name: "hora_real",
    },
    {
      data: "Contenido SmartPR.xlsx",
      editComponent: "input",
      type: "text",
      key_name: "documentos_asociados",
    },
    {
      data: "2024-01-26",
      editComponent: "input",
      type: "date",
      key_name: "fecha_fin",
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

  const currentDate = new Date().toISOString().split("T")[0];
  const listAddActivity = [
    {
      data: "Select",
      editComponent: "select",
      options: [
        { id: 1, value: "SmartPR" },
        { id: 2, value: "MTC" },
        { id: 3, value: "Ford" },
        { id: 4, value: "Toyota" },
      ],
      key_name: "cliente",
    },
    {
      data: "",
      editComponent: "input",
      type: "text",
      key_name: "tarea",
    },
    {
      data: currentDate,
      editComponent: "input",
      type: "date",
      key_name: "fecha_inicio",
    },
    {
      data: "",
      editComponent: "input",
      type: "date",
      key_name: "fecha_estimada",
    },
    {
      data: "Pendiente",
      editComponent: "status",
      options: [
        { id: 1, value: "Pendiente" },
        { id: 2, value: "Finalizado" },
        { id: 3, value: "En ejecucion" },
        { id: 4, value: "En proceso" },
      ],
      key_name: "estado",
    },
  ];

  const columnTitlesActivity = [
    "Cliente",
    "Tarea",
    "Fecha inicio",
    "Fecha estimada ",
    "Estado",
    "Comentarios",
    "Proceso",
    "Actividad",
    "Hora estimada",
    "Hora real",
    "Documentos asociados",
    "Fecha fin",
    "",
  ];

  const handleChange = (e) => {
    setStateRow((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const options = [
    { id: 1, value: "SmartPR" },
    { id: 2, value: "MTC" },
    { id: 3, value: "Ford" },
    { id: 4, value: "Toyota" },
  ];

  const handleSelect = (selectedOption) => {
    setInitialOptionSelect(selectedOption);
  };

  const handleSelectProcess = (selectedOption) => {
    setInitialOptionSelectProcess(selectedOption);
  };

  const handleSelectActivity = (selectedOption) => {
    setInitialOptionSelectActivity(selectedOption);
  };

  const optionsActivity = [
    { id: 1, value: "Actividad 1" },
    { id: 2, value: "Actividad 2" },
    { id: 3, value: "Actividad 3" },
    { id: 4, value: "Actividad 4" },
  ];

  const optionsProcess = [
    { id: 1, value: "Proceso 1" },
    { id: 2, value: "Proceso 2" },
    { id: 3, value: "Proceso 3" },
    { id: 4, value: "Proceso 4" },
  ];

  return (
    <div className="flex flex-col" onClick={() => setOpenNotifications(false)}>
      <div className="w-full flex justify-between z-[2]">
        <div className="flex items-end tab">
          <div className="flex items-end">
            <Tabs
              tabs={tabs}
              activeTab={activeTab}
              handleTabClick={handleTabClick}
            />
          </div>
          {activeTab === 3 && (
            <div className="flex gap-2 items-center ml-5 h-full ">
              <p className="font-base font-semibold">
                Total horas programadas:
              </p>
              <span className="py-1 px-4 rounded-lg text-white font-base bg-primary-green-500 ">
                25 horas
              </span>
            </div>
          )}
        </div>
        {activeTab === 1 && (
          <div className="flex gap-3 items-center mb-2">
            <Select
              options={optionsFrecuency}
              onSelect={handleSelectedFrecuency}
              initialOption={selectedFrequencyOption}
              readOnly={false}
              editStatus={true}
            />
            <Select
              options={optionsMonths}
              onSelect={handleSelectedMonth}
              initialOption={selectedMonthOption}
              readOnly={false}
              editStatus={true}
            />
          </div>
        )}

        {activeTab === 3 && (
          <div className="flex gap-3 items-center mb-2">
            <Select
              options={options}
              onSelect={handleSelect}
              initialOption={initialOptionSelect}
              readOnly={false}
              editStatus={true}
            />
            <ButtonWithIcon
              buttonColor={"bg-primary-red-600"}
              text={"Añadir actividad"}
              icon={<CirclePlus />}
            />
          </div>
        )}

        {activeTab === 4 && (
          <div className="flex gap-3 items-center mb-2">
            <Select
              options={options}
              onSelect={handleSelect}
              initialOption={initialOptionSelect}
              readOnly={false}
              editStatus={true}
            />
            <Select
              options={optionsActivity}
              onSelect={handleSelectActivity}
              initialOption={initialOptionSelectActivity}
              readOnly={false}
              editStatus={true}
            />
            <Select
              options={optionsProcess}
              onSelect={handleSelectProcess}
              initialOption={initialOptionSelectProcess}
              readOnly={false}
              editStatus={true}
            />
            <InputDate text={"Fecha inicio"} />
            <InputDate text={"Fecha fin"} />
          </div>
        )}
      </div>

      <div className="bg-white rounded-bl-md rounded-r-md overflow-auto h-[660px] p-4 shadow-lg">
        {activeTab === 1 && (
          <div className="flex w-full h-full gap-3">
            <WorkerList
              list={userList}
              onSelect={handleUserSelection}
              selectedId={selectedUserId}
            />
            <div className="w-full flex flex-col overflow-y-auto border border-gray-100 rounded-md shadow-md">
              {selectedFrequencyOption === "Diario" ? (
                <div className="w-full h-full flex flex-col justify-between gap-4">
                  <div
                    className={`w-full h-full border border-gray-100 rounded-md shadow-md overflow-hidden overflow-x-auto`}
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

                    <table className="min-w-full">
                      <thead>
                        <ColumnTable
                          columnTitlesActivity={columnTitlesActivity}
                          columnWidths={columnWidths}
                          readOnly={true}
                        />
                      </thead>
                      <tbody className="border-b border-gray-300">
                        <RowTable
                          listItems={listItems}
                          columnWidths={columnWidths}
                          stateRow={stateRow}
                          handleChange={handleChange}
                          readOnly={true}
                          editStatus={true}
                        />
                      </tbody>
                      <tbody className="border-b border-gray-300">
                        <RowTable
                          listItems={listItems}
                          columnWidths={columnWidths}
                          stateRow={stateRow}
                          handleChange={handleChange}
                          readOnly={true}
                          editStatus={true}
                        />
                      </tbody>
                    </table>
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

        {activeTab === 2 && (
          <div className="overflow-x-auto h-full">
            <div className="flex w-full h-full gap-3">
              <WorkerList
                list={userList}
                onSelect={handleUserSelection}
                selectedId={selectedUserId}
                showButton={false}
              />
              <div className="w-full flex flex-col overflow-y-auto  rounded-md gap-5">
                <div
                  className={`min-w-max h-[65%] border border-gray-200 rounded-md shadow-lg`}
                >
                  <div className="w-full p-3">
                    <h2 className="text-xl text-primary-red-600 font-semibold">
                      Asignar actividad nueva
                    </h2>
                  </div>

                  <table className="min-w-full">
                    <thead>
                      <ColumnTableAddActivity
                        columnTitlesActivity={columnsAddActivity}
                        columnWidths={columnWidthsNewActivity}
                        readOnly={false}
                      />
                    </thead>
                    <tbody className="border-b border-gray-300">
                      <RowTableNewActivity
                        listItems={listAddActivity}
                        columnWidths={columnWidthsNewActivity}
                        stateRow={stateRow}
                        handleChange={handleChange}
                        readOnly={false}
                        editStatus={true}
                        editMode={true}
                        showButtonsEdit={false}
                      />
                    </tbody>
                  </table>

                  <div className="w-full flex justify-end p-4">
                    <ButtonWithIcon
                      text={"Añadir actividad"}
                      disabled={false}
                      icon={<CirclePlus />}
                    />
                  </div>
                </div>
                <div
                  className={`min-w-max h-full border border-gray-200 rounded-md shadow-lg overflow-hidden overflow-y-auto`}
                >
                  <div className="w-full p-3">
                    <h2 className="text-xl text-primary-red-600 font-semibold">
                      Asignar actividad nueva
                    </h2>
                  </div>

                  <table className="min-w-full">
                    <thead>
                      <ColumnTableAddActivity
                        columnTitlesActivity={columnsAddActivity}
                        columnWidths={columnWidthsNewActivity}
                        readOnly={false}
                      />
                    </thead>
                    <tbody className="border-b border-gray-300">
                      <RowTableNewActivity
                        listItems={listAddActivity}
                        columnWidths={columnWidthsNewActivity}
                        stateRow={stateRow}
                        handleChange={handleChange}
                        readOnly={false}
                        editStatus={true}
                        showButtonsEdit={true}
                      />
                    </tbody>
                    <tbody className="border-b border-gray-300">
                      <RowTableNewActivity
                        listItems={listAddActivity}
                        columnWidths={columnWidthsNewActivity}
                        stateRow={stateRow}
                        handleChange={handleChange}
                        readOnly={false}
                        editStatus={true}
                        showButtonsEdit={true}
                      />
                    </tbody>
                    <tbody className="border-b border-gray-300">
                      <RowTableNewActivity
                        listItems={listAddActivity}
                        columnWidths={columnWidthsNewActivity}
                        stateRow={stateRow}
                        handleChange={handleChange}
                        readOnly={false}
                        editStatus={true}
                        showButtonsEdit={true}
                      />
                    </tbody>
                    <tbody className="border-b border-gray-300">
                      <RowTableNewActivity
                        listItems={listAddActivity}
                        columnWidths={columnWidthsNewActivity}
                        stateRow={stateRow}
                        handleChange={handleChange}
                        readOnly={false}
                        editStatus={true}
                        showButtonsEdit={true}
                      />
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 3 && (
          <div className="overflow-x-auto h-full">
            <div className="min-w-max">
              <table className="min-w-full">
                <thead>
                  <ColumnTable
                    columnTitlesActivity={columnTitlesActivity}
                    columnWidths={columnWidths}
                    readOnly={false}
                  />
                </thead>
                <tbody className="border-b border-gray-300">
                  <RowTable
                    listItems={listItems}
                    columnWidths={columnWidths}
                    stateRow={stateRow}
                    handleChange={handleChange}
                    editStatus={true}
                  />
                </tbody>
                <tbody className="border-b border-gray-300">
                  <RowTable
                    listItems={listItems}
                    columnWidths={columnWidths}
                    stateRow={stateRow}
                    handleChange={handleChange}
                    editStatus={true}
                  />
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 4 && (
          <div className="overflow-x-auto h-full">
            <div className="min-w-max">
              <table className="min-w-full">
                <thead>
                  <ColumnTable
                    columnTitlesActivity={columnTitlesActivity}
                    columnWidths={columnWidths}
                    readOnly={true}
                  />
                </thead>
                <tbody className="border-b border-gray-300">
                  <RowTable
                    listItems={listItems}
                    columnWidths={columnWidths}
                    stateRow={stateRow}
                    handleChange={handleChange}
                    readOnly={true}
                  />
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      {activeTab === 4 && (
        <div className="flex justify-end">
          <Pagination />
        </div>
      )}
    </div>
  );
};

export default AdminPlanning;
