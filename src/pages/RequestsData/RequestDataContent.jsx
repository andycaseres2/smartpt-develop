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
import { getData } from "../../services/getData";
import CleanIcon from "../../assets/Icons/CleanIcon";
import SelectState from "../../components/Selects/SelectState";

const RequestDataContent = ({
  requests,
  setRequests,
  totalPages,
  setTooltipSuccess,
  setTooltipError,
  loading,
  setLoading,
  setRealTime,
}) => {
  const [activeTab, setActiveTab] = useState(1);
  const {
    setOpenNotifications,
    clients,
    processes,
    activities,
    servicesType,
    setCancelEdit,
  } = stateStore();
  const [stateRow, setStateRow] = useState({});
  const [fieldReset, setFieldReset] = useState(false);
  const [updateActivities, setUpdateActivities] = useState([]);
  const [initialOptionClient, setInitialOptionClient] = useState("Cliente");
  const [initialOptionState, setInitialOptionState] = useState("Estados");
  const [urlBase, setUrlBase] = useState(`
    ${
      import.meta.env.VITE_REACT_APP_URL_BASE
    }FormattedDataUniverseRequest?page=1&size=10`);

  const handleCleanFilters = async () => {
    setFieldReset(true);
    setInitialOptionClient("Clientes");
    setInitialOptionState("Estados");
    const baseUrl = import.meta.env.VITE_REACT_APP_URL_BASE;
    let tasksEndpoint = "";
    if (activeTab === 2) {
      tasksEndpoint = `${baseUrl}FormattedDesignRequest?page=1&size=100`;
    } else if (activeTab === 3) {
      tasksEndpoint = `${baseUrl}FormattedDesignRequest?consolidated=true&page=1&size=10`;
    }
    setUrlBase(tasksEndpoint);
    try {
      const tasksData = await getData(tasksEndpoint);
      setRequests(tasksData);
    } catch (error) {
      console.error("Error fetching clients data:", error);
    }
    setFieldReset(false);
  };

  const filterState = [
    {
      id: 0,
      value: "Todos",
    },
    {
      id: 1,
      value: "Pendiente",
    },
    {
      id: 2,
      value: "En proceso",
    },
    {
      id: 3,
      value: "Finalizada",
    },
    {
      id: 4,
      value: "No ejecutada",
    },
  ];

  useEffect(() => {
    setUpdateActivities(activities);
  }, [activities]);

  const handleSelectProcess = (id) => {
    const filterActivities = activities.filter(
      (activity) => activity.idprocess === id
    );
    setUpdateActivities(filterActivities);
  };

  async function createRequest() {
    try {
      // Definir la URL base
      const baseUrl = import.meta.env.VITE_REACT_APP_URL_BASE;

      // Construir la URL del endpoint para las tareas
      const tasksEndpoint = `${baseUrl}DataUniverseRequest`;
      // Enviar los datos modificados al servidor utilizando la función postData
      await postData(tasksEndpoint, stateRow);
      setStateRow({});
      setTooltipSuccess("Registro creada con exito");
      setFieldReset(true);
    } catch (error) {
      // Manejar el error aquí
      console.error("Error al crear la tarea:", error);

      // Puedes definir un estado de error y guardarlo en tu componente si es necesario
      setTooltipError("Hubo un error al crear el registro");
    } finally {
      setRealTime(true);
      setStateRow({});
    }
  }

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
        tasksEndpoint = `${baseUrl}FormattedDataUniverseRequest?consolidated=true&page=1&size=10`;
        initialOptions = {
          client: "Clientes",
        };
        setCancelEdit(true);
      } else if (tab === 2) {
        tasksEndpoint = `${baseUrl}FormattedDataUniverseRequest?page=1&size=100`;
        initialOptions = {
          client: "Clientes",
        };
        setCancelEdit(true);
      }

      setUrlBase(tasksEndpoint);
      const tasksData = await getData(tasksEndpoint);
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

  const columnTitles = [
    "Cliente",
    "Tipo de servicio ",
    "Proceso",
    "Actividad ",
    "Especificaciones",
    "Fecha de entrega",
    "Responsable",
    "Horas estimadas",
    "Horas reales",
    "Estado ",
    "",
  ];
  const columnWidths = [
    "w-44", // Ancho para Columna 1
    "w-44", // Ancho para Columna 2
    "w-44", // Ancho para Columna 3
    "w-[350px]", // Ancho para Columna 4
    "w-[350px]", // Ancho para Columna 5
    "w-44", // Ancho para Columna 6
    "w-44", // Ancho para Columna 7
    "w-44", // Ancho para Columna 8
    "w-44", // Ancho para Columna 9
    "w-44", // Ancho para Columna 10
    "w-44", // Ancho para Columna 11
    "w-44", // Ancho para Columna 12
    "w-10", // Ancho para Columna 13
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
            <ButtonWithIcon
              text={"Limpiar filtros"}
              icon={<CleanIcon />}
              action={handleCleanFilters}
            />
          </div>
        )}

        {activeTab === 3 && (
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
            <SelectState
              options={filterState}
              setTasks={setRequests}
              newFilter={"state"}
              initialOption={initialOptionState}
              setInitialOption={setInitialOptionState}
              isFilter={true}
              urlBase={urlBase}
              setUrlBase={setUrlBase}
            />
            <InputDate
              text={"Fecha"}
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

      <div className="bg-white rounded-bl-md rounded-r-md overflow-auto h-[660px]">
        {activeTab === 1 && (
          <div className="overflow-x-auto h-full">
            <div className="w-full">
              <div className="w-full flex px-6 py-5">
                <div className="w-full flex py-5">
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
                      <h2>Tipo de servicio</h2>
                      <SelectGeneric
                        options={servicesType}
                        initialOption={""}
                        key_name="idservicetype"
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
              </div>
              <div className="w-full flex flex-col gap-4 px-6">
                <div className="flex flex-col gap-3">
                  <span>Especificaciones</span>
                  <span>
                    1. Explica brevemente la intención del estudio: ideas para
                    generación de contenido a través de los datos, conocimiento
                    de cliente, share of voice, entre otros.
                  </span>
                  <span>
                    2. Si necesitas una escucha social por favor comparte con
                    nosotros las palabras claves y relevantes para incluir
                    dentro de la búsqueda (de tu cliente y competidores, si
                    aplica).
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  <textarea
                    name="specifications"
                    id="specifications"
                    cols="30"
                    rows="10"
                    className="w-full rounded-md p-2 shadow-3xl h-[245px] focus:outline-none"
                    onChange={(e) => {
                      handleChange({
                        target: {
                          name: "specifications",
                          value: e.target.value,
                        },
                      });
                      setFieldReset(false);
                      console.log(e.target.value);
                    }}
                    value={fieldReset ? "" : stateRow["specifications"]}
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
                <div className="w-max flex flex-col gap-3">
                  <span>Hora real</span>
                  {/* <TimeInput
                    handleChange={handleChange}
                    key_name={"realtime"}
                    type={"time"}
                    fieldReset={fieldReset}
                  /> */}
                </div>
              </div>
              <div className="w-full flex flex-col gap-4 px-6">
                <div className="flex flex-col gap-3">
                  <span>
                    <strong>Nota: </strong>
                    De ser necesario concretaríamos una reunión con los equipos
                    para ajustar temas de tiempos de entrega u otros detalles de
                    la solicitud (propósito, muestra, requerimientos, etc),
                    debido al trá co de solicitudes que manejamos dentro del
                    área.
                  </span>
                  <span>
                    <strong>Recordatorio: </strong>
                    Si necesitan refrescar el propósito del área, sus servicios
                    y el funcionamiento de Meltwater, lo pueden consultar en el
                    siguiente link.
                  </span>
                  <span>
                    Presentación Meltwater:{" "}
                    <a href="#" className="underline">
                      https://drive.google.com/%20le/d/17uUB9vbAYuYS1VlwHs3acTeHl7DKZGFp/vi%20ew?usp=sharing
                    </a>
                  </span>
                  <span>
                    Presentación Meltwater:{" "}
                    <a href="#" className="underline">
                      https://drive.google.com/%20le/d/17uUB9vbAYuYS1VlwHs3acTeHl7DKZGFp/vi%20ew?usp=sharing
                    </a>
                  </span>
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
                    <ColumnTableRequest
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
                        endpoint={"DataUniverseRequest"}
                        setTooltipSuccess={setTooltipSuccess}
                        setTooltipError={setTooltipError}
                        section={"requestsData"}
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
                    0 horas
                  </span>
                </div>
                <div className="flex gap-2 items-center">
                  <p className="text-xl text-primary-red-600 font-semibold">
                    Horas totales:
                  </p>
                  <span className="py-1 px-4 rounded-lg text-white font-base bg-primary-blue-500">
                    0 horas
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

export default RequestDataContent;
