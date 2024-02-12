import { useEffect, useState } from "react";
import ButtonWithIcon from "../../components/Buttons/ButtonWithIcon";
import Select from "../../components/Selects/Select";
import Tabs from "../../components/Tabs/Tabs";
import RowTable from "../../components/Tables/RowTable";
import ColumnTable from "../../components/Tables/ColumnTable";
import InputDate from "../../components/Inputs/InputDate";
import { stateStore } from "../../store/stateStore";
import Pagination from "../../components/Paginations/Pagination";
import CirclePlus from "../../assets/Icons/CirclePlus";
import { getData } from "../../services/getData";
import TotalTimes from "../../components/Texts/TotalTimes";
import CleanIcon from "../../assets/Icons/CleanIcon";
import Spinner from "../../components/Spinners/Spinner";

const WorkerPlanning = ({
  tasks,
  setTasks,
  setRealTime,
  totalTimes,
  totalPages,
  isNewTask,
  setTooltipSuccess,
  setTooltipError,
  columnTitles,
  taskFullyLoaded,
  loading,
  setLoading,
}) => {
  const { processes, newTaskEmpty, clients, activities } = stateStore();
  const [activeTab, setActiveTab] = useState(1);
  const [initialOptionClient, setInitialOptionClient] = useState("Cliente");
  const [initialOptionSelectActivity, setInitialOptionSelectActivity] =
    useState("Actividad");
  const [initialOptionSelectProcess, setInitialOptionSelectProcess] =
    useState("Proceso");
  const [stateRow, setStateRow] = useState({});
  const { setOpenNotifications, activitiesByProcess } = stateStore();
  const [updateActivities, setUpdateActivities] = useState([]);
  const [urlBase, setUrlBase] = useState(`
    ${import.meta.env.VITE_REACT_APP_URL_BASE}FormattedTask?page=1&size=10`);
  const [fieldReset, setFieldReset] = useState(false);
  const [newTaskAdd, setNewTaskAdd] = useState(false);

  useEffect(() => {
    setUpdateActivities(activities);
  }, [activities]);

  useEffect(() => {
    setInitialOptionSelectActivity("Actividad");
  }, [initialOptionSelectProcess]);

  useEffect(() => {
    // Actualizar el estado del array de tareas con las opciones actualizadas
    setTasks((prevTareas) => {
      if (prevTareas.length > 0 && activitiesByProcess.length > 0) {
        const nuevoArray = prevTareas[0].map((item) => {
          if (item?.key_name === "idactivity") {
            // Actualizar solo el objeto correspondiente a idactivity
            return { ...item, options: activitiesByProcess };
          }
          return item;
        });

        return [nuevoArray, ...prevTareas.slice(1)];
      }

      return prevTareas;
    });
  }, [activitiesByProcess]);

  const getDataValues = (arr) => {
    const result = [];
    arr.forEach((innerArray) => {
      innerArray.forEach((obj) => {
        if (obj?.key_name === "idcustomer") {
          result.push(obj.data);
        }
      });
    });
    return result;
  };

  const dataList = getDataValues(tasks);

  // Usar un objeto para llevar un registro de los elementos únicos
  const uniqueMap = {};
  const newClients = [];
  dataList.forEach((value) => {
    const found = clients.find((client) => client?.name === value);
    if (found && !uniqueMap[found.id]) {
      uniqueMap[found.id] = true; // Registrar el id como único
      newClients.push(found);
    }
  });

  const handleTabClick = async (tab) => {
    setActiveTab(tab);
    setLoading(true); // Activar indicador de carga

    try {
      const baseUrl = import.meta.env.VITE_REACT_APP_URL_BASE;
      let tasksEndpoint = "";
      let initialOptions = {};

      if (tab === 2) {
        tasksEndpoint = `${baseUrl}FormattedTask?consolidated=true&page=1&size=10`;
        initialOptions = {
          client: "Clientes",
          activity: "Actividad",
          process: "Proceso",
        };
      } else if (tab === 1) {
        tasksEndpoint = `${baseUrl}FormattedTask?page=1&size=100`;
        initialOptions = {
          client: "Clientes",
        };
      }

      setUrlBase(tasksEndpoint);
      const tasksData = await getData(tasksEndpoint);
      setTasks(tasksData);
      setInitialOptionClient(initialOptions.client);
      if (initialOptions.activity)
        setInitialOptionSelectActivity(initialOptions.activity);
      if (initialOptions.process)
        setInitialOptionSelectProcess(initialOptions.process);
    } catch (error) {
      console.error("Error al obtener datos de las tareas:", error);
    } finally {
      setLoading(false); // Desactivar indicador de carga, ya sea éxito o error
    }
  };

  const tabs = [
    { id: 1, label: "Actividades" },
    { id: 2, label: "Consolidado" },
  ];

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
  ];

  async function addTask() {
    if (taskFullyLoaded) {
      const nuevaTarea = newTaskEmpty.map((task, index) =>
        index === newTaskEmpty.length - 1 ? null : { ...task }
      );
      await setTasks((prev) => [nuevaTarea, ...prev]);
      setNewTaskAdd(true);
    }
  }

  function cancelAddTask() {
    // Implementa la lógica para eliminar la tarea recién creada
    setTasks((prev) => prev.slice(1));
    setNewTaskAdd(false);
  }

  const handleCleanFilters = async () => {
    setFieldReset(true);
    setInitialOptionClient("Clientes");
    setInitialOptionSelectActivity("Actividad");
    setInitialOptionSelectProcess("Proceso");
    const baseUrl = import.meta.env.VITE_REACT_APP_URL_BASE;
    const tasksEndpoint = `${baseUrl}FormattedTask?page=1&size=10`;
    try {
      const tasksData = await getData(tasksEndpoint);
      setTasks(tasksData);
    } catch (error) {
      console.error("Error fetching clients data:", error);
    }
    setFieldReset(false);
  };

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
          {activeTab === 1 && <TotalTimes totalTimes={totalTimes} />}
        </div>
        {activeTab === 1 ? (
          <div className="flex gap-3 items-center mb-2">
            <Select
              options={newClients}
              setTasks={setTasks}
              newFilter={"IdCustomer"}
              initialOption={initialOptionClient}
              setInitialOption={setInitialOptionClient}
              isFilter={true}
              urlBase={urlBase}
              setUrlBase={setUrlBase}
            />
            <ButtonWithIcon
              buttonColor={"bg-primary-red-600"}
              text={"Añadir actividad"}
              icon={<CirclePlus />}
              action={() => addTask()}
            />
            <ButtonWithIcon
              text={"Limpiar filtros"}
              icon={<CleanIcon />}
              action={handleCleanFilters}
            />
          </div>
        ) : (
          <div className="flex gap-3 items-center mb-2">
            <Select
              options={newClients}
              setTasks={setTasks}
              newFilter={"IdCustomer"}
              initialOption={initialOptionClient}
              setInitialOption={setInitialOptionClient}
              isFilter={true}
              urlBase={urlBase}
              setUrlBase={setUrlBase}
            />
            <Select
              options={updateActivities || activities}
              setTasks={setTasks}
              newFilter={"IdActivity"}
              initialOption={initialOptionSelectActivity}
              setInitialOption={setInitialOptionSelectActivity}
              consolided={true}
              isFilter={true}
              urlBase={urlBase}
              setUrlBase={setUrlBase}
            />
            <Select
              options={processes}
              setTasks={setTasks}
              initialOption={initialOptionSelectProcess}
              setInitialOption={setInitialOptionSelectProcess}
              handleSelect={handleSelectProcess}
            />
            <InputDate
              text={"Fecha inicio"}
              urlBase={urlBase}
              setUrlBase={setUrlBase}
              setTasks={setTasks}
              newFilter={"startDate"}
              fieldReset={fieldReset}
            />
            <InputDate
              text={"Fecha fin"}
              urlBase={urlBase}
              setUrlBase={setUrlBase}
              setTasks={setTasks}
              newFilter={"endDate"}
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

      <div className="bg-white rounded-bl-md rounded-r-md overflow-auto h-[660px] px-4">
        {activeTab === 1 && (
          <div className="overflow-x-auto h-full">
            <div className="min-w-max">
              <table className="min-w-full">
                <thead>
                  <ColumnTable
                    columnTitlesActivity={columnTitles}
                    columnWidths={columnWidths}
                    readOnly={false}
                  />
                </thead>
                <tbody className="w-full h-full">
                  {loading ? (
                    <div className="w-full h-[600px] flex top-[200px] relative left-[600px]">
                      <Spinner design={"!h-[60px] !w-[60px]"} />
                    </div>
                  ) : (
                    <>
                      {tasks?.map((item, index) => (
                        <RowTable
                          key={index}
                          index={index}
                          listItems={item}
                          columnWidths={columnWidths}
                          stateRow={stateRow}
                          setStateRow={setStateRow}
                          handleChange={handleChange}
                          editStatus={true}
                          newTaskAdd={newTaskAdd}
                          setNewTaskAdd={setNewTaskAdd}
                          setRealTime={setRealTime}
                          isNewTask={isNewTask}
                          setTooltipSuccess={setTooltipSuccess}
                          setTooltipError={setTooltipError}
                          cancelAddTask={cancelAddTask}
                        />
                      ))}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 2 && (
          <div className="overflow-x-auto h-full">
            <div className="min-w-max">
              <table className="min-w-full">
                <thead>
                  <ColumnTable
                    columnTitlesActivity={columnTitles}
                    columnWidths={columnWidths}
                    readOnly={true}
                  />
                </thead>
                <tbody className="w-full h-full">
                  {loading ? (
                    <div className="w-full h-[600px] flex top-[200px] relative left-[600px]">
                      <Spinner design={"!h-[60px] !w-[60px]"} />
                    </div>
                  ) : (
                    <>
                      {tasks?.map((item, index) => (
                        <RowTable
                          key={index}
                          listItems={item}
                          columnWidths={columnWidths}
                          stateRow={stateRow}
                          handleChange={handleChange}
                          readOnly={true}
                          newTaskAdd={newTaskAdd}
                          setStateRow={setStateRow}
                        />
                      ))}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      {activeTab === 2 && (
        <div className="flex justify-end">
          <Pagination
            setTasks={setTasks}
            totalPages={totalPages}
            urlBase={urlBase}
            setUrlBase={setUrlBase}
            setLoading={setLoading}
            loading={loading}
          />
        </div>
      )}
    </div>
  );
};

export default WorkerPlanning;
