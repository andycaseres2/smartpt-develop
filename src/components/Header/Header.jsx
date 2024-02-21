import BellIcon from "../../assets/Icons/BellIcon";

import ModalNotifications from "../Modals/ModalNotifications";
import { stateStore } from "../../store/stateStore";
import { useLocation } from "react-router-dom";
import { getColor } from "../../utils/getColor";
import { useEffect, useState } from "react";
import { getData } from "../../services/getData";

const Header = ({ title, date, userName, textColor }) => {
  const { openNotifications, setOpenNotifications, employees } = stateStore();
  const location = useLocation();
  const currentPath = location.pathname;
  const [notification, setNotification] = useState([]);
  const [notificationHistory, setNotificationHistory] = useState([]);
  const [realTime, setRealTime] = useState(false);

  const handleOpenNotifications = (e) => {
    e.stopPropagation();
    setOpenNotifications(!openNotifications);
  };

  useEffect(() => {
    const fetchNotify = async () => {
      try {
        const baseUrl = import.meta.env.VITE_REACT_APP_URL_BASE;
        const employeesId = import.meta.env.VITE_REACT_APP_EMPLOYEE_ID;
        const notifyEndpoint = `${baseUrl}AsignedTask/PerEmployee/${employeesId}`;
        const notifyEndpointHistory = `${baseUrl}AsignedTask/PerEmployee/${employeesId}?pendientes=false`;

        const notifyData = await getData(notifyEndpoint);
        setNotification(notifyData);

        const notifyHistoryData = await getData(notifyEndpointHistory);
        setNotificationHistory(notifyHistoryData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Llama a fetchNotify al inicio y luego cada 30 segundos
    fetchNotify();
    setRealTime(false);
    const intervalId = setInterval(fetchNotify, 30000);
    return () => clearInterval(intervalId);
  }, [realTime]);
  return (
    <div
      className={`header flex justify-between items-center ${
        getColor(currentPath).bg
      } px-8 py-4 ${textColor ?? "text-white"}  relative z-10`}
      onClick={() => setOpenNotifications(false)}
    >
      <div className="flex flex-col z-30">
        <h1 className="text-[32px] font-semibold">{title}</h1>
        <div className="flex gap-2">
          <h2 className="text-2xl font-semibold">{date[0]}</h2>
          <span className="text-2xl font-semibold"> - </span>
          <h2 className="text-2xl font-semibold">{date[1]}</h2>
        </div>
      </div>
      <div className="flex flex-col items-end z-30">
        <p className="text-base">Bienvenido</p>
        <p className="font-semibold text-base mb-2">{userName}</p>
        <span
          className={`${
            openNotifications && "bg-white"
          }  rounded-lg flex justify-center items-center w-10 h-10 relative cursor-pointer z-50 hover:scale-105 `}
          onClick={handleOpenNotifications}
        >
          <BellIcon
            fill={openNotifications && getColor(currentPath).hex}
            optionalColor={
              currentPath === "/solicitudes/informacion" && "#477BFF"
            }
            className="cursor-pointer z-50"
            action={handleOpenNotifications}
          />
        </span>
      </div>
      {openNotifications && (
        <ModalNotifications
          open={openNotifications}
          styleContainer={"absolute top-[120px] right-8"}
          setOpenNotifications={setOpenNotifications}
          notification={notification}
          notificationHistory={notificationHistory}
          setRealTime={setRealTime}
          employees={employees}
        />
      )}
    </div>
  );
};

export default Header;
