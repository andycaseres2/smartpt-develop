import Header from "../../components/Header/Header";
import BudgetContent from "./BudgetContent";
import { getData } from "../../services/getData";
import { stateStore } from "../../store/stateStore";
import { useEffect, useState } from "react";
import { userStore } from "../../store/userStore";

const Budget = () => {
  const { token, user } = userStore();
  const [realTime, setRealTime] = useState(true);
  const [loading, setLoading] = useState(false);
  const [tooltipSuccess, setTooltipSuccess] = useState("");
  const [tooltipError, setTooltipError] = useState("");
  const [currentWeek, setCurrentWeek] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [taskFullyLoaded, setTaskFullyLoaded] = useState(false);

  const { setProcesses, setClients, setActivities, setEmployees } =
    stateStore();

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
    setLoading(true); // Activar indicador de carga

    const fetchDataOnMount = async () => {
      try {
        const baseUrl = import.meta.env.VITE_REACT_APP_URL_BASE;
        const clientsEndpoint = `${baseUrl}Customer`;
        const tasksEndpoint = `${baseUrl}FormattedTask?page=1&size=100&IdEmployee=${user.id}`;
        const activitiesEndpoint = `${baseUrl}Activity`;
        const processesEndpoint = `${baseUrl}Process?intask=true`;
        const paginationsEndpoint = `${baseUrl}FormattedTask/Pages`;
        const currentWeekEndpoint = `${baseUrl}FormattedTask/CurrentWeek`;
        const employeesEndpoint = `${baseUrl}Employee`;

        const employeesData = await getData(employeesEndpoint, token);
        setEmployees(employeesData);

        const currentWeekData = await getData(currentWeekEndpoint, token);
        setCurrentWeek(currentWeekData);

        const clientsData = await getData(clientsEndpoint, token);
        setClients(clientsData);

        const tasksData = await getData(tasksEndpoint, token);
        setTasks(tasksData);
        setTaskFullyLoaded(true);

        const activitiesData = await getData(activitiesEndpoint, token);
        setActivities(activitiesData);

        const processesData = await getData(processesEndpoint, token);
        setProcesses(processesData);

        const paginationsData = await getData(paginationsEndpoint, token);
        const totalPages = Math.ceil(paginationsData / 10);
        setTotalPages(totalPages);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Desactivar indicador de carga, ya sea éxito o error
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
    "w-52", // Ancho para Columna 13
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
    "Interesado",
    "",
  ];

  return (
    <div className="flex flex-col w-full h-screen">
      <Header title="Presupuesto clientes" date={currentWeek} />
      <div className="w-full flex flex-col bg-primary-blue-50 py-4 px-6 h-full">
        <BudgetContent />
      </div>
    </div>
  );
};

export default Budget;
