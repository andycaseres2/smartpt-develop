import ArrowRigth from "../../assets/Icons/ArrowRigth";

const Popup = ({ openSubPopup, setOpenSubPopup }) => {
  return (
    <div className="popup-container">
      <div className="w-max flex flex-col  bg-white shadow-3xl absolute top-11 right-5 z-50 px-3 py-2 gap-1.5">
        <div
          className="w-full flex justify-between items-center cursor-pointer"
          onClick={() => setOpenSubPopup(!openSubPopup)}
        >
          <span>Filtrar</span>
          <ArrowRigth />
        </div>
        <div className="w-full flex justify-between items-center">
          <span className="text-gray-400">Refrescar</span>
        </div>
        <div className="w-full flex justify-between items-center cursor-pointer">
          <span>Exportar</span>
        </div>
        {openSubPopup && (
          <div className="flex flex-col  shadow-3xl absolute top-0 left-[100px] z-50 px-3 py-2 gap-1.5 bg-white w-max">
            <div className="w-full flex justify-between items-center cursor-pointer">
              <span>Horas reales</span>
            </div>
            <div className="w-full flex justify-between items-center cursor-pointer">
              <span>Cliente</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Popup;
