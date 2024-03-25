<<<<<<< HEAD
import { useState } from "react";
import PencilIcon from "../../assets/Icons/PencilIcon";
import { formatTime } from "../../utils/formatTime";
import DateInput from "../Inputs/DateInput";
import Input from "../Inputs/Input";
import TimeInput from "../Inputs/TimeInput";
import SelectGeneric from "../Selects/SelectGeneric";
import DeleteIcon from "../../assets/Icons/DeleteIcon";
import CheckIcon from "../../assets/Icons/CheckIcon";
import CloseIcon from "../../assets/Icons/CloseIcon";
import SelectStatus from "../Selects/SelectStatus";

const RowTableNewActivity = ({
  listItems,
  columnWidths,
  stateRow,
  handleChange,
  editMode,
  showButtonsEdit,
  handleSelectProcess,
  resetFieldsAssinedTask,
}) => {
  const [modeEdit, setModeEdit] = useState(editMode ?? false);
  const [initialOptionSelectStatus, setInitialOptionSelectStatus] =
    useState("");
  const [initialOptionSelectOption, setInitialOptionSelectOption] =
    useState("");

  const handleSelectStatus = (selectedOption, index) => {
    const newOptions = [...initialOptionSelectStatus];
    newOptions[index] = selectedOption;
    setInitialOptionSelectStatus(newOptions);
  };

  const handleSelectOption = (selectedOption, index) => {
    const newOptions = [...initialOptionSelectOption];
    newOptions[index] = selectedOption;
    setInitialOptionSelectOption(newOptions);
  };
  return (
    <div className="flex justify-between w-full">
      <tr className="justify-start flex gap-6 py-1 px-2 w-max">
        {listItems?.map((item, index) => (
          <td
            key={index}
            className={`${columnWidths[index]} flex items-center justify-start`}
          >
            {item.editComponent === "status" && modeEdit ? (
              <SelectStatus
                options={item.options}
                onSelect={(selectedOption) =>
                  handleSelectStatus(selectedOption, index)
                }
                initialOption={item.data}
                colorArrow={"white"}
                readOnly={true}
                key_name={item.key_name}
                handleChange={handleChange}
                editStatus={true}
                resetFieldsAssinedTask={resetFieldsAssinedTask}
              />
            ) : item.editComponent === "status" && !modeEdit ? (
              <SelectStatus
                options={item.options}
                onSelect={(selectedOption) =>
                  handleSelectStatus(selectedOption, index)
                }
                initialOption={item.data}
                colorArrow={"white"}
                readOnly={true}
                key_name={item.key_name}
                handleChange={handleChange}
                editStatus={true}
                resetFieldsAssinedTask={resetFieldsAssinedTask}
              />
            ) : item.editComponent === "input" &&
              item.type === "text" &&
              modeEdit ? (
              <Input
                type={item.type}
                value={stateRow[item.key_name]}
                key_name={item.key_name}
                handleChange={handleChange}
                initialValue={item.data}
                resetFieldsAssinedTask={resetFieldsAssinedTask}
              />
            ) : item.editComponent === "input" &&
              item.type === "text" &&
              !modeEdit ? (
              <span>{item.data}</span>
            ) : item.editComponent === "select" && modeEdit ? (
              <SelectGeneric
                options={item.options}
                onSelect={(selectedOption) =>
                  handleSelectOption(selectedOption, index)
                }
                initialOption={item.data}
                key_name={item.key_name}
                handleChange={handleChange}
                handleSelect={handleSelectProcess}
                resetFieldsAssinedTask={resetFieldsAssinedTask}
                extraOptions={item.extraOptions}
              />
            ) : item.editComponent === "select" && !modeEdit ? (
              <span>{item.data}</span>
            ) : item.editComponent === "input" &&
              item.type === "time" &&
              modeEdit ? (
              <TimeInput
                handleChange={handleChange}
                defaultValue={item.data}
                key_name={item.key_name}
                type={item.type}
                resetFieldsAssinedTask={resetFieldsAssinedTask}
              />
            ) : item.editComponent === "input" &&
              item.type === "time" &&
              !modeEdit ? (
              <span>{formatTime(item.data)}</span>
            ) : item.editComponent === "input" &&
              item.type === "date" &&
              modeEdit ? (
              <DateInput
                resetFieldsAssinedTask={resetFieldsAssinedTask}
                handleChange={handleChange}
                key_name={item.key_name}
                minValue={
                  item.key_name === "estimateddate" && stateRow["startdate"]
                }
              />
            ) : item.editComponent === "input" &&
              item.type === "date" &&
              !modeEdit ? (
              <span>{item.data}</span>
            ) : (
              <span>{item.data}</span>
            )}
          </td>
        ))}
      </tr>
      {showButtonsEdit && (
        <td className="flex w-28 items-center gap-4 justify-start">
          {!modeEdit ? (
            <>
              <PencilIcon
                action={() => setModeEdit(true)}
                className={"cursor-pointer hover:scale-105"}
              />
              <DeleteIcon className={"cursor-pointer hover:scale-105"} />
            </>
          ) : (
            <>
              <CheckIcon className={"cursor-pointer hover:scale-105"} />
              <CloseIcon
                action={() => setModeEdit(false)}
                className={"cursor-pointer hover:scale-105"}
              />
            </>
          )}
        </td>
      )}
    </div>
  );
};

export default RowTableNewActivity;
=======
import { useState } from "react";
import PencilIcon from "../../assets/Icons/PencilIcon";
import { formatTime } from "../../utils/formatTime";
import DateInput from "../Inputs/DateInput";
import Input from "../Inputs/Input";
import TimeInput from "../Inputs/TimeInput";
import SelectGeneric from "../Selects/SelectGeneric";
import DeleteIcon from "../../assets/Icons/DeleteIcon";
import CheckIcon from "../../assets/Icons/CheckIcon";
import CloseIcon from "../../assets/Icons/CloseIcon";
import SelectStatus from "../Selects/SelectStatus";

const RowTableNewActivity = ({
  listItems,
  columnWidths,
  stateRow,
  handleChange,
  editMode,
  showButtonsEdit,
  handleSelectProcess,
  resetFieldsAssinedTask,
}) => {
  const [modeEdit, setModeEdit] = useState(editMode ?? false);
  const [initialOptionSelectStatus, setInitialOptionSelectStatus] =
    useState("");
  const [initialOptionSelectOption, setInitialOptionSelectOption] =
    useState("");

  const handleSelectStatus = (selectedOption, index) => {
    const newOptions = [...initialOptionSelectStatus];
    newOptions[index] = selectedOption;
    setInitialOptionSelectStatus(newOptions);
  };

  const handleSelectOption = (selectedOption, index) => {
    const newOptions = [...initialOptionSelectOption];
    newOptions[index] = selectedOption;
    setInitialOptionSelectOption(newOptions);
  };
  return (
    <div className="flex justify-between w-full">
      <tr className="justify-start flex gap-6 py-1 px-2 w-max">
        {listItems?.map((item, index) => (
          <td
            key={index}
            className={`${columnWidths[index]} flex items-center justify-start`}
          >
            {item.editComponent === "status" && modeEdit ? (
              <SelectStatus
                options={item.options}
                onSelect={(selectedOption) =>
                  handleSelectStatus(selectedOption, index)
                }
                initialOption={item.data}
                colorArrow={"white"}
                readOnly={true}
                key_name={item.key_name}
                handleChange={handleChange}
                editStatus={true}
                resetFieldsAssinedTask={resetFieldsAssinedTask}
              />
            ) : item.editComponent === "status" && !modeEdit ? (
              <SelectStatus
                options={item.options}
                onSelect={(selectedOption) =>
                  handleSelectStatus(selectedOption, index)
                }
                initialOption={item.data}
                colorArrow={"white"}
                readOnly={true}
                key_name={item.key_name}
                handleChange={handleChange}
                editStatus={true}
                resetFieldsAssinedTask={resetFieldsAssinedTask}
              />
            ) : item.editComponent === "input" &&
              item.type === "text" &&
              modeEdit ? (
              <Input
                type={item.type}
                value={stateRow[item.key_name]}
                key_name={item.key_name}
                handleChange={handleChange}
                initialValue={item.data}
                resetFieldsAssinedTask={resetFieldsAssinedTask}
              />
            ) : item.editComponent === "input" &&
              item.type === "text" &&
              !modeEdit ? (
              <span>{item.data}</span>
            ) : item.editComponent === "select" && modeEdit ? (
              <SelectGeneric
                options={item.options}
                onSelect={(selectedOption) =>
                  handleSelectOption(selectedOption, index)
                }
                initialOption={item.data}
                key_name={item.key_name}
                handleChange={handleChange}
                handleSelect={handleSelectProcess}
                resetFieldsAssinedTask={resetFieldsAssinedTask}
              />
            ) : item.editComponent === "select" && !modeEdit ? (
              <span>{item.data}</span>
            ) : item.editComponent === "input" &&
              item.type === "time" &&
              modeEdit ? (
              <TimeInput
                handleChange={handleChange}
                defaultValue={item.data}
                key_name={item.key_name}
                type={item.type}
                resetFieldsAssinedTask={resetFieldsAssinedTask}
              />
            ) : item.editComponent === "input" &&
              item.type === "time" &&
              !modeEdit ? (
              <span>{formatTime(item.data)}</span>
            ) : item.editComponent === "input" &&
              item.type === "date" &&
              modeEdit ? (
              <DateInput
                resetFieldsAssinedTask={resetFieldsAssinedTask}
                handleChange={handleChange}
                key_name={item.key_name}
              />
            ) : item.editComponent === "input" &&
              item.type === "date" &&
              !modeEdit ? (
              <span>{item.data}</span>
            ) : (
              <span>{item.data}</span>
            )}
          </td>
        ))}
      </tr>
      {showButtonsEdit && (
        <td className="flex w-28 items-center gap-4 justify-start">
          {!modeEdit ? (
            <>
              <PencilIcon
                action={() => setModeEdit(true)}
                className={"cursor-pointer hover:scale-105"}
              />
              <DeleteIcon className={"cursor-pointer hover:scale-105"} />
            </>
          ) : (
            <>
              <CheckIcon className={"cursor-pointer hover:scale-105"} />
              <CloseIcon
                action={() => setModeEdit(false)}
                className={"cursor-pointer hover:scale-105"}
              />
            </>
          )}
        </td>
      )}
    </div>
  );
};

export default RowTableNewActivity;
>>>>>>> b7ecf2887956819aed0507d5ec357a78c09ff6b2
