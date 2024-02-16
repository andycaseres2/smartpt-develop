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
              />
            ) : item.editComponent === "input" &&
              item.type === "time" &&
              !modeEdit ? (
              <span>{formatTime(item.data)}</span>
            ) : item.editComponent === "input" &&
              item.type === "date" &&
              modeEdit ? (
              <DateInput handleChange={handleChange} key_name={item.key_name} />
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
