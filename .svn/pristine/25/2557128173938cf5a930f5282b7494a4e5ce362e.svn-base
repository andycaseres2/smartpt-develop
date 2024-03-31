import CirclePlus from "../../assets/Icons/CirclePlus";
import ExportIcon from "../../assets/Icons/ExportIcon";
import ButtonWithIcon from "../../components/Buttons/ButtonWithIcon";
import InputDate from "../../components/Inputs/InputDate";
import SelectGeneric from "../../components/Selects/SelectGeneric";

const DashboardContent = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex justify-center gap-4">
        <ButtonWithIcon
          buttonColor={"bg-primary-red-500 h-[53px]"}
          text="Dashboard general"
          iconRight={<CirclePlus />}
        />
        <ButtonWithIcon
          buttonColor={
            "bg-white border border-yellow-600 text-yellow-600 h-[53px]"
          }
          text="Estado planeación colaboradores"
          iconRight={<CirclePlus fill={"#FAA500"} />}
        />
        <ButtonWithIcon
          buttonColor={
            "bg-white border border-primary-blue-600 !text-primary-blue-600 h-[53px]"
          }
          text="Estado planeación clientes"
          iconRight={<CirclePlus fill={"#2961CE"} />}
        />
      </div>
      <div className="w-full h-[675px] bg-white p-5 shadow-3xl rounded-lg">
        <div className="flex justify-between">
          <h1 className="w-max text-primary-red-500 text-[32px] font-bold">
            Dashboard general
          </h1>
          <div className="flex gap-4">
            <SelectGeneric
              options={[]}
              initialOption={"Grupo de trabajo"}
              key_name=""
              handleChange={() => {}}
            />
            <SelectGeneric
              options={[]}
              initialOption={"Colaborador"}
              key_name=""
              handleChange={() => {}}
            />
            <InputDate text={"Fecha inicio"} />
            <InputDate text={"Fecha fin"} />
          </div>
        </div>
        <div className="flex justify-start mt-4">
          <ButtonWithIcon
            buttonColor={"bg-primary-red-500"}
            text="Dashboard general"
            iconRight={<ExportIcon />}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
