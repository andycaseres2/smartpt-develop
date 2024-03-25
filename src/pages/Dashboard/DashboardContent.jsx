import { useState } from "react";
import CirclePlus from "../../assets/Icons/CirclePlus";
import ButtonWithIcon from "../../components/Buttons/ButtonWithIcon";
import CollaboratorsPlanning from "./components/CollaboratorsPlanning";
import ClientsPlanning from "./components/ClientsPlanning";
import GeneralDashboards from "./components/GeneralDashboards";

const DashboardContent = ({ realTime, setRealTime }) => {
  const [generalDashboard, setGeneralDashboard] = useState(true);
  const [collaboratorsPlanningState, setCollaboratorsPlanningState] =
    useState(false);
  const [clientsPlanningState, setClientsPlanningState] = useState(false);

  const handleShowGeneralDashboard = () => {
    setGeneralDashboard(true);
    setCollaboratorsPlanningState(false);
    setClientsPlanningState(false);
  };
  const handleShowCollaboratorsPlanningState = () => {
    setGeneralDashboard(false);
    setCollaboratorsPlanningState(true);
    setClientsPlanningState(false);
  };
  const handleShowClientsPlanningState = () => {
    setGeneralDashboard(false);
    setCollaboratorsPlanningState(false);
    setClientsPlanningState(true);
  };
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex justify-center gap-4">
        <ButtonWithIcon
          buttonColor={"bg-primary-red-500 h-[53px]"}
          text="Dashboard general"
          iconRight={<CirclePlus />}
          action={handleShowGeneralDashboard}
        />
        <ButtonWithIcon
          buttonColor={
            "bg-white border border-primary-orange-500 !text-primary-orange-500 h-[53px]"
          }
          text="Estado planeación colaboradores"
          iconRight={<CirclePlus fill={"#F76800"} />}
          action={handleShowCollaboratorsPlanningState}
        />
        <ButtonWithIcon
          buttonColor={
            "bg-white border border-primary-blue-600 !text-primary-blue-600 h-[53px]"
          }
          text="Estado planeación clientes"
          iconRight={<CirclePlus fill={"#2961CE"} />}
          action={handleShowClientsPlanningState}
        />
      </div>
      {generalDashboard && <GeneralDashboards />}
      {collaboratorsPlanningState && (
        <CollaboratorsPlanning realTime={realTime} setRealTime={setRealTime} />
      )}
      {clientsPlanningState && (
        <ClientsPlanning realTime={realTime} setRealTime={setRealTime} />
      )}
    </div>
  );
};

export default DashboardContent;
