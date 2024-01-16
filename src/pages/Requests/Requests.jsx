import Header from "../../components/Header/Header";
import AdminRequest from "./AdminRequest";
import WorkerRequest from "./WorkerRequest";

const Requests = () => {
  const userRole = "admin";
  return (
    <div className="flex flex-col w-full h-screen">
      <Header
        title="Solicitudes de diseño"
        date="4/12/2023 - 8/12/2023"
        userName="Kenet Sebastián Segura Murillo"
      />
      <div className="w-full flex flex-col bg-primary-yellow-50 py-4 px-6 h-full">
        {userRole === "admin" ? <AdminRequest /> : <WorkerRequest />}
      </div>
    </div>
  );
};

export default Requests;
