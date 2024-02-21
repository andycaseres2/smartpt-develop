import Header from "../../components/Header/Header";
import AdminRequest from "./AdminRequest";
import WorkerRequest from "./WorkerRequest";
import { getData } from "../../services/getData";
import { stateStore } from "../../store/stateStore";
import { useEffect, useState } from "react";
import Tooltip from "../../components/Tooltips/Tooltip";
import CircleCheck from "../../assets/Icons/CircleCheck";
import WarningCircle from "../../assets/Icons/WarningCircle";

const Requests = () => {
  const userRole = import.meta.env.VITE_REACT_APP_ROLE;
  const {
    setClients,
    setActivities,
    setProcesses,
    setEmployees,
    setDesignFormats,
    setDesignPieces,
  } = stateStore();
  const [realTime, setRealTime] = useState(true);
  const [requests, setRequests] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [tooltipSuccess, setTooltipSuccess] = useState("");
  const [tooltipError, setTooltipError] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentWeek, setCurrentWeek] = useState([]);

  useEffect(() => {
    if (tooltipSuccess || tooltipError) {
      const timer = setTimeout(() => {
        setTooltipSuccess("");
        setTooltipError("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [tooltipSuccess, tooltipError]);

  useEffect(() => {
    const fetchDataOnMount = async () => {
      try {
        const baseUrl = import.meta.env.VITE_REACT_APP_URL_BASE;
        const clientsEndpoint = `${baseUrl}Customer`;
        const activitiesEndpoint = `${baseUrl}Activity`;
        const processesEndpoint = `${baseUrl}Process?indesignrequest=true`;
        const tasksEndpoint = `${baseUrl}FormattedDesignRequest?page=1&size=10`;
        const paginations = `${baseUrl}FormattedDesignRequest/Pages`;
        const currentWeekEndpoint = `${baseUrl}FormattedDesignRequest/CurrentWeek`;
        const employeesEndpoint = `${baseUrl}Employee`;
        const designFormatsEndpoint = `${baseUrl}DesignFormat`;
        const designPiecesEndpoint = `${baseUrl}DesignPiece`;

        const tasksData = await getData(tasksEndpoint);
        setRequests(tasksData);

        const currentWeekData = await getData(currentWeekEndpoint);
        setCurrentWeek(currentWeekData);

        const paginationsData = await getData(paginations);
        const totalPages = Math.ceil(paginationsData / 10);
        setTotalPages(totalPages);

        const clientsData = await getData(clientsEndpoint);
        setClients(clientsData);

        const activitiesData = await getData(activitiesEndpoint);
        setActivities(activitiesData);

        const processesData = await getData(processesEndpoint);
        setProcesses(processesData);

        const employeesData = await getData(employeesEndpoint);
        setEmployees(employeesData);

        const designFormatsData = await getData(designFormatsEndpoint);
        setDesignFormats(designFormatsData);

        const designPiecesData = await getData(designPiecesEndpoint);
        setDesignPieces(designPiecesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataOnMount();
    setRealTime(false);
  }, [realTime]);

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
    "w-44", // Ancho para Columna 10
    "w-64", // Ancho para Columna 11
    "w-44", // Ancho para Columna 12
  ];
  return (
    <div className="flex flex-col w-full h-screen">
      <Header
        title="Solicitudes de diseño"
        date={currentWeek}
        userName="Kenet Sebastián Segura Murillo"
      />
      <div className="w-full flex flex-col bg-primary-yellow-50 py-4 px-6 h-full">
        {userRole === "ADMIN" ? (
          <AdminRequest
            setRealTime={setRealTime}
            requests={requests}
            setRequests={setRequests}
            totalPages={totalPages}
            setTooltipSuccess={setTooltipSuccess}
            setTooltipError={setTooltipError}
            loading={loading}
            setLoading={setLoading}
            columnWidths={columnWidths}
          />
        ) : (
          <WorkerRequest
            setRealTime={setRealTime}
            requests={requests}
            setRequests={setRequests}
            totalPages={totalPages}
            setTooltipSuccess={setTooltipSuccess}
            setTooltipError={setTooltipError}
            loading={loading}
            setLoading={setLoading}
            columnWidths={columnWidths}
          />
        )}
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

export default Requests;
