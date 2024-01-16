import LogoIcon from "../../assets/Icons/LogoIcon";
import CalendarIcon from "../../assets/Icons/CalendarIcon";
import LogOutIcon from "../../assets/Icons/LogOutIcon";
import SolicitudIcon from "../../assets/Icons/SolicitudIcon";
import DataIcon from "../../assets/Icons/DataIcon";
import BudgetIcon from "../../assets/Icons/BudgetIcon";
import DashboardIcon from "../../assets/Icons/DashboardIcon";
import { useLocation } from "react-router-dom";
import { stateStore } from "../../store/stateStore";

const Sidebar = () => {
  const { setOpenNotifications } = stateStore();
  const location = useLocation();
  const currentPath = location.pathname;
  const links = [
    {
      icon: (
        <CalendarIcon
          fill={currentPath === "/planeacion" ? "white" : ""}
          width={40}
          height={40}
        />
      ),
      href: "/planeacion",
      color: "bg-primary-red-600",
    },
    {
      icon: (
        <SolicitudIcon
          fill={currentPath === "/solicitudes" ? "white" : ""}
          width={40}
          height={40}
        />
      ),
      href: "/solicitudes",
      color: "bg-primary-yellow-600",
    },
    {
      icon: (
        <DataIcon
          fill={currentPath === "/solicitudes/informacion" ? "white" : ""}
          width={40}
          height={40}
        />
      ),
      href: "/solicitudes/informacion",
      color: "bg-primary-lightblue-600",
    },
    {
      icon: (
        <BudgetIcon
          fill={currentPath === "/presupuesto" ? "white" : ""}
          width={40}
          height={40}
        />
      ),
      href: "/presupuesto",
      color: "bg-primary-blue-600",
    },
    {
      icon: (
        <DashboardIcon
          fill={currentPath === "/dashboard" ? "white" : ""}
          width={40}
          height={40}
        />
      ),
      href: "/dashboard",
      color: "bg-primary-purple-600",
    },
  ];

  return (
    <div
      className={`w-[100px] flex justify-between flex-col items-center py-9 border-r-2 border-[#D9D9D9]`}
      onClick={() => setOpenNotifications(false)}
    >
      <LogoIcon redirect="/planeacion" />
      <div className="flex flex-col justify-center items-center gap-12">
        {links.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className={`p-3 flex  justify-center items-center rounded-2xl transition-all ${
              currentPath === item.href ? item.color : ""
            }`}
          >
            {item.icon}
          </a>
        ))}
      </div>
      <LogOutIcon width={40} height={40} />
    </div>
  );
};

export default Sidebar;
