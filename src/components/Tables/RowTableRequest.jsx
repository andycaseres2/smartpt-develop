import { useState } from "react";
import CloseIcon from "../../assets/Icons/CloseIcon";
import PencilIcon from "../../assets/Icons/PencilIcon";
import { formatTime } from "../../utils/formatTime";
import DateInput from "../Inputs/DateInput";
import Input from "../Inputs/Input";
import TimeInput from "../Inputs/TimeInput";
import Select from "../Selects/Select";
import SelectGeneric from "../Selects/SelectGeneric";
import SelectStatus from "../Selects/SelectStatus";
import CheckIcon from "../../assets/Icons/CheckIcon";

const RowTableRequest = ({
  listItems,
  columnWidths,
  stateRow,
  handleChange,
  readOnly,
  editStatus,
  editMode,
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

  const handleCancel = () => {
    setModeEdit(false);
  };
  return (
    <tr className="justify-start flex w-full gap-8 py-1 px-2">
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
              editStatus={modeEdit || editStatus}
            />
          ) : item?.type === "status" && !modeEdit ? (
            <Select
              options={item?.options}
              onSelect={(selectedOption) =>
                handleSelectStatus(selectedOption, index)
              }
              initialOption={item?.data}
              colorArrow={"white"}
              readOnly={readOnly}
              key_name={item?.key_name}
              handleChange={handleChange}
              editStatus={modeEdit || editStatus}
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
            <span>{item?.data}</span>
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
            <span>{formatTime(item?.data)}</span>
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
          ) : typeof item === "number" ||
            (item === null && index === listItems.length - 1) ? (
            !readOnly ? (
              !modeEdit ? (
                <td className="flex w-44 items-center gap-4 justify-center">
                  <PencilIcon
                    action={() => setModeEdit(true)}
                    className={"cursor-pointer hover:scale-105"}
                  />
                </td>
              ) : (
                <td className="flex w-44 items-center gap-4 justify-center">
                  <CheckIcon
                    className={"cursor-pointer hover:scale-105"}
                    action={""}
                  />
                  <CloseIcon
                    action={handleCancel}
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

export default RowTableRequest;
