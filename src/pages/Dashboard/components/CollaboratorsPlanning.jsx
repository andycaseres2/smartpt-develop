import Chart from "react-google-charts";
import DotsIcon from "../../../assets/Icons/DotsIcon";
import ExportIcon from "../../../assets/Icons/ExportIcon";
import BoxHours from "../../../components/Boxes/BoxHours";
import ButtonWithIcon from "../../../components/Buttons/ButtonWithIcon";
import InputDate from "../../../components/Inputs/InputDate";
import SelectGeneric from "../../../components/Selects/SelectGeneric";
import { useState } from "react";
import Popup from "../../../components/Popups/Popup";

const CollaboratorsPlanning = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const [openSubPopup, setOpenSubPopup] = useState(false);
  const [openPopup2, setOpenPopup2] = useState(false);
  const [openSubPopup2, setOpenSubPopup2] = useState(false);
  
  useEffect(() => {

    const transformToBarPlot = (originalData,key) => {
      const colors =["#E93E37",
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
        "#8B6BAE"]

        var result=[
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
          ]
        ];
        for (var i = 0,currentColor=0; i < originalData.length; i++,currentColor++){
          if(currentColor>=colors.length) {
            currentColor=0;
          }
          result.push([originalData[i][key],originalData[i]["sum"],colors[currentColor],null]);
        }
        return result;
    }

    const fetchDataOnMount = async () => {
      try {
        const baseUrl = import.meta.env.VITE_REACT_APP_URL_BASE;
        const dashboardEndpointReport1 = `${baseUrl}Dashboard?reporte=1&startDate=${"2024-02-01T00:00:00"}&endDate=${"2024-03-01T00:00:00"}`;
        const dashboardEndpointReport2 = `${baseUrl}Dashboard?reporte=2&startDate=${"2024-02-01T00:00:00"}&endDate=${"2024-03-01T00:00:00"}`;
        const dashboardEndpointReport3 = `${baseUrl}Dashboard?reporte=3&startDate=${"2024-02-01T00:00:00"}&endDate=${"2024-03-01T00:00:00"}`;
        const dashboardEndpointReport4 = `${baseUrl}Dashboard?reporte=4&startDate=${"2024-02-01T00:00:00"}&endDate=${"2024-03-01T00:00:00"}`;
        const dashboardEndpointReport5 = `${baseUrl}Dashboard?reporte=5&startDate=${"2024-02-01T00:00:00"}&endDate=${"2024-03-01T00:00:00"}`;
        const dashboardEndpointReport6 = `${baseUrl}Dashboard?reporte=6&startDate=${"2024-02-01T00:00:00"}&endDate=${"2024-03-01T00:00:00"}`;
        const dashboardEndpointReport7 = `${baseUrl}Dashboard?reporte=7&startDate=${"2024-02-01T00:00:00"}&endDate=${"2024-03-01T00:00:00"}`;
        const dashboardEndpointReport8 = `${baseUrl}Dashboard?reporte=8&startDate=${"2024-02-01T00:00:00"}&endDate=${"2024-03-01T00:00:00"}`;
        const dashboardEndpointReport9 = `${baseUrl}Dashboard?reporte=9&startDate=${"2024-02-01T00:00:00"}&endDate=${"2024-03-01T00:00:00"}`;
        
        const dataDedicacionPorCliente = await getData(dashboardEndpointReport1, token);
        setCurrentDataDedicacionPorCliente(transformToBarPlot(dataDedicacionPorCliente,"name"));
        
        const dataDedicacionPorColaborador = await getData(dashboardEndpointReport2, token);
        setCurrentDataDedicacionPorColaborador(transformToBarPlot(dataDedicacionPorColaborador,"fullname"));

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {

      }
    };

    fetchDataOnMount();
    setRealTime(false);
  }, [realTime]);

  const data = [
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
    ["SmartPR", 3050, "#E93E37", null],
    ["Schneider Electric", 2800, "#E93E37", null],
    ["Indra", 2700, "#DF4D62", null],
    ["Schneider Electric", 2500, "#FF7686", null],
    ["Indra", 2400, "#E47526", null],
    ["SmartPR", 2000, "#EA9717", null],
    ["Xiaomi", 1500, "#81BA63", null],
    ["SmartPR", 1200, "#43E18C", null],
    ["SmartPR", 1000, "##80B5C5", null],
    ["GI group", 800, "#b87333", null],
    ["Xiaomi", 500, "#0192D3", null],
    ["SmartPR", 300, "##8B6BAE", null],
  ];

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
        <h1 className="w-max text-primary-orange-500 text-[32px] font-bold">
          Estado planeación clientes
        </h1>
        <div className="flex gap-4">
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

      <div className="w-full justify-center mt-4 relative">
        <div className="flex flex-col items-center">
          <span className="!text-xl font-bold text-primary-orange-500">
            Resumen
          </span>
          <span>Comparativa de horas</span>
          <div className="flex justify-center gap-8 py-4">
            <BoxHours
              title="Horas programadas"
              porcentaje="+11%"
              values="15.000"
              color={"primary-orange-500"}
            />
            <BoxHours
              title="Horas reales"
              porcentaje="+11%"
              values="14.900"
              color={"primary-orange-500"}
            />
            <BoxHours
              title="Porcentaje de planeación"
              porcentaje="+11%"
              values="1%"
              color={"primary-orange-500"}
              textColor={"text-primary-green-500"}
            />
            <ButtonWithIcon
              buttonColor={"bg-primary-orange-500 absolute left-0 top-0"}
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
                chartType="BarChart"
                width="100%"
                height="100%"
                data={data}
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
                chartType="BarChart"
                width="100%"
                height="100%"
                data={data}
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

export default CollaboratorsPlanning;
