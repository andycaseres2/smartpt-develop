import { useState } from "react";

const NotificationItem = ({
  showInput,
  asignner,
  dateassigned,
  handleChange,
  nameTask,
}) => {
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(true); // Marcar el checkbox temporalmente
    handleChange();
  };

  return (
    <>
      {asignner && (
        <div className="flex gap-2">
          {showInput && (
            <input
              type="checkbox"
              className="w-7 h-7 accent-primary-red-600 cursor-pointer"
              checked={checked}
              onChange={handleCheckboxChange}
            />
          )}
          <p className="text-black">
            <strong className="mr-1">{asignner}</strong>
            te ha asignado la tarea &quot;<strong>{nameTask}</strong>&quot;. (
            {dateassigned})
          </p>
        </div>
      )}
    </>
  );
};

export default NotificationItem;
