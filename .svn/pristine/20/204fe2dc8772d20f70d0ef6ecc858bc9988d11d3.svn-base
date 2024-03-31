import Header from "../../components/Header/Header";
import AdminPlanning from "./AdminPlanning";
import WorkerPlanning from "./WorkerPlanning";

const Planning = () => {
  const userRole = "";
  return (
    <div className="flex flex-col w-full">
      <Header
        title="Planeación semanal"
        date="4/12/2023 - 8/12/2023"
        userName="Kenet Sebastián Segura Murillo"
      />
      <div className="w-full flex flex-col bg-primary-pink-50 p-[33px]">
        {userRole === "admin" ? <AdminPlanning /> : <WorkerPlanning />}
      </div>
    </div>
  );
};

export default Planning;
