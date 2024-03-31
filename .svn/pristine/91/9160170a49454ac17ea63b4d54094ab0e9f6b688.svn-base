import { useEffect, useState } from "react";
import SelectGeneric from "../../../components/Selects/SelectGeneric";
import InputDate from "../../../components/Inputs/InputDate";
import BoxHours from "../../../components/Boxes/BoxHours";
import ButtonWithIcon from "../../../components/Buttons/ButtonWithIcon";
import ExportIcon from "../../../assets/Icons/ExportIcon";
import DotsIcon from "../../../assets/Icons/DotsIcon";
import Chart from "react-google-charts";
import Popup from "../../../components/Popups/Popup";
import { userStore } from "../../../store/userStore";
import { getData } from "../../../services/getData";

const ClientsPlanning = () => {
  const [realTime, setRealTime] = useState(true);
  const [openPopup, setOpenPopup] = useState(false);
  const [openSubPopup, setOpenSubPopup] = useState(false);
  const [openPopup2, setOpenPopup2] = useState(false);
  const [openSubPopup2, setOpenSubPopup2] = useState(false);
  const [currentDataDedicacionPorCliente, setCurrentDataDedicacionPorCliente] =
    useState([]);
  const [
    currentDataDedicacionPorColaborador,
    setCurrentDataDedicacionPorColaborador,
  ] = useState([]);
  const { token } = userStore();

  useEffect(() => {
    const transformToBarPlot = (originalData, key) => {
      const colors = [
        "#E93E37",
        "#DF4D62",
        "#FF7686",
        "#E47526",
        "#EA9717",
        "#81BA63",
        "#43E18C",
        "#80B5C5",
        "#b87333",
        "#0192D3",
        "#8B6BAE",
      ];

      var result = [
        [
          "Element",
          "Density",
          { role: "style" },
          {
            sourceColumn: 0,
            role: "annotation",
            type: "string",
            calc: "stringify",
          },
        ],
      ];
      for (
        var i = 0, currentColor = 0;
        i < originalData.length;
        i++, currentColor++
      ) {
        if (currentColor >= colors.length) {
          currentColor = 0;
        }
        result.push([
          originalData[i][key],
          originalData[i]["sum"],
          colors[currentColor],
          null,
        ]);
      }
      return result;
    };

    const fetchDataOnMount = async () => {
      try {
        const baseUrl = import.meta.env.VITE_REACT_APP_URL_BASE;
        const dashboardEndpointReport1 = `${baseUrl}Dashboard?reporte=1&startDate=${"2024-02-01T00:00:00"}&endDate=${"2024-03-01T00:00:00"}`;
        const dashboardEndpointReport2 = `${baseUrl}Dashboard?reporte=2&startDate=${"2024-02-01T00:00:00"}&endDate=${"2024-03-01T00:00:00"}`;

        const dataDedicacionPorCliente = await getData(
          dashboardEndpointReport1,
          token
        );
        setCurrentDataDedicacionPorCliente(
          transformToBarPlot(dataDedicacionPorCliente, "name")
        );

        const dataDedicacionPorColaborador = await getData(
          dashboardEndpointReport2,
          token
        );
        setCurrentDataDedicacionPorColaborador(
          transformToBarPlot(dataDedicacionPorColaborador, "fullname")
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataOnMount();
    setRealTime(false);
  }, [realTime]);

  const options = {
    bar: { groupWidth: "75%" },
    legend: { position: "none" },
    chartArea: { width: "60%", height: "85%" },
    height: 500,
    hAxis: {
      minValue: 0,
      ticks: [0, 1000, 2000, 3100], // Establece los ticks específicos
    },
  };
  return (
    <div className="w-full h-[690px] bg-white p-4 shadow-3xl rounded-lg relative overflow-hidden overflow-y-auto">
      <div className="flex justify-between">
        <h1 className="w-max text-primary-blue-500 text-[32px] font-bold">
          Estado planeación colaboradores
        </h1>
        <div className="flex gap-4">
          <SelectGeneric
            options={[]}
            initialOption={"Cliente"}
            key_name=""
            handleChange={() => {}}
          />
          <InputDate text={"Fecha inicio"} />
          <InputDate text={"Fecha fin"} />
        </div>
      </div>

      <div className="w-full justify-center mt-4 relative">
        <div className="flex flex-col items-center">
          <span className="!text-xl font-bold text-primary-blue-500">
            Resumen
          </span>
          <span>Comparativa de horas</span>
          <div className="flex justify-center gap-8 py-4">
            <BoxHours
              title="Horas programadas"
              porcentaje="+11%"
              values="15.000"
              color={"primary-blue-500"}
            />
            <BoxHours
              title="Horas reales"
              porcentaje="+11%"
              values="14.900"
              color={"primary-blue-500"}
            />
            <BoxHours
              title="Porcentaje de planeación"
              porcentaje="+11%"
              values="1%"
              color={"primary-blue-500"}
              textColor={"text-primary-green-500"}
            />
            <ButtonWithIcon
              buttonColor={"bg-primary-blue-500 absolute left-0 top-0"}
              text="Exportar dashboard"
              iconRight={<ExportIcon />}
            />
          </div>
          <div className="flex w-full items-start gap-6">
            <div className="w-full shadow-3xl rounded-lg flex flex-col py-2 justify-center px-4 relative">
              <div className="flex pl-2 justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-primary-red-600 font-bold text-[16px]">
                    Dedicación por cliente
                  </span>
                  <span className="text-primary-red-600 text-[14px]">
                    Clientes x Horas reales
                  </span>
                </div>
                <div
                  className={"cursor-pointer hover:scale-105 px-4 py-2"}
                  onClick={() => setOpenPopup(!openPopup)}
                >
                  <DotsIcon />
                </div>
              </div>
              <Chart
                chartType="PieChart"
                width="100%"
                height="100%"
                data={currentDataDedicacionPorCliente}
                options={options}
              />
              {openPopup && (
                <Popup
                  openSubPopup={openSubPopup}
                  setOpenSubPopup={setOpenSubPopup}
                />
              )}
            </div>
            <div className="w-full shadow-3xl rounded-lg flex flex-col py-2 justify-center px-4 relative">
              <div className="flex pl-2 justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-primary-red-600 font-bold text-[16px]">
                    Dedicación por cliente
                  </span>
                  <span className="text-primary-red-600 text-[14px]">
                    Clientes x Horas reales
                  </span>
                </div>
                <div
                  className={"cursor-pointer hover:scale-105 px-4 py-2"}
                  onClick={() => setOpenPopup2(!openPopup2)}
                >
                  <DotsIcon />
                </div>
              </div>
              <Chart
                chartType="PieChart"
                width="100%"
                height="100%"
                data={currentDataDedicacionPorColaborador}
                options={options}
              />
              {openPopup2 && (
                <Popup
                  openSubPopup={openSubPopup2}
                  setOpenSubPopup={setOpenSubPopup2}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientsPlanning;
