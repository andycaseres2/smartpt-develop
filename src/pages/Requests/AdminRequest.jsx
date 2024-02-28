import { useEffect, useState } from "react";
import Tabs from "../../components/Tabs/Tabs";
import { stateStore } from "../../store/stateStore";
import SelectGeneric from "../../components/Selects/SelectGeneric";
import Pagination from "../../components/Paginations/Pagination";
import InputDate from "../../components/Inputs/InputDate";
import ButtonWithIcon from "../../components/Buttons/ButtonWithIcon";
import Select from "../../components/Selects/Select";
import RowTableRequest from "../../components/Tables/RowTableRequest";
import ColumnTableRequest from "../../components/Tables/ColumnTableRequest";
import CirclePlus from "../../assets/Icons/CirclePlus";
import { postData } from "../../services/postData";
import TimeInput from "../../components/Inputs/TimeInput";
import RowTable from "../../components/Tables/RowTable";
import ColumnTable from "../../components/Tables/ColumnTable";
import { getData } from "../../services/getData";
import CleanIcon from "../../assets/Icons/CleanIcon";
import { userStore } from "../../store/userStore";

const AdminRequest = ({
  requests,
  setRequests,
  totalPages,
  setTooltipSuccess,
  setTooltipError,
  loading,
  setLoading,
  setRealTime,
  columnWidths,
  columnTitles,
}) => {
  const [activeTab, setActiveTab] = useState(1);
  const {
    setOpenNotifications,
    clients,
    activities,
    processes,
    employees,
    designFormats,
    designPieces,
    setCancelEdit,
  } = stateStore();
  const [stateRow, setStateRow] = useState({});
  const { token, user } = userStore();
  const [fieldReset, setFieldReset] = useState(false);
  const [updateActivities, setUpdateActivities] = useState([]);
  const [initialOptionClient, setInitialOptionClient] = useState("Cliente");
  const [initialOptionFormat, setInitialOptionFormat] = useState("Formato");
  const [initialOptionPeace, setInitialOptionPeace] = useState("Pieza");
  const [initialOptionEmployee, setInitialOptionEmployee] =
    useState("Responsable");
  const [urlBase, setUrlBase] = useState(`
    ${
      import.meta.env.VITE_REACT_APP_URL_BASE
    }FormattedDesignRequest?page=1&size=10&IdEmployee=${user.id}`);

  const handleCleanFilters = async () => {
    setFieldReset(true);
    setInitialOptionClient("Clientes");
    setInitialOptionEmployee("Responsable");
    setInitialOptionFormat("Formato");
    setInitialOptionPeace("Pieza");
    const baseUrl = import.meta.env.VITE_REACT_APP_URL_BASE;
    let tasksEndpoint = "";
    if (activeTab === 2) {
      tasksEndpoint = `${baseUrl}FormattedDesignRequest?page=1&size=100&IdEmployee=${user.id}`;
    } else if (activeTab === 3) {
      tasksEndpoint = `${baseUrl}FormattedDesignRequest?consolidated=true&page=1&size=10&IdEmployee=${user.id}`;
    }
    setUrlBase(tasksEndpoint);
    try {
      const tasksData = await getData(tasksEndpoint, token);
      setRequests(tasksData);
    } catch (error) {
      console.error("Error fetching clients data:", error);
    }
    setFieldReset(false);
  };

  useEffect(() => {
    if (fieldReset) {
      const timer = setTimeout(() => {
        setFieldReset(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [fieldReset]);

  async function createRequest() {
    try {
      const body = stateRow;
      // Definir la URL base
      const baseUrl = import.meta.env.VITE_REACT_APP_URL_BASE;

      if (!body.estimatedtime) {
        body.estimatedtime = 0;
      }
      // Construir la URL del endpoint para las tareas
      const tasksEndpoint = `${baseUrl}DesignRequest`;
      // Enviar los datos modificados al servidor utilizando la función postData
      body.idemployeecreator = user.id;
      body.realtime = null;
      body.idemployeeassigned = null;
      await postData(tasksEndpoint, body, token);
      setFieldReset(true);
      setStateRow({});
      setTooltipSuccess("Registro creada con exito");
    } catch (error) {
      // Manejar el error aquí
      console.error("Error al crear la tarea:", error);

      // Puedes definir un estado de error y guardarlo en tu componente si es necesario
      setTooltipError("Hubo un error al crear el registro");
    } finally {
      setRealTime(true);
    }
  }

  useEffect(() => {
    setUpdateActivities(activities);
  }, [activities]);

  const handleSelectProcess = (id) => {
    const filterActivities = activities.filter(
      (activity) => activity.idprocess === id
    );
    setUpdateActivities(filterActivities);
  };

  const handleChange = (e) => {
    setStateRow((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleTabClick = async (tab) => {
    setActiveTab(tab);
    setLoading(true); // Activar indicador de carga
    setCancelEdit(true);
    try {
      const baseUrl = import.meta.env.VITE_REACT_APP_URL_BASE;
      let tasksEndpoint = "";
      let initialOptions = {};

      if (tab === 3) {
        tasksEndpoint = `${baseUrl}FormattedDesignRequest?consolidated=true&page=1&size=10&IdEmployee=${user.id}`;
        initialOptions = {
          client: "Clientes",
        };
        setCancelEdit(true);
      } else if (tab === 2) {
        tasksEndpoint = `${baseUrl}FormattedDesignRequest?page=1&size=100&IdEmployee=${user.id}`;
        initialOptions = {
          client: "Clientes",
        };
        setCancelEdit(true);
      }

      setUrlBase(tasksEndpoint);
      const tasksData = await getData(tasksEndpoint, token);
      setRequests(tasksData);
      setInitialOptionClient(initialOptions.client);
    } catch (error) {
      console.error("Error al obtener datos de las tareas:", error);
    } finally {
      setLoading(false);
      setCancelEdit(true);
    }
  };

  const tabs = [
    { id: 1, label: "Registrar solicitud" },
    { id: 2, label: "Solicitudes" },
    { id: 3, label: "Consolidado" },
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
      data: "Video",
      editComponent: "select",
      options: [
        { id: 1, value: "Video" },
        { id: 2, value: "Grafica" },
        { id: 3, value: "Ambos" },
      ],
      key_name: "video",
    },
    {
      data: "Video corto",
      editComponent: "input",
      type: "text",
      key_name: "pieza",
    },
    {
      data: "Video corto sobre las capacidades de ...",
      editComponent: "input",
      type: "text",
      key_name: "descripción_pieza",
    },
    {
      data: "look and feel smartPR tenerlo...",
      editComponent: "input",
      type: "text",
      key_name: "requerimientos_pieza",
    },
    {
      data: "2024-01-26",
      editComponent: "input",
      type: "date",
      key_name: "fecha_entrega",
    },
    {
      data: "German",
      editComponent: "select",
      options: [
        { id: 1, value: "German" },
        { id: 2, value: "Sebas" },
      ],
      key_name: "Responsable",
    },
    {
      data: "04:00",
      editComponent: "input",
      type: "time",
      key_name: "hora_estimada",
    },
    {
      data: "05:00",
      editComponent: "input",
      type: "time",
      key_name: "hora_reales",
    },
    {
      data: "2024-01-26",
      editComponent: "input",
      type: "date",
      key_name: "fecha_trabajo",
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
      data: "Animación",
      editComponent: "input",
      type: "text",
      key_name: "observaciones",
    },
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
        </div>
        {activeTab === 2 && (
          <div className="flex gap-3 items-center mb-2">
            <Select
              options={clients}
              setTasks={setRequests}
              newFilter={"IdCustomer"}
              initialOption={initialOptionClient}
              setInitialOption={setInitialOptionClient}
              isFilter={true}
              urlBase={urlBase}
              setUrlBase={setUrlBase}
            />
            <Select
              options={employees}
              setTasks={setRequests}
              newFilter={"IdEmployee"}
              initialOption={initialOptionEmployee}
              setInitialOption={setInitialOptionEmployee}
              isFilter={true}
              urlBase={urlBase}
              setUrlBase={setUrlBase}
            />
            <ButtonWithIcon
              text={"Limpiar filtros"}
              icon={<CleanIcon />}
              action={handleCleanFilters}
            />
          </div>
        )}

        {activeTab === 3 && (
          <div className="flex flex-wrap justify-end gap-3 items-center mb-2">
            <Select
              options={clients}
              setTasks={setRequests}
              newFilter={"IdCustomer"}
              initialOption={initialOptionClient}
              setInitialOption={setInitialOptionClient}
              isFilter={true}
              urlBase={urlBase}
              setUrlBase={setUrlBase}
            />
            <Select
              options={designFormats}
              setTasks={setRequests}
              newFilter={"iddesignformat"}
              initialOption={initialOptionFormat}
              setInitialOption={setInitialOptionFormat}
              isFilter={true}
              urlBase={urlBase}
              setUrlBase={setUrlBase}
            />
            <Select
              options={designPieces}
              setTasks={setRequests}
              newFilter={"iddesignpiece"}
              initialOption={initialOptionPeace}
              setInitialOption={setInitialOptionPeace}
              isFilter={true}
              urlBase={urlBase}
              setUrlBase={setUrlBase}
            />
            <Select
              options={employees}
              setTasks={setRequests}
              newFilter={"IdEmployee"}
              initialOption={initialOptionEmployee}
              setInitialOption={setInitialOptionEmployee}
              isFilter={true}
              urlBase={urlBase}
              setUrlBase={setUrlBase}
            />
            <InputDate
              text={"Fecha inicio"}
              urlBase={urlBase}
              setUrlBase={setUrlBase}
              setRequests={setRequests}
              newFilter={"startDate"}
              fieldReset={fieldReset}
            />

            <ButtonWithIcon
              text={"Limpiar filtros"}
              icon={<CleanIcon />}
              action={handleCleanFilters}
            />
          </div>
        )}
      </div>

      <div className="bg-white rounded-bl-md rounded-r-md h-full">
        {activeTab === 1 && (
          <div className="overflow-x-auto h-full">
            <div className="min-w-max">
              <div className="w-full flex px-6 py-5">
                <div className="w-full flex gap-7">
                  <div className="flex flex-col gap-2">
                    <h2>Cliente</h2>
                    <SelectGeneric
                      options={clients}
                      initialOption={""}
                      key_name="idcustomer"
                      handleChange={handleChange}
                      styleSelect={"w-[157px]"}
                      fieldReset={fieldReset}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2>Formato</h2>
                    <SelectGeneric
                      options={designFormats}
                      initialOption={""}
                      key_name="iddesignformat"
                      handleChange={handleChange}
                      styleSelect={"w-[157px]"}
                      fieldReset={fieldReset}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2>Pieza</h2>
                    <SelectGeneric
                      options={designPieces}
                      initialOption={""}
                      key_name="iddesignpiece"
                      handleChange={handleChange}
                      styleSelect={"w-[157px]"}
                      fieldReset={fieldReset}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2>Proceso</h2>
                    <SelectGeneric
                      options={processes}
                      initialOption={""}
                      key_name=""
                      handleSelect={handleSelectProcess}
                      styleSelect={"w-[157px]"}
                      fieldReset={fieldReset}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2>Actividad</h2>
                    <SelectGeneric
                      options={updateActivities || activities}
                      initialOption={""}
                      key_name="idactivity"
                      handleChange={handleChange}
                      styleSelect={"w-[157px]"}
                      fieldReset={fieldReset}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col gap-4 px-6">
                <div className="flex flex-col gap-3 ">
                  <span>Descripción pieza</span>
                  <textarea
                    name="descripcion_pieza"
                    id="descripcion_pieza"
                    cols="30"
                    rows="10"
                    className="w-full rounded-md p-2 shadow-3xl h-[120px] focus:outline-none"
                    onChange={(e) =>
                      handleChange({
                        target: {
                          name: "description",
                          value: e.target.value,
                        },
                      })
                    }
                    value={fieldReset ? "" : stateRow.description}
                  ></textarea>
                </div>
                <div className="flex flex-col gap-3">
                  <span>Requerimientos pieza</span>
                  <textarea
                    name="descripcion_pieza"
                    id="descripcion_pieza"
                    cols="30"
                    rows="10"
                    className="w-full rounded-md p-2 shadow-3xl h-[120px] focus:outline-none"
                    onChange={(e) =>
                      handleChange({
                        target: {
                          name: "requirements",
                          value: e.target.value,
                        },
                      })
                    }
                    value={fieldReset ? "" : stateRow.requirements}
                  ></textarea>
                </div>
              </div>
              <div className="w-1/2 flex gap-8 px-6 py-8 justify-start">
                <div className="w-max flex flex-col gap-3">
                  <span>Fecha entrega</span>
                  <InputDate
                    handleChange={handleChange}
                    key_name={"deliverydate"}
                    position={"absolute top-11 -right-20"}
                    fieldReset={fieldReset}
                  />
                </div>
                <div className="w-max flex flex-col gap-3">
                  <span>Hora estimada </span>
                  <TimeInput
                    handleChange={handleChange}
                    key_name={"estimatedtime"}
                    type={"time"}
                    fieldReset={fieldReset}
                  />
                </div>
                {/* <div className="w-max flex flex-col gap-3">
                  <span>Hora real</span>
                  <TimeInput
                    handleChange={handleChange}
                    key_name={"realtime"}
                    type={"time"}
                    fieldReset={fieldReset}
                  />
                </div> */}
              </div>
              <div className="w-full flex flex-col gap-4 px-6">
                <div className="flex flex-col gap-3 ">
                  <span>Observaciones</span>
                  <textarea
                    name="descripcion_pieza"
                    id="descripcion_pieza"
                    cols="30"
                    rows="10"
                    className="w-full rounded-md p-2 shadow-3xl h-[100px] focus:outline-none"
                    onChange={(e) =>
                      handleChange({
                        target: {
                          name: "observations",
                          value: e.target.value,
                        },
                      })
                    }
                    value={fieldReset ? "" : stateRow.observations}
                  ></textarea>
                </div>
              </div>
              <div className="flex justify-end py-8 px-6">
                <ButtonWithIcon
                  text="Registrar solicitud"
                  action={createRequest}
                  icon={<CirclePlus />}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 2 && (
          <div className="overflow-x-auto h-full">
            <div className="min-w-max">
              <div className="w-full p-3">
                <table className="min-w-full">
                  <thead>
                    <ColumnTable
                      columnTitlesActivity={columnTitles}
                      columnWidths={columnWidths}
                      readOnly={false}
                    />
                  </thead>
                  <tbody className="border-b border-gray-300">
                    {requests?.map((item, index) => (
                      <RowTable
                        key={index}
                        listItems={item}
                        columnWidths={columnWidths}
                        stateRow={stateRow}
                        handleChange={handleChange}
                        readOnly={false}
                        editStatus={true}
                        setStateRow={setStateRow}
                        endpoint={"DesignRequest"}
                        setTooltipSuccess={setTooltipSuccess}
                        setTooltipError={setTooltipError}
                        section={"requests"}
                        setRealTime={setRealTime}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 3 && (
          <div className="w-full h-full flex flex-col gap-6">
            <div className="w-full h-full flex flex-col">
              <div className="flex px-4 mt-6 bg-white justify-between">
                <div className="flex gap-2 items-center">
                  <p className="text-xl text-primary-red-600 font-semibold">
                    SmartPR
                  </p>
                  <span className="py-1 px-4 rounded-lg text-white font-base bg-primary-green-500">
                    140 horas
                  </span>
                </div>
                <div className="flex gap-2 items-center">
                  <p className="text-xl text-primary-red-600 font-semibold">
                    Horas totales:
                  </p>
                  <span className="py-1 px-4 rounded-lg text-white font-base bg-primary-blue-500">
                    504 horas
                  </span>
                </div>
              </div>
              <div className="overflow-x-auto h-full">
                <div className="min-w-max">
                  <div className="w-full p-3">
                    <div className="overflow-x-auto">
                      <table className="min-w-full">
                        <thead>
                          <ColumnTable
                            columnTitlesActivity={columnTitles}
                            columnWidths={columnWidths}
                            readOnly={false}
                          />
                        </thead>
                        <tbody className="border-b border-gray-300">
                          {requests?.map((item, index) => (
                            <RowTable
                              key={index}
                              listItems={item}
                              columnWidths={columnWidths}
                              stateRow={stateRow}
                              handleChange={handleChange}
                              readOnly={true}
                              editStatus={false}
                              setStateRow={setStateRow}
                              setRealTime={setRealTime}
                            />
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-full flex flex-col">
              <div className="flex px-4 mt-6 bg-white justify-between">
                <div className="flex gap-2 items-center">
                  <p className="text-xl text-primary-red-600 font-semibold">
                    SmartPR
                  </p>
                  <span className="py-1 px-4 rounded-lg text-white font-base bg-primary-green-500">
                    140 horas
                  </span>
                </div>
              </div>
              <div className="overflow-x-auto h-full">
                <div className="min-w-max">
                  <div className="w-full p-3">
                    <div className="overflow-x-auto">
                      <table className="min-w-full">
                        <thead>
                          <ColumnTableRequest
                            columnTitlesActivity={columnTitles}
                            columnWidths={columnWidths}
                            readOnly={false}
                          />
                        </thead>
                        <tbody className="border-b border-gray-300">
                          <RowTableRequest
                            listItems={listItems}
                            columnWidths={columnWidths}
                            stateRow={stateRow}
                            handleChange={handleChange}
                            readOnly={true}
                            editStatus={false}
                          />
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {activeTab === 3 && (
        <div className="flex justify-end">
          <Pagination
            setRequests={setRequests}
            totalPages={totalPages}
            urlBase={urlBase}
            setUrlBase={setUrlBase}
            setLoading={setLoading}
          />
        </div>
      )}
    </div>
  );
};

export default AdminRequest;
