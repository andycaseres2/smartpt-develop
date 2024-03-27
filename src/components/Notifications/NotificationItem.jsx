import { useEffect, useState } from "react";
import { getData } from "../../services/getData";
import { userStore } from "../../store/userStore";

const NotificationItem = ({
  showInput,
  asignner,
  dateassigned,
  handleChange,
  idTask,
}) => {
  const [checked, setChecked] = useState(false);
  const { token } = userStore();
  const [nameTask, setNameTask] = useState("");
  const handleCheckboxChange = () => {
    setChecked(true); // Marcar el checkbox temporalmente
    handleChange();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urlBase = import.meta.env.VITE_REACT_APP_URL_BASE;
        const taskEndpoint = `${urlBase}Task/${idTask}`;
        const task = await getData(taskEndpoint, token);
        if (task && task.name) {
          setNameTask(task.name);
        }
      } catch (error) {
        console.error("Error fetching task:", error);
        // Puedes manejar el error aquí de acuerdo a tus necesidades
      }
    };

    fetchData();
  }, [idTask]);

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
          <p className="text-black leading-6">
            <strong className="mr-1">{asignner}</strong>
            te ha asignado la tarea &quot;<strong>{nameTask}</strong>
            &quot;. ({dateassigned})
          </p>
        </div>
      )}
    </>
  );
};

export default NotificationItem;
