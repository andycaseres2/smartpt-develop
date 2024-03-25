import DotsIcon from "../../../assets/Icons/DotsIcon";
import Chart from "react-google-charts";
import { useEffect, useState } from "react";
import InputDate from "../../../components/Inputs/InputDate";
import BoxHours from "../../../components/Boxes/BoxHours";
import ButtonWithIcon from "../../../components/Buttons/ButtonWithIcon";
import ExportIcon from "../../../assets/Icons/ExportIcon";
import Popup from "../../../components/Popups/Popup";
import { getData } from "../../../services/getData";
import { userStore } from "../../../store/userStore";
import CleanIcon from "../../../assets/Icons/CleanIcon";
import { stateStore } from "../../../store/stateStore";
import Select from "../../../components/Selects/Select";
import MonthLegend from "../../../components/MonthLegend";
import MultiSelect from "../../../components/Selects/MultiSelect";

const GeneralDashboards = () => {
  const { token } = userStore();
  const { employees } = stateStore();
  const [openPopup, setOpenPopup] = useState(false);
  const [openSubPopup, setOpenSubPopup] = useState(false);
  const [openPopup2, setOpenPopup2] = useState(false);
  const [openSubPopup2, setOpenSubPopup2] = useState(false);
  const [realTime, setRealTime] = useState(true);
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const monthsWithId = months.map((month, index) => ({
    id: index + 1,
    name: month,
  }));

  const colors = [
    "#E93E37",
    "#E93E70",
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

  const [dataReportByClient, setDataReportByClient] = useState([]);
  const [dataReportByWorker, setDataReportByWorker] = useState([]);
  const [dataReportByClientMonth, setDataReportByClientMonth] = useState([]);
  const [dataReportByProcess, setDataReportByProcess] = useState([]);
  const [dataReportByActivity, setDataReportByActivity] = useState([]);
  const [dataReportActivity, setDataReportActivity] = useState([]);
  const [dataReportByClientTable, setDataReportByClientTable] = useState([]);

  useEffect(() => {
    const transformToBarPlot = (originalData, key) => {
      const colors = [
        "#E93E37",
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

    const transformToPieBarPlot = (originalData) => {
      const transformedArray = [["Task", "Hours per Day"]];

      originalData.forEach((item) => {
        transformedArray.push([item.state.toString(), item.count]);
      });

      return transformedArray;
    };
    const transformToComboBarPlot = (originalData) => {
      const colors = [
        "#E93E37",
        "#E93E70",
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

      // Agrupar datos por cliente y mes
      var clientsData = {};
      originalData.forEach((item) => {
        const client = item.name;
        const month = new Date(item.to_char).toLocaleString("en-US", {
          month: "long",
        });
        if (!clientsData[client]) {
          clientsData[client] = {};
        }
        clientsData[client][month] = item.sum;
      });

      // Iterar sobre los clientes
      Object.keys(clientsData).forEach((client) => {
        const clientData = clientsData[client];
        Object.keys(clientData).forEach((month) => {
          const color = colors[Math.floor(Math.random() * colors.length)];
          result.push([client, clientData[month], color, null]);
        });
      });

      return result;
    };

    const fetchDataOnMount = async () => {
      try {
        const baseUrl = import.meta.env.VITE_REACT_APP_URL_BASE;
        const dashboardEndpointReport1 = `${baseUrl}Dashboard?reporte=1&startDate=${"2024-02-01T00:00:00"}&endDate=${"2024-03-01T00:00:00"}`;
        const dashboardEndpointReport2 = `${baseUrl}Dashboard?reporte=2&startDate=${"2024-02-01T00:00:00"}&endDate=${"2024-03-01T00:00:00"}`;
        const dashboardEndpointReport3 = `${baseUrl}Dashboard?reporte=3&startDate=${"2024-02-01T00:00:00"}&endDate=${"2024-03-01T00:00:00"}`;
        const dashboardEndpointReport4 = `${baseUrl}Dashboard?reporte=4&startDate=${"2024-02-01T00:00:00"}&endDate=${"2024-03-01T00:00:00"}`;
        const dashboardEndpointReport5 = `${baseUrl}Dashboard?reporte=5&startDate=${"2024-02-01T00:00:00"}&endDate=${"2024-03-01T00:00:00"}`;
        const dashboardEndpointReport6 = `${baseUrl}Dashboard?reporte=6&startDate=${"2024-02-01T00:00:00"}&endDate=${"2024-03-01T00:00:00"}`;

        const dataReportByClient = await getData(
          dashboardEndpointReport1,
          token
        );
        setDataReportByClientTable(dataReportByClient);
        setDataReportByClient(transformToBarPlot(dataReportByClient, "name"));

        const dataReportByWorker = await getData(
          dashboardEndpointReport2,
          token
        );
        setDataReportByWorker(
          transformToBarPlot(dataReportByWorker, "fullname")
        );

        const dataReportByClientMonth = await getData(
          dashboardEndpointReport3,
          token
        );
        setDataReportByClientMonth(
          transformToComboBarPlot(dataReportByClientMonth, "name")
        );

        const dataReportByProcess = await getData(
          dashboardEndpointReport4,
          token
        );
        setDataReportByProcess(transformToBarPlot(dataReportByProcess, "name"));

        const dataReportByActivity = await getData(
          dashboardEndpointReport5,
          token
        );
        setDataReportByActivity(
          transformToBarPlot(dataReportByActivity, "name")
        );

        const dataReportActivity = await getData(
          dashboardEndpointReport6,
          token
        );
        setDataReportActivity(
          transformToPieBarPlot(dataReportActivity, "state")
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
      ticks: [0, 5000, 10000, 15000, 20000, 25000], // Establece los ticks específicos
    },
  };

  const optionsPie = {
    bar: { groupWidth: "100%" },
    legend: { position: "none" },
    chartArea: { width: "60%", height: "85%" },
    height: 300,
    hAxis: {
      minValue: 0,
      ticks: [0, 1000, 2000, 3100], // Establece los ticks específicos
    },
    pieHole: 0.6,
    is3D: false,
  };
  const optionsComboBar = {
    seriesType: "bars",
  };

  const totalHoras = dataReportByClientTable.reduce(
    (total, cliente) => total + cliente.sum,
    0
  );

  return (
    <div className="w-full h-[690px] bg-white p-4 shadow-3xl rounded-lg relative overflow-hidden overflow-y-auto">
      <div className="w-full flex justify-between">
        <h1 className="w-max text-primary-red-500 text-[32px] font-bold">
          Dashboard general
        </h1>
        <div className="w-max flex gap-3 justify-end">
          <MultiSelect
            options={employees}
            setTasks={""}
            newFilter={""}
            initialOption={"Colaborador"}
            setInitialOption={""}
            consolided={true}
            isFilter={true}
            urlBase={""}
            setUrlBase={""}
            colorSelect={"bg-primary-purple-50"}
          />
          <InputDate
            text={"Fecha inicio"}
            urlBase={""}
            setUrlBase={""}
            setTasks={""}
            newFilter={"startDate"}
            fieldReset={""}
          />
          <InputDate
            text={"Fecha fin"}
            urlBase={""}
            setUrlBase={""}
            setTasks={""}
            newFilter={"endDate"}
            fieldReset={""}
          />
          <ButtonWithIcon
            text={"Limpiar filtros"}
            icon={<CleanIcon />}
            action={""}
          />
        </div>
      </div>

      <div className="w-full justify-center mt-4 relative">
        <div className="flex flex-col items-center">
          <span className="!text-xl font-bold text-primary-red-600">
            Resumen
          </span>
          <span>Comparativa de horas</span>
          <div className="flex justify-center gap-8 py-4">
            <BoxHours
              title="Horas programadas"
              porcentaje="+11%"
              values={totalHoras}
            />
            <BoxHours
              title="Horas reales"
              porcentaje="+11%"
              values={totalHoras}
            />
            <BoxHours
              title="Promedio horas por colaborador"
              porcentaje="+11%"
              values={totalHoras * dataReportByClient.length}
            />
            <ButtonWithIcon
              buttonColor={"bg-primary-red-500 absolute left-0 top-0"}
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
                data={dataReportByClient}
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
                    Dedicación por colaborador
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
                data={dataReportByWorker}
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
          <div className="w-full shadow-3xl rounded-lg flex flex-col py-2 justify-center px-4 relative mt-6">
            <div className="flex pl-2 justify-between items-center">
              <div className="flex flex-col">
                <span className="text-primary-red-600 font-bold text-[16px]">
                  Dedicación por cliente mensual
                </span>
                <span className="text-primary-red-600 text-[14px]">
                  Hora x Cliente
                </span>
                <div className="flex gap-4 mt-3">
                  <Select
                    options={monthsWithId}
                    setTasks={""}
                    newFilter={""}
                    initialOption={"Mes inicio"}
                    setInitialOption={""}
                    consolided={true}
                    isFilter={true}
                    urlBase={""}
                    setUrlBase={""}
                    styleSelect={"w-max px-2 !h-9"}
                  />
                  <Select
                    options={monthsWithId}
                    setTasks={""}
                    newFilter={""}
                    initialOption={"Mes fin"}
                    setInitialOption={""}
                    consolided={true}
                    isFilter={true}
                    urlBase={""}
                    setUrlBase={""}
                    styleSelect={"w-max px-2 !h-9"}
                  />
                </div>
              </div>
              <div className={""}>
                <MonthLegend months={months} colors={colors} />
              </div>
            </div>
            <Chart
              chartType="ComboChart"
              width="100%"
              height="400px"
              data={dataReportByClientMonth}
              options={optionsComboBar}
            />
          </div>
          <div className="flex w-full items-start gap-6 mt-4">
            <div className="w-full shadow-3xl rounded-lg flex flex-col py-2 justify-center px-4 relative">
              <div className="flex pl-2 justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-primary-red-600 font-bold text-[16px]">
                    Dedicación por proceso
                  </span>
                  <span className="text-primary-red-600 text-[14px]">
                    Proceso x Horas reales
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
                data={dataReportByProcess}
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
                    Dedicación por actividad
                  </span>
                  <span className="text-primary-red-600 text-[14px]">
                    Actividad x Horas reales
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
                data={dataReportByActivity}
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
          <div className="flex w-full items-start gap-6 mt-4">
            <div className="w-full shadow-3xl rounded-lg flex flex-col py-2 justify-center px-4 relative">
              <div className="flex pl-2 justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-primary-red-600 font-bold text-[16px]">
                    Horas por cliente
                  </span>
                </div>
                <div
                  className={"cursor-pointer hover:scale-105 px-4 py-2"}
                  onClick={() => setOpenPopup(!openPopup)}
                >
                  <DotsIcon />
                </div>
              </div>
              <div>
                <table className="w-full shadow-3xl">
                  <thead className="w-full rounded-lg">
                    <tr className="w-full text-white">
                      <th className="px-2 bg-primary-red-500 rounded-tl-lg">
                        Cliente
                      </th>
                      <th className="px-2 bg-primary-red-500">Horas Reales</th>
                      <th className="px-2 bg-primary-red-500 rounded-tr-lg">
                        Porcentaje
                      </th>
                    </tr>
                  </thead>
                  <tbody className="w-full">
                    {dataReportByClientTable.map((client, index) => {
                      const porcentaje =
                        totalHoras !== 0 ? (client.sum / totalHoras) * 100 : 0;
                      return (
                        <tr
                          className="w-full border-b border-gray-300"
                          key={index}
                        >
                          <td className="px-2 border-r border-gray-300">
                            {client.name}
                          </td>
                          <td className="px-2 border-r border-gray-300">
                            {client.sum}
                          </td>
                          <td className="px-2 border-r border-gray-300">
                            {porcentaje.toFixed(2)}%
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="w-full shadow-3xl rounded-lg flex flex-col py-2 justify-center px-4 relative">
              <div className="flex pl-2 justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-primary-red-600 font-bold text-[16px]">
                    Estados actividades porcentual
                  </span>
                </div>
                <div
                  className={"cursor-pointer hover:scale-105 px-4 py-2"}
                  onClick={() => setOpenPopup2(!openPopup2)}
                >
                  <DotsIcon />
                </div>
              </div>
              <div className="flex justify-start items-center">
                <Chart
                  chartType="PieChart"
                  width="100%"
                  height="100%"
                  data={dataReportActivity}
                  options={optionsPie}
                />
                <div className="w-1/3 flex flex-col items-center">
                  <div className="w-full flex gap-2 justify-start items-center">
                    <span className="text-2xl text-primary-green-500 rounded-full">
                      •
                    </span>
                    <span>Finalizado</span>
                  </div>
                  <div className="w-full flex gap-2 items-center">
                    <span className="text-2xl text-primary-yellow-500 rounded-full">
                      •
                    </span>
                    <span>En proceso</span>
                  </div>
                  <div className="w-full flex gap-2 items-center">
                    <span className="text-2xl text-primary-red-500 rounded-full">
                      •
                    </span>
                    <span>Pendiente</span>
                  </div>
                  <div className="w-full flex gap-2 items-center">
                    <span className="text-2xl text-primary-blue-500 rounded-full">
                      •
                    </span>
                    <span>No ejecutado</span>
                  </div>
                </div>
              </div>
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

export default GeneralDashboards;
