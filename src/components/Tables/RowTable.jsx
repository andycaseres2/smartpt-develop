import { useEffect, useState } from "react";
import CheckIcon from "../../assets/Icons/CheckIcon";
import CloseIcon from "../../assets/Icons/CloseIcon";
import PencilIcon from "../../assets/Icons/PencilIcon";
import ProfilePicture from "../../assets/Icons/ProfilePicture";
import DateInput from "../Inputs/DateInput";
import Input from "../Inputs/Input";
import TimeInput from "../Inputs/TimeInput";
import SelectGeneric from "../Selects/SelectGeneric";
import SelectStatus from "../Selects/SelectStatus";
import { postData } from "../../services/postData";
import { putData } from "../../services/putData";

const RowTable = ({
  listItems,
  columnWidths,
  stateRow,
  setStateRow,
  handleChange,
  readOnly,
  editMode,
  newTaskAdd,
  setNewTaskAdd,
  index,
  setRealTime,
  setTooltipSuccess,
  setTooltipError,
}) => {
  const [modeEdit, setModeEdit] = useState(editMode ?? false);
  const [initialOptionSelectStatus, setInitialOptionSelectStatus] =
    useState("");
  const [initialOptionSelectOption, setInitialOptionSelectOption] =
    useState("");
  const [rowId, setRowId] = useState(null);

  const handleSelectStatus = (selectedOption, index) => {
    const newOptions = [...initialOptionSelectStatus];
    newOptions[index] = selectedOption;
    setInitialOptionSelectStatus(newOptions);
  };

  useEffect(() => {
    const lastIndex = listItems.length - 1;
    setRowId(listItems[lastIndex]);
  }, [listItems]);

  useEffect(() => {
    if (newTaskAdd && index === 0) {
      setModeEdit(true);
    }
  }, [newTaskAdd]);

  async function createTask() {
    try {
      // Obtener el objeto stateRow
      const body = stateRow;

      // Eliminar la propiedad 'null' del objeto
      if ("null" in body) {
        delete body["null"];
      }

      // Agregar la propiedad 'IdEmployeeAsigned' con el valor 1 al objeto
      body.idemployeeasigned = import.meta.env.VITE_REACT_APP_EMPLOYEE_ID;
      body.realenddate = null;

      // Definir la URL base
      const baseUrl = import.meta.env.VITE_REACT_APP_URL_BASE;

      // Construir la URL del endpoint para las tareas
      const tasksEndpoint = `${baseUrl}Task`;

      // Enviar los datos modificados al servidor utilizando la función postData
      await postData(tasksEndpoint, body);

      // Restablecer los modos de edición y agregar nueva tarea
      setModeEdit(false);
      setNewTaskAdd(false);
      setRealTime(true);
      setStateRow({});
      setTooltipSuccess("Tarea creada con exito");
    } catch (error) {
      // Manejar el error aquí
      console.error("Error al crear la tarea:", error);

      // Puedes definir un estado de error y guardarlo en tu componente si es necesario
      setTooltipError("Hubo un error al crear la tarea");
    }
  }

  async function editTask() {
    try {
      // Obtener el objeto stateRow
      const body = stateRow;

      // Convertir la propiedad con clave 'null' a 'ID'
      if ("null" in body) {
        delete body["null"];
      } else if ("id" in body) {
        delete body["id"];
      }

      // Agregar la propiedad 'IdEmployeeAsigned' con el valor 1 al objeto
      body.idemployeeasigned = import.meta.env.VITE_REACT_APP_EMPLOYEE_ID;
      body.realenddate = null;

      // Definir la URL base
      const baseUrl = import.meta.env.VITE_REACT_APP_URL_BASE;

      // Construir la URL del endpoint para la tarea específica
      const taskEndpoint = await `${baseUrl}Task/${rowId}`;

      // Enviar los datos modificados al servidor utilizando la función putData (o postData según tu implementación)
      await putData(taskEndpoint, body);

      // Restablecer los modos de edición y agregar nueva tarea
      setModeEdit(false);
      setNewTaskAdd(false);
      setRealTime(true);
      setTooltipSuccess("Tarea editada con exito");
    } catch (error) {
      // Manejar el error aquí
      console.error("Error al editar la tarea:", error);

      // Puedes definir un estado de error y guardarlo en tu componente si es necesario
      setTooltipError("Hubo un error editando la tarea");
    }
  }

  const handleSelectOption = (selectedOption, index) => {
    const newOptions = [...initialOptionSelectOption];
    newOptions[index] = selectedOption;
    setInitialOptionSelectOption(newOptions);
  };

  return (
    <tr className="justify-start flex w-full gap-6 py-1 px-2">
      {listItems?.map((item, index) => (
        <td
          key={index}
          className={`${columnWidths[index]} flex items-center justify-start`}
        >
          {item?.type === "status" && modeEdit ? (
            <SelectStatus
              options={item?.options}
              onSelect={(selectedOption) =>
                handleSelectStatus(selectedOption, index)
              }
              initialOption={item?.data}
              colorArrow={"white"}
              readOnly={readOnly}
              key_name={item?.key_name}
              handleChange={handleChange}
              editStatus={true}
              modeEdit={modeEdit}
            />
          ) : item?.type === "status" && !modeEdit ? (
            <SelectStatus
              options={item?.options}
              onSelect={(selectedOption) =>
                handleSelectStatus(selectedOption, index)
              }
              initialOption={item?.data}
              colorArrow={"white"}
              readOnly={readOnly}
              key_name={item?.key_name}
              handleChange={handleChange}
              editStatus={true}
              newTaskAdd={newTaskAdd}
              modeEdit={modeEdit}
            />
          ) : item?.editComponent === "input" &&
            item?.type === "text" &&
            modeEdit ? (
            <Input
              type={item?.type}
              value={stateRow[item?.key_name]}
              key_name={item?.key_name}
              handleChange={handleChange}
              initialValue={item?.data}
            />
          ) : item?.editComponent === "input" &&
            item?.type === "text" &&
            !modeEdit ? (
            <span>{item?.data}</span>
          ) : item?.editComponent === "select" && modeEdit ? (
            <SelectGeneric
              options={item?.options}
              onSelect={(selectedOption) =>
                handleSelectOption(selectedOption, index)
              }
              initialOption={item?.data}
              key_name={item?.key_name}
              handleChange={handleChange}
            />
          ) : item?.editComponent === "select" && !modeEdit ? (
            <span className="truncate">{item?.data}</span>
          ) : item?.editComponent === "input" &&
            item?.type === "time" &&
            modeEdit ? (
            <TimeInput
              handleChange={handleChange}
              defaultValue={item?.data}
              key_name={item?.key_name}
              type={item?.type}
            />
          ) : item?.editComponent === "input" &&
            item?.type === "time" &&
            !modeEdit ? (
            <span>{`${item?.data} ${
              item?.data > 1 ? "minutos" : "minuto"
            }`}</span>
          ) : item?.editComponent === "input" &&
            item?.type === "date" &&
            modeEdit ? (
            <DateInput
              handleChange={handleChange}
              defaultValue={item?.data}
              key_name={item?.key_name}
            />
          ) : item?.editComponent === "input" &&
            item?.type === "date" &&
            !modeEdit ? (
            <span>{item?.data.split("T")[0]}</span>
          ) : typeof item === "number" || item === null ? (
            !readOnly ? (
              !modeEdit ? (
                <td className="flex w-44 items-center gap-4 justify-center">
                  <PencilIcon
                    action={() => setModeEdit(true)}
                    className={"cursor-pointer hover:scale-105"}
                  />
                  <ProfilePicture
                    className={"cursor-pointer hover:scale-105"}
                  />
                </td>
              ) : (
                <td className="flex w-44 items-center gap-4 justify-center">
                  <CheckIcon
                    className={"cursor-pointer hover:scale-105"}
                    action={() => {
                      newTaskAdd ? createTask() : editTask();
                    }}
                  />
                  <CloseIcon
                    action={() => setModeEdit(false)}
                    className={"cursor-pointer hover:scale-105"}
                  />
                </td>
              )
            ) : null
          ) : (
            <span className="truncate ">{item?.data}</span>
          )}
        </td>
      ))}
    </tr>
  );
};

export default RowTable;
