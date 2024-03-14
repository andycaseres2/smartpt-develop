import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { getData } from "../../services/getData";
import DashboardContent from "./DashboardContent";
import { stateStore } from "../../store/stateStore";
import { userStore } from "../../store/userStore";

const Dashboard = () => {
  const { token } = userStore();
  const [realTime, setRealTime] = useState(true);
  const [tooltipSuccess, setTooltipSuccess] = useState("");
  const [tooltipError, setTooltipError] = useState("");
  const [currentWeek, setCurrentWeek] = useState([]);
  const [dashboard, setDashboard] = useState([]);
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
    // Activar indicador de carga
    ("2024-02-28T00:00:00");
    const fetchDataOnMount = async () => {
      try {
        const baseUrl = import.meta.env.VITE_REACT_APP_URL_BASE;
        const clientsEndpoint = `${baseUrl}Customer`;
        const dashBoardEndpoint = `${baseUrl}Dashboard?reporte=${1}&startDate=${"2024-03-01T00:00:00"}&endDate=${"2024-03-31T00:00:00"}`;
        const activitiesEndpoint = `${baseUrl}Activity`;
        const processesEndpoint = `${baseUrl}Process?intask=true`;
        const currentWeekEndpoint = `${baseUrl}Dashboard/CurrentWeek`;
        const employeesEndpoint = `${baseUrl}Employee`;

        const employeesData = await getData(employeesEndpoint, token);
        setEmployees(employeesData);

        const currentWeekData = await getData(currentWeekEndpoint, token);
        setCurrentWeek(currentWeekData);

        const clientsData = await getData(clientsEndpoint, token);
        setClients(clientsData);

        const dashBoardData = await getData(dashBoardEndpoint, token);
        setDashboard(dashBoardData);

        const activitiesData = await getData(activitiesEndpoint, token);
        setActivities(activitiesData);

        const processesData = await getData(processesEndpoint, token);
        setProcesses(processesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataOnMount();
    setRealTime(false);
  }, [realTime]);

  return (
    <div className="flex flex-col w-full h-full">
      <Header
        title="Dashboard"
        date={currentWeek}
        userName="Kenet Sebastián Segura Murillo"
      />
      <div className="w-full flex flex-col bg-primary-purple-50 py-4 px-6 h-full">
        <DashboardContent
          dashboard={dashboard}
          setRealTime={setRealTime}
          realTime={realTime}
        />
      </div>
    </div>
  );
};

export default Dashboard;
