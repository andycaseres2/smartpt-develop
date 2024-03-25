<<<<<<< HEAD
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
=======
import { useState } from "react";

const NotificationItem = ({
  showInput,
  asignner,
  dateassigned,
  handleChange,
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
            te ha asignado una tarea. ({dateassigned})
          </p>
        </div>
      )}
    </>
  );
};

export default NotificationItem;
>>>>>>> b7ecf2887956819aed0507d5ec357a78c09ff6b2
