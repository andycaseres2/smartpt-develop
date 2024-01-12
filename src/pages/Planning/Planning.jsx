import Header from "../../components/Header/Header";
import AdminPlanning from "./AdminPlanning";
import WorkerPlanning from "./WorkerPlanning";

const Planning = () => {
  const userRole = "admin";
  return (
    <div className="flex flex-col w-full h-screen">
      <Header
        title="Planeación semanal"
        date="4/12/2023 - 8/12/2023"
        userName="Kenet Sebastián Segura Murillo"
        baseColor="bg-primary-red-600"
      />
      <div className="w-full flex flex-col bg-primary-pink-50 py-4 px-6 h-full">
        {userRole === "admin" ? <AdminPlanning /> : <WorkerPlanning />}
      </div>
    </div>
  );
};

export default Planning;
