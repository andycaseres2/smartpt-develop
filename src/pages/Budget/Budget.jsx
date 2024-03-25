<<<<<<< HEAD
import Header from "../../components/Header/Header";
import BudgetContent from "./BudgetContent";
import { getData } from "../../services/getData";
import { stateStore } from "../../store/stateStore";
import { useEffect, useState } from "react";
import { userStore } from "../../store/userStore";
import CircleCheck from "../../assets/Icons/CircleCheck";
import WarningCircle from "../../assets/Icons/WarningCircle";
import Tooltip from "../../components/Tooltips/Tooltip";

const Budget = () => {
  const { token, user } = userStore();
  const [realTime, setRealTime] = useState(true);
  const [loading, setLoading] = useState(false);
  const [tooltipSuccess, setTooltipSuccess] = useState("");
  const [tooltipError, setTooltipError] = useState("");
  const [currentWeek, setCurrentWeek] = useState([]);
  const [budget, setBudget] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [taskFullyLoaded, setTaskFullyLoaded] = useState(false);
  const { setProcesses, setClients, setActivities, setEmployees } =
    stateStore();
  const [tax, setTax] = useState([]);

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
        const budgetEndpoint = `${baseUrl}FormattedBudget?page=1&size=100&IdEmployee=${user.id}`;
        const activitiesEndpoint = `${baseUrl}Activity`;
        const processesEndpoint = `${baseUrl}Process?intask=true`;
        const paginationsEndpoint = `${baseUrl}FormattedBudget/Pages`;
        const currentWeekEndpoint = `${baseUrl}FormattedBudget/CurrentWeek`;
        const employeesEndpoint = `${baseUrl}Employee`;
        const taxEndpoint = `${baseUrl}Tax/1`;

        const employeesData = await getData(employeesEndpoint, token);
        setEmployees(employeesData);

        const taxData = await getData(taxEndpoint, token);
        setTax(taxData);

        const currentWeekData = await getData(currentWeekEndpoint, token);
        setCurrentWeek(currentWeekData);

        const clientsData = await getData(clientsEndpoint, token);
        setClients(clientsData);

        const budgetData = await getData(budgetEndpoint, token);
        setBudget(budgetData);
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

  const columnTitles = [
    "Cliente",
    "Nombre del servicio",
    "Vigencia presupuesto ",
    "Proceso",
    "Actividad",
    "Descripción",
    "Aprobado por cliente",
    "Aprobado por planeacion",
    "Interesado",
    "",
  ];

  const columnWidths = [
    "w-44",
    "w-[500px]",
    "w-[350px]",
    "w-[350px]",
    "w-[500px]",
    "w-[350px]",
    "w-52",
    "w-52",
    "w-60",
  ];

  return (
    <div className="flex flex-col w-full h-screen">
      <Header title="Presupuesto clientes" date={currentWeek} />
      <div className="w-full flex flex-col bg-primary-blue-50 py-4 px-6 h-full">
        <BudgetContent
          columnWidths={columnWidths}
          columnTitles={columnTitles}
          budget={budget}
          setBudget={setBudget}
          loading={loading}
          setLoading={setLoading}
          tooltipSuccess={tooltipSuccess}
          setTooltipSuccess={setTooltipSuccess}
          tooltipError={tooltipError}
          setTooltipError={setTooltipError}
          taskFullyLoaded={taskFullyLoaded}
          totalPages={totalPages}
          realTime={realTime}
          setRealTime={setRealTime}
          tax={tax}
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

export default Budget;
=======
import Header from "../../components/Header/Header";
import BudgetContent from "./BudgetContent";
import { getData } from "../../services/getData";
import { stateStore } from "../../store/stateStore";
import { useEffect, useState } from "react";
import { userStore } from "../../store/userStore";
import CircleCheck from "../../assets/Icons/CircleCheck";
import WarningCircle from "../../assets/Icons/WarningCircle";
import Tooltip from "../../components/Tooltips/Tooltip";

const Budget = () => {
  const { token, user } = userStore();
  const [realTime, setRealTime] = useState(true);
  const [loading, setLoading] = useState(false);
  const [tooltipSuccess, setTooltipSuccess] = useState("");
  const [tooltipError, setTooltipError] = useState("");
  const [currentWeek, setCurrentWeek] = useState([]);
  const [budget, setBudget] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [taskFullyLoaded, setTaskFullyLoaded] = useState(false);
  const { setProcesses, setClients, setActivities, setEmployees } =
    stateStore();
  const [tax, setTax] = useState([]);

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
        const budgetEndpoint = `${baseUrl}FormattedBudget?page=1&size=100&IdEmployee=${user.id}`;
        const activitiesEndpoint = `${baseUrl}Activity`;
        const processesEndpoint = `${baseUrl}Process?intask=true`;
        const paginationsEndpoint = `${baseUrl}FormattedBudget/Pages`;
        const currentWeekEndpoint = `${baseUrl}FormattedBudget/CurrentWeek`;
        const employeesEndpoint = `${baseUrl}Employee`;
        const taxEndpoint = `${baseUrl}Tax/1`;

        const employeesData = await getData(employeesEndpoint, token);
        setEmployees(employeesData);

        const taxData = await getData(taxEndpoint, token);
        setTax(taxData);

        const currentWeekData = await getData(currentWeekEndpoint, token);
        setCurrentWeek(currentWeekData);

        const clientsData = await getData(clientsEndpoint, token);
        setClients(clientsData);

        const budgetData = await getData(budgetEndpoint, token);
        setBudget(budgetData);
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

  const columnTitles = [
    "Cliente",
    "Nombre del servicio",
    "Vigencia presupuesto ",
    "Proceso",
    "Actividad",
    "Descripción",
    "Aprobado por cliente",
    "Aprobado por planeacion",
    "",
  ];

  const columnWidths = [
    "w-44",
    "w-52",
    "w-44",
    "w-60",
    "w-[350px]",
    "w-[350px]",
    "w-44",
    "w-44",
  ];

  return (
    <div className="flex flex-col w-full h-full">
      <Header title="Presupuesto clientes" date={currentWeek} />
      <div className="w-full flex flex-col bg-primary-blue-50 py-4 px-6 h-full">
        <BudgetContent
          columnWidths={columnWidths}
          columnTitles={columnTitles}
          budget={budget}
          setBudget={setBudget}
          loading={loading}
          setLoading={setLoading}
          tooltipSuccess={tooltipSuccess}
          setTooltipSuccess={setTooltipSuccess}
          tooltipError={tooltipError}
          setTooltipError={setTooltipError}
          taskFullyLoaded={taskFullyLoaded}
          totalPages={totalPages}
          realTime={realTime}
          setRealTime={setRealTime}
          tax={tax}
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

export default Budget;
>>>>>>> b7ecf2887956819aed0507d5ec357a78c09ff6b2
