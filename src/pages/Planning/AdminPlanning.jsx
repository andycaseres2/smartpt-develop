import { useEffect, useState } from "react";
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
import { getData } from "../../services/getData";
import TotalTimes from "../../components/Texts/TotalTimes";
import CleanIcon from "../../assets/Icons/CleanIcon";
import Spinner from "../../components/Spinners/Spinner";
import SelectState from "../../components/Selects/SelectState";
import { postData } from "../../services/postData";
import { userStore } from "../../store/userStore";
import ModalConfirmation from "../../components/Modals/ModalConfirmation";

const AdminPlanning = ({
  tasks,
  setTasks,
  setRealTime,
  realTime,
  totalPages,
  setTooltipSuccess,
  setTooltipError,
  columnTitles,
  taskFullyLoaded,
  loading,
  setLoading,
}) => {
  const [activeTab, setActiveTab] = useState(1);
  const { token, user } = userStore();
  const {
    setOpenNotifications,
    newTaskEmpty,
    activitiesByProcess,
    clients,
    activities,
    processes,
    setCancelEdit,
    employees,
    statusModeEdit,
    setUpdateNotifications,
  } = stateStore();
  const [selectedFrequencyOption, setselectedFrequencyOption] =
    useState("Semanal");
  const [selectedMonthOption, setselectedMonthOption] = useState("Septiembre");

  const [stateRow, setStateRow] = useState({});
  console.log("stateRow", stateRow);
  const [initialOptionClient, setInitialOptionClient] = useState("Cliente");
  const [initialOptionSelectActivity, setInitialOptionSelectActivity] =
    useState("Actividad");
  const [initialOptionSelectProcess, setInitialOptionSelectProcess] =
    useState("Proceso");
  const [updateActivities, setUpdateActivities] = useState([]);
  const [urlBase, setUrlBase] = useState(`
    ${
      import.meta.env.VITE_REACT_APP_URL_BASE
    }FormattedTask?page=1&size=10&IdEmployee=${user.id}`);
  const [fieldReset, setFieldReset] = useState(false);
  const [initialOptionState, setInitialOptionState] = useState("Estados");
  const [taskbyEmployee, setTaskByEmployee] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [totalTimes, setTotalTimes] = useState(0);
  const [asignedActividity, setAsignedActividity] = useState(false);
  const [responsable, setResponsable] = useState("");

  useEffect(() => {
    if (employees) {
      setSelectedUserId(employees[0]?.id);
    }
  }, [employees]);

  useEffect(() => {
    if (selectedUserId !== null) {
      setLoading(true); // Activar indicador de carga
      const fetchDataOnMount = async () => {
        try {
          const employeesTaskEndpoint = `${
            import.meta.env.VITE_REACT_APP_URL_BASE
          }FormattedTask?page=1&size=100&IdEmployee=${selectedUserId}`;

          const employeesDataTask = await getData(employeesTaskEndpoint, token);

          // Aplicamos la lógica a cada subarray dentro de employeesDataTask
          const formatArray = employeesDataTask.map((subarray) => {
            // Eliminar el elemento con key_name 'comments' antes de formatear
            const filteredSubarray = subarray.filter(
              (item) => item.key_name !== "comments"
            );
            const firstFive = filteredSubarray.slice(0, 8); // Tomamos los primeros 5 elementos
            const lastElement = filteredSubarray[filteredSubarray.length - 1]; // Tomamos el último elemento
            return [...firstFive, lastElement]; // Concatenamos los primeros 5 con el último
          });
          setTaskByEmployee(formatArray);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false); // Desactivar indicador de carga, ya sea éxito o error
        }
      };

      fetchDataOnMount();
    }
  }, [selectedUserId, realTime]);

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
    arr?.forEach((innerArray) => {
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
    const found = clients.find((client) => client.name === value);
    if (found && !uniqueMap[found.id]) {
      uniqueMap[found.id] = true; // Registrar el id como único
      newClients.push(found);
    }
  });

  const handleTabClick = async (tab) => {
    setActiveTab(tab);
    setLoading(true);
    setCancelEdit(true);
    setStateRow({});
    try {
      const baseUrl = import.meta.env.VITE_REACT_APP_URL_BASE;
      let tasksEndpoint = "";
      let initialOptions = {};

      if (tab === 4) {
        tasksEndpoint = `${baseUrl}FormattedTask?consolidated=true&page=1&size=10&IdEmployee=${user.id}`;
        initialOptions = {
          client: "Clientes",
          activity: "Actividad",
          process: "Proceso",
        };
        setCancelEdit(true);
        setUrlBase(tasksEndpoint);
        const tasksData = await getData(tasksEndpoint, token);
        setTasks(tasksData);
      } else if (tab === 3) {
        tasksEndpoint = `${baseUrl}FormattedTask?page=1&size=100&IdEmployee=${user.id}`;
        initialOptions = {
          client: "Clientes",
        };
        setCancelEdit(true);
        setUrlBase(tasksEndpoint);
        const tasksData = await getData(tasksEndpoint, token);
        setTasks(tasksData);
      }

      setInitialOptionClient(initialOptions.client);
      if (initialOptions.activity)
        setInitialOptionSelectActivity(initialOptions.activity);
      if (initialOptions.process)
        setInitialOptionSelectProcess(initialOptions.process);
    } catch (error) {
      console.error("Error al obtener datos de las tareas:", error);
    } finally {
      setLoading(false);
      setCancelEdit(true);
    }
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

  const handleUserSelection = (clientId) => {
    setSelectedUserId(clientId);
    setResetFieldsAssinedTask(true);
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
  ];

  const columnWidthsActivity = [
    "w-44", // Ancho para Columna 1
    "w-[400px]", // Ancho para Columna 2
    "w-44", // Ancho para Columna 3
    "w-44", // Ancho para Columna 4
    "w-52", // Ancho para Columna 5
    "w-52", // Ancho para Columna 6
    "w-64", // Ancho para Columna 7
    "w-44", // Ancho para Columna 8
  ];

  const columnsAddActivity = [
    "Cliente",
    "Tarea",
    "Fecha inicio",
    "Fecha estimada",
    "Estado",
    "Proceso",
    "Actividad",
    "Hora estimada",
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

  const [resetFieldsAssinedTask, setResetFieldsAssinedTask] = useState(false);

  const listAddActivity = [
    {
      data: "",
      editComponent: "select",
      type: null,
      options: clients,
      key_name: "idcustomer",
    },
    {
      data: "",
      editComponent: "input",
      type: "text",
      options: [],
      key_name: "name",
    },
    {
      data: "",
      editComponent: "input",
      type: "date",
      options: [],
      key_name: "startdate",
    },
    {
      data: "",
      editComponent: "input",
      type: "date",
      options: [],
      key_name: "estimateddate",
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
      key_name: "state",
    },
    {
      data: "",
      editComponent: "select",
      type: null,
      options: processes,
      key_name: "idprocesses",
    },
    {
      data: "",
      editComponent: "select",
      type: null,
      options: updateActivities || activities,
      key_name: "idactivity",
    },
    {
      data: 0,
      editComponent: "input",
      type: "time",
      options: [],
      key_name: "estimatedtime",
    },
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

  const [newTaskAdd, setNewTaskAdd] = useState(false);
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
    setInitialOptionState("Estados");
    const baseUrl = import.meta.env.VITE_REACT_APP_URL_BASE;
    let tasksEndpoint = "";
    if (activeTab === 3) {
      tasksEndpoint = `${baseUrl}FormattedTask?page=1&size=100&IdEmployee=${user.id}`;
    } else if (activeTab === 4) {
      tasksEndpoint = `${baseUrl}FormattedTask?consolidated=true&page=1&size=10&IdEmployee=${user.id}`;
    }
    setUrlBase(tasksEndpoint);
    try {
      const tasksData = await getData(tasksEndpoint, token);
      setTasks(tasksData);
    } catch (error) {
      console.error("Error fetching clients data:", error);
    }

    setFieldReset(false);
  };

  useEffect(() => {
    if (resetFieldsAssinedTask) {
      const timer = setTimeout(() => {
        setResetFieldsAssinedTask(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [resetFieldsAssinedTask]);

  const handleAsignedEmployee = async (idTask) => {
    try {
      const asignedEndpoint = `${
        import.meta.env.VITE_REACT_APP_URL_BASE
      }AsignedTask`;
      const employeeassignerId = user.id;
      const body = {
        idemployeeassigner: employeeassignerId,
        idemployeeassigned: selectedUserId,
        idtask: idTask,
        dateassigned: new Date().toISOString(),
        accepted: 1,
        dateaccepted: new Date().toISOString(),
      };
      await postData(asignedEndpoint, body, token);
    } catch (error) {
      console.error("Error al asignar el empleado:", error);
    } finally {
      setUpdateNotifications(true);
      setResetFieldsAssinedTask(true);
    }
  };

  const handleAsignedTask = async () => {
    try {
      // Obtener el objeto stateRow
      let body = { ...stateRow };

      // Verificar si las propiedades requeridas existen en el objeto body

      // Eliminar la propiedad 'null' del objeto
      if ("null" in body) {
        delete body["null"];
      }

      if (!body.estimatedtime) {
        body.estimatedtime = 0;
      }
      if (!body.comments) {
        body.comments = "";
      }

      if (!body.attachments) {
        body.attachments = "";
      }
      // Establecer los demás estados en null
      const keysToSetNull = [
        "id",
        "idcustomer",
        "idactivity",
        "realtimespent",
        "realenddate",
      ];

      keysToSetNull.forEach((key) => {
        if (!(key in body)) {
          body[key] = null;
        }
      });

      // Agregar la propiedad 'IdEmployeeAsigned' con el valor 1 al objeto
      body.idemployeeasigned = selectedUserId;
      body.state = 1;

      // Definir la URL base
      const baseUrl = import.meta.env.VITE_REACT_APP_URL_BASE;

      // Construir la URL del endpoint para las tareas
      const tasksEndpoint = `${baseUrl}Task`;
      if (selectedUserId) {
        const newTask = await postData(tasksEndpoint, body, token);
        handleAsignedEmployee(newTask.id);
      }
      setResetFieldsAssinedTask(true);
      setRealTime(true);
      setStateRow({});
      setTooltipSuccess("Tarea creada con éxito");
    } catch (error) {
      console.error("Error al crear la tarea:", error);
      setTooltipError("Hubo un error al crear la tarea");
    } finally {
      setUpdateNotifications(true);
      setStateRow({});
      setResetFieldsAssinedTask(true);
      setRealTime(true);
      setAsignedActividity(false);
    }
  };

  useEffect(() => {
    // Verificar si tasks tiene al menos un elemento antes de acceder
    if (tasks && tasks.length > 0 && activeTab === 3) {
      // Filtrar elementos que tienen un valor válido para "EstimatedTime"
      const validTasks = tasks.filter((objeto) => {
        const estimatedTimeObject = objeto.find(
          (propiedad) => propiedad.key_name === "estimatedtime"
        );
        return estimatedTimeObject && estimatedTimeObject.data !== null;
      });

      // Obtener los valores de "EstimatedTime"
      const estimatedTimes = validTasks.map((objeto) => {
        const estimatedTimeObject = objeto.find(
          (propiedad) => propiedad.key_name === "estimatedtime"
        );
        return estimatedTimeObject ? estimatedTimeObject.data : null;
      });

      // Filtrar los valores nulos
      const validEstimatedTimes = estimatedTimes.filter(
        (valor) => valor !== null
      );

      // Sumar los valores válidos
      const total = validEstimatedTimes.reduce(
        (acumulador, valorActual) => acumulador + valorActual,
        0
      );

      // Actualizar el estado con los valores obtenidos
      setTotalTimes(Math.round(total / 60));
    }
  }, [tasks]);

  useEffect(() => {
    if (selectedUserId !== undefined && employees.length > 0) {
      const employee = employees.find(
        (employee) => employee.id === selectedUserId
      );
      setResponsable(employee?.fullname);
    }
  }, [selectedUserId, employees]);

  // Función para manejar la acción del botón
  const handleAction = () => {
    // Verificar que los valores existan en el objeto stateRow
    if (
      stateRow &&
      stateRow.idcustomer &&
      stateRow.name &&
      stateRow.startdate &&
      stateRow.estimateddate &&
      stateRow.idprocesses
    ) {
      // Ejecutar la acción si todos los valores están presentes
      setAsignedActividity(true);
    } else {
      // Mostrar un mensaje de error si faltan algunos valores
      setTooltipError("Faltan valores por rellenar");
      // O cualquier otra lógica que desees para manejar el error
    }
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
          {activeTab === 3 && <TotalTimes totalTimes={totalTimes} />}
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
          <div className="flex  flex-wrap justify-end gap-3 items-center mb-2">
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
              action={() => !statusModeEdit && !loading && addTask()}
            />
            <ButtonWithIcon
              text={"Limpiar filtros"}
              icon={<CleanIcon />}
              action={handleCleanFilters}
            />
          </div>
        )}

        {activeTab === 4 && (
          <div className="flex flex-wrap gap-2 items-center mb-2 w-full justify-end">
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
            <SelectState
              options={filterState}
              setTasks={setTasks}
              newFilter={"state"}
              initialOption={initialOptionState}
              setInitialOption={setInitialOptionState}
              isFilter={true}
              urlBase={urlBase}
              setUrlBase={setUrlBase}
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

      <div className="bg-white rounded-bl-md rounded-r-md overflow-auto h-[600px] px-4 pt-4 shadow-lg">
        {activeTab === 1 && (
          <div className="flex w-full h-full gap-3">
            <WorkerList
              employees={employees}
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
                          columnTitlesActivity={columnTitles}
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
                employees={employees}
                onSelect={handleUserSelection}
                selectedId={selectedUserId}
              />
              <div className="w-full flex flex-col overflow-y-auto  rounded-md gap-5">
                {selectedUserId !== 0 && (
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
                          columnWidths={columnWidthsActivity}
                          readOnly={false}
                        />
                      </thead>
                      <tbody className="border-b border-gray-300">
                        <RowTableNewActivity
                          listItems={listAddActivity}
                          columnWidths={columnWidthsActivity}
                          stateRow={stateRow}
                          handleChange={handleChange}
                          readOnly={false}
                          editStatus={true}
                          editMode={true}
                          showButtonsEdit={false}
                          handleSelectProcess={handleSelectProcess}
                          resetFieldsAssinedTask={resetFieldsAssinedTask}
                        />
                      </tbody>
                    </table>

                    <div className="w-full flex justify-end p-4">
                      <ButtonWithIcon
                        text={"Añadir actividad"}
                        disabled={false}
                        icon={<CirclePlus />}
                        action={handleAction}
                      />
                    </div>
                  </div>
                )}

                <div
                  className={`min-w-max h-full border border-gray-200 rounded-md shadow-lg overflow-hidden overflow-y-auto`}
                >
                  <div className="w-full p-3">
                    <h2 className="text-xl text-primary-red-600 font-semibold">
                      Tareas asignadas semana 4/12/2023 - 8/12/2023
                    </h2>
                  </div>

                  <table className="min-w-full">
                    <thead>
                      <ColumnTableAddActivity
                        columnTitlesActivity={columnsAddActivity}
                        columnWidths={columnWidthsActivity}
                        readOnly={false}
                      />
                    </thead>
                    <tbody className="">
                      {loading ? (
                        <div className="w-full h-[600px] flex top-[100px] relative left-[500px]">
                          <Spinner design={"!h-[50px] !w-[50px]"} />
                        </div>
                      ) : (
                        <>
                          {taskbyEmployee.map((item, index) => (
                            <RowTable
                              key={index}
                              index={index}
                              listItems={item}
                              columnWidths={columnWidthsActivity}
                              stateRow={stateRow}
                              handleChange={handleChange}
                              editStatus={true}
                              newTaskAdd={newTaskAdd}
                              setNewTaskAdd={setNewTaskAdd}
                              setRealTime={setRealTime}
                              setStateRow={setStateRow}
                              setTooltipSuccess={setTooltipSuccess}
                              setTooltipError={setTooltipError}
                              cancelAddTask={cancelAddTask}
                              activeTab={activeTab}
                            />
                          ))}
                        </>
                      )}
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
                    columnTitlesActivity={columnTitles}
                    columnWidths={columnWidths}
                    readOnly={false}
                  />
                </thead>
                <tbody className="">
                  {loading ? (
                    <div className="w-full h-[600px] flex top-[200px] relative left-[600px]">
                      <Spinner design={"!h-[60px] !w-[60px]"} />
                    </div>
                  ) : (
                    <>
                      {tasks.map((item, index) => (
                        <RowTable
                          key={index}
                          index={index}
                          listItems={item}
                          columnWidths={columnWidths}
                          stateRow={stateRow}
                          handleChange={handleChange}
                          editStatus={true}
                          newTaskAdd={newTaskAdd}
                          setNewTaskAdd={setNewTaskAdd}
                          setRealTime={setRealTime}
                          setStateRow={setStateRow}
                          setTooltipSuccess={setTooltipSuccess}
                          setTooltipError={setTooltipError}
                          cancelAddTask={cancelAddTask}
                          section="planning"
                          handleCleanFilters={handleCleanFilters}
                          endpoint={"Task"}
                        />
                      ))}
                    </>
                  )}
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
                    columnTitlesActivity={columnTitles}
                    columnWidths={columnWidths}
                    readOnly={true}
                  />
                </thead>
                <tbody className="">
                  {loading ? (
                    <div className="w-full h-[600px] flex top-[200px] relative left-[600px]">
                      <Spinner design={"!h-[60px] !w-[60px]"} />
                    </div>
                  ) : (
                    <>
                      {tasks.map((item, index) => (
                        <RowTable
                          key={index}
                          listItems={item}
                          columnWidths={columnWidths}
                          stateRow={stateRow}
                          handleChange={handleChange}
                          readOnly={true}
                          newTaskAdd={newTaskAdd}
                          setNewTaskAdd={setNewTaskAdd}
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
      {activeTab === 4 && (
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

      {activeTab === 2 && asignedActividity && (
        <ModalConfirmation
          onClose={() => setAsignedActividity(false)}
          handleCancel={handleAsignedTask}
          text={`Esta seguro que desea asignar la tarea "${stateRow["name"]}" al responsable ${responsable}`}
          designModal={"!w-[60%]"}
        />
      )}
    </div>
  );
};

export default AdminPlanning;
