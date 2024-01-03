import LogoIcon from "../../assets/Icons/LogoIcon";
import CalendarIcon from "../../assets/Icons/CalendarIcon";
import LogOutIcon from "../../assets/Icons/LogOutIcon";
import SolicitudIcon from "../../assets/Icons/SolicitudIcon";
import DataIcon from "../../assets/Icons/DataIcon";
import BudgetIcon from "../../assets/Icons/BudgetIcon";
import DashboardIcon from "../../assets/Icons/DashboardIcon";
import { useLocation } from "react-router-dom";

const Sidebar = () => {
  const icons = [
    { icon: <CalendarIcon width={40} height={40} />, href: "/planeacion" },
    { icon: <SolicitudIcon width={40} height={40} />, href: "/solicitudes" },
    {
      icon: <DataIcon width={40} height={40} />,
      href: "/solicitudes/informacion",
    },
    { icon: <BudgetIcon width={40} height={40} />, href: "/presupuesto" },
    { icon: <DashboardIcon width={40} height={40} />, href: "/dashboard" },
  ];
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <div
      className={`w-[100px] flex justify-between flex-col items-center py-9 border-r-2 border-[#D9D9D9]`}
    >
      <LogoIcon redirect="/planeacion" />
      <div className="flex flex-col justify-center items-center gap-12">
        {icons.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className={`p-3 flex justify-center items-center rounded-2xl transition-all ${
              currentPath === item.href ? "bg-primary-red-600" : ""
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
