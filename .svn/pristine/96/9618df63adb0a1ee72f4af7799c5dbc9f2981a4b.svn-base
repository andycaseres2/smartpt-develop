import { useEffect, useState } from "react";
import Tabs from "../../components/Tabs/Tabs";
import { stateStore } from "../../store/stateStore";
import SelectGeneric from "../../components/Selects/SelectGeneric";
import Pagination from "../../components/Paginations/Pagination";
import InputDate from "../../components/Inputs/InputDate";
import ButtonWithIcon from "../../components/Buttons/ButtonWithIcon";
import Select from "../../components/Selects/Select";
import CirclePlus from "../../assets/Icons/CirclePlus";
import TimeInput from "../../components/Inputs/TimeInput";
import { postData } from "../../services/postData";
import RowTable from "../../components/Tables/RowTable";
import ColumnTable from "../../components/Tables/ColumnTable";
import { getData } from "../../services/getData";
import CleanIcon from "../../assets/Icons/CleanIcon";
import { userStore } from "../../store/userStore";

const WorkerRequest = ({
  requests,
  setRequests,
  totalPages,
  setTooltipSuccess,
  setTooltipError,
  loading,
  setLoading,
  setRealTime,
  columnWidths,
}) => {
  const [activeTab, setActiveTab] = useState(1);
  const {
    setOpenNotifications,
    clients,
    activities,
    processes,
    designFormats,
    designPieces,
    setCancelEdit,
  } = stateStore();
  const [stateRow, setStateRow] = useState({});
  const [updateActivities, setUpdateActivities] = useState([]);
  const [initialOptionClient, setInitialOptionClient] = useState("Cliente");
  const [initialOptionFormat, setInitialOptionFormat] = useState("Formato");
  const [initialOptionPeace, setInitialOptionPeace] = useState("Pieza");
  const [urlBase, setUrlBase] = useState(`
    ${
      import.meta.env.VITE_REACT_APP_URL_BASE
    }FormattedDesignRequest?page=1&size=10`);
  const [fieldReset, setFieldReset] = useState(false);
  const { token, user } = userStore();

  useEffect(() => {
    if (fieldReset) {
      const timer = setTimeout(() => {
        setFieldReset(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [fieldReset]);

  const handleCleanFilters = async () => {
    setFieldReset(true);
    setInitialOptionClient("Clientes");
    setInitialOptionFormat("Formato");
    setInitialOptionPeace("Pieza");
    const baseUrl = import.meta.env.VITE_REACT_APP_URL_BASE;
    let tasksEndpoint = "";
    if (activeTab === 2) {
      tasksEndpoint = `${baseUrl}FormattedDesignRequest?page=1&size=100`;
    } else if (activeTab === 3) {
      tasksEndpoint = `${baseUrl}FormattedDesignRequest?consolidated=true&page=1&size=10`;
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

  async function createRequest() {
    try {
      const body = stateRow;
      // Definir la URL base
      const baseUrl = import.meta.env.VITE_REACT_APP_URL_BASE;

      const employeesId = user.id;

      body.idemployeeasigned = Number(employeesId);
      if (!body.estimatedtime) {
        body.estimatedtime = 0;
      }

      // Construir la URL del endpoint para las tareas
      const tasksEndpoint = `${baseUrl}DesignRequest`;
      // Enviar los datos modificados al servidor utilizando la función postData
      body.realtime = null;
      body.idemployeeassigned = null;
      await postData(tasksEndpoint, body, token);
      setStateRow({});
      setTooltipSuccess("Registro creada con exito");
      setFieldReset(true);
    } catch (error) {
      // Manejar el error aquí
      console.error("Error al crear la tarea:", error);

      // Puedes definir un estado de error y guardarlo en tu componente si es necesario
      setTooltipError("Hubo un error al crear el registro");
    }
  }

  const handleTabClick = async (tab) => {
    setActiveTab(tab);
    setLoading(true); // Activar indicador de carga
    setCancelEdit(true);
    try {
      const baseUrl = import.meta.env.VITE_REACT_APP_URL_BASE;
      let tasksEndpoint = "";
      let initialOptions = {};

      if (tab === 3) {
        tasksEndpoint = `${baseUrl}FormattedDesignRequest?consolidated=true&page=1&size=10`;
        initialOptions = {
          client: "Clientes",
        };
        setCancelEdit(true);
      } else if (tab === 2) {
        tasksEndpoint = `${baseUrl}FormattedDesignRequest?page=1&size=100`;
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

  const columnTitles = [
    "Cliente",
    "Formato",
    "Pieza ",
    "Descripción pieza",
    "Requerimientos pieza ",
    "Fecha de entrega ",
    "Responsable",
    "Horas estimadas",
    "Horas reales",
    "Fecha de trabajo ",
    "Estado ",
    "Observaciones ",
    "",
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

      <div className="bg-white rounded-bl-md rounded-r-md overflow-auto h-[660px]">
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

export default WorkerRequest;
