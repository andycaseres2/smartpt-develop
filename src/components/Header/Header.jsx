import { useState } from "react";
import BellIcon from "../../assets/Icons/BellIcon";
import LinesBGLeft from "../../assets/LinesBGLeft.svg";
import LinesBGRight from "../../assets/LinesBGRight.svg";
import ModalNotifications from "../Modals/ModalNotifications";

const Header = ({ title, date, userName }) => {
  const [openNotifications, setOpenNotifications] = useState(false);
  return (
    <div className=" flex justify-between items-center bg-primary-red-600 px-8 py-4 text-white relative z-10">
      <div className="flex flex-col z-30">
        <h1 className="text-[32px] font-semibold">{title}</h1>
        <h2 className="text-2xl font-semibold">{date}</h2>
      </div>
      <div className="flex flex-col items-end z-30">
        <p className="text-base">Bienvenido</p>
        <p className="font-semibold text-base mb-2">{userName}</p>
        <span
          className={`${
            openNotifications && "bg-white"
          }  rounded-lg flex justify-center items-center w-10 h-10 relative`}
        >
          <BellIcon
            fill={openNotifications && "red"}
            className="cursor-pointer hover:scale-105"
            action={() => setOpenNotifications(!openNotifications)}
          />
        </span>
      </div>
      <div className="flex absolute top-2 justify-center items-center">
        <img
          src={LinesBGLeft}
          alt="LinesBG"
          className="w-full h-full "
          style={{ transform: "scale(1,1)" }}
        />
        <img
          src={LinesBGRight}
          alt="LinesBG"
          className="w-full h-full"
          style={{ transform: "scale(1,1)" }}
        />
      </div>
      {openNotifications && (
        <ModalNotifications
          open={openNotifications}
          styleContainer={"absolute top-[120px] right-8"}
        />
      )}
    </div>
  );
};

export default Header;
