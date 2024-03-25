import Header from "../../components/Header/Header";
import RequestDataContent from "./RequestDataContent";
import { getData } from "../../services/getData";
import { stateStore } from "../../store/stateStore";
import { useEffect } from "react";
import { useState } from "react";
import CircleCheck from "../../assets/Icons/CircleCheck";
import WarningCircle from "../../assets/Icons/WarningCircle";
import Tooltip from "../../components/Tooltips/Tooltip";
import { userStore } from "../../store/userStore";

const RequestsData = () => {
  const {
    setClients,
    setActivities,
    setProcesses,
    setEmployees,
    setServicesType,
  } = stateStore();
  const [realTime, setRealTime] = useState(true);
  const [requests, setRequests] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [tooltipSuccess, setTooltipSuccess] = useState("");
  const [tooltipError, setTooltipError] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentWeek, setCurrentWeek] = useState([]);
  const { token } = userStore();

  useEffect(() => {
    const baseUrl = import.meta.env.VITE_REACT_APP_URL_BASE;
    const clientsEndpoint = `${baseUrl}Customer`;
    const activitiesEndpoint = `${baseUrl}Activity`;
    const processesEndpoint = `${baseUrl}Process?indatauniverse=true`;
    const servicesTypesEndpoint = `${baseUrl}ServiceType?page=1&size=100`;
    const tasksEndpoint = `${baseUrl}FormattedDataUniverseRequest?page=1&size=100`;
    const paginations = `${baseUrl}FormattedDataUniverseRequest/Pages`;
    const currentWeekEndpoint = `${baseUrl}FormattedDataUniverseRequest/CurrentWeek`;

    const fetchDataOnMount = async () => {
      try {
        const tasksData = await getData(tasksEndpoint, token);
        setRequests(tasksData);
      } catch (error) {
        console.error("Error fetching tasks data:", error);
      }

      try {
        const clientsData = await getData(clientsEndpoint, token);
        setClients(clientsData);
      } catch (error) {
        console.error("Error fetching clients data:", error);
      }

      try {
        const paginationsData = await getData(paginations, token);
        const totalPages = Math.ceil(paginationsData / 10); // Redondear hacia arriba para asegurarse de que todas las tareas se muestren
        setTotalPages(totalPages);
      } catch (error) {
        console.error("Error fetching paginations data:", error);
      }

      try {
        const currentWeekData = await getData(currentWeekEndpoint, token);
        setCurrentWeek(currentWeekData);
      } catch (error) {
        console.error("Error fetching paginations data:", error);
      }

      try {
        const servicesTypeData = await getData(servicesTypesEndpoint, token);
        setServicesType(servicesTypeData);
      } catch (error) {
        console.error("Error fetching clients data:", error);
      }

      try {
        const activitiesData = await getData(activitiesEndpoint, token);
        setActivities(activitiesData);
      } catch (error) {
        console.error("Error fetching activities data:", error);
      }

      try {
        const processesData = await getData(processesEndpoint, token);
        setProcesses(processesData);
      } catch (error) {
        console.error("Error fetching processes data:", error);
      }

      try {
        const employeesData = await getData(`${baseUrl}Employee`, token);
        setEmployees(employeesData);
      } catch (error) {
        console.error("Error fetching employees data:", error);
      }
    };

    fetchDataOnMount();
    setRealTime(false);
  }, [realTime]);

  useEffect(() => {
    if (tooltipSuccess || tooltipError) {
      const timer = setTimeout(() => {
        setTooltipSuccess("");
        setTooltipError("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [tooltipSuccess, tooltipError]);

  const columnWidths = [
    "w-44", // Ancho para Columna 1
    "w-[400px]", // Ancho para Columna 2
    "w-44", // Ancho para Columna 3
    "w-44", // Ancho para Columna 4
    "w-[400px]", // Ancho para Columna 5
    "w-44", // Ancho para Columna 6
    "w-44", // Ancho para Columna 7
    "w-44", // Ancho para Columna 8
    "w-32", // Ancho para Columna 9
    "w-32", // Ancho para Columna 10
    "w-44", // Ancho para Columna 11
    "w-52", // Ancho para Columna 12
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
    "Fecha de trabajo ",
    "Estado ",
    "Interesado",
    "",
  ];

  return (
    <div className="flex flex-col w-full h-screen">
      <Header
        title="Solicitudes data universe"
        date={currentWeek}
        textColor={"text-primary-blue-500"}
      />
      <div className="w-full flex flex-col bg-primary-lightblue-50 py-4 px-6 h-full overflow-hidden overflow-y-auto">
        <RequestDataContent
          setRealTime={setRealTime}
          requests={requests}
          setRequests={setRequests}
          totalPages={totalPages}
          setTooltipSuccess={setTooltipSuccess}
          setTooltipError={setTooltipError}
          loading={loading}
          setLoading={setLoading}
          columnWidths={columnWidths}
          columnTitles={columnTitles}
        />
      </div>

      {tooltipSuccess && (
        <Tooltip
          text={tooltipSuccess}
          icon={<CircleCheck fill={"#60D935"} className={"w-7 h-7"} />}
          color="bg-primary-green-500"
        />
      )}

      {tooltipError && (
        <Tooltip
          text={tooltipError}
          icon={<WarningCircle stroke={"#F70000"} className={"w-7 h-7"} />}
          color="bg-primary-red-500"
        />
      )}
    </div>
  );
};

export default RequestsData;
