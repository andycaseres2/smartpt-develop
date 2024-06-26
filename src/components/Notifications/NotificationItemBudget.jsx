import BudgetIcon from "../../assets/Icons/BudgetIcon";

const NotificationItemBudget = ({ showInput }) => {
  return (
    <div className="flex gap-2">
      {showInput && (
        <div className="w-max">
          <input
            type="checkbox"
            className="w-4 h-5 accent-primary-red-600 cursor-pointer"
          />
        </div>
      )}
      <p className="text-black text-base">
        El presupuesto
        <span className="inline-block items-center ml-1">
          <BudgetIcon className="w-4 h-4 inline-block mr-1" fill="#D93535" />
        </span>
        para el cliente <strong>Fortinet</strong> con nombre del servicio{" "}
        <strong>Hotel JW</strong> ha sido aprobado satisfactoriamente
        <strong>por el cliente</strong> y añadida a tu planeación semanal.
        (6/12/2023 - 10:20 am)
      </p>
    </div>
  );
};

export default NotificationItemBudget;
