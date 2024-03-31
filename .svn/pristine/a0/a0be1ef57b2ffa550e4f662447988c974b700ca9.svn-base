import { useState } from "react";
import Tabs from "../../components/Tabs/Tabs";
import { stateStore } from "../../store/stateStore";
import SelectGeneric from "../../components/Selects/SelectGeneric";
import Pagination from "../../components/Paginations/Pagination";
import InputDate from "../../components/Inputs/InputDate";
import ButtonWithIcon from "../../components/Buttons/ButtonWithIcon";
import InputTime from "../../components/Inputs/InputTime";
import Select from "../../components/Selects/Select";
import RowTableRequest from "../../components/Tables/RowTableRequest";
import ColumnTableRequest from "../../components/Tables/ColumnTableRequest";
import CirclePlus from "../../assets/Icons/CirclePlus";

const RequestDataContent = () => {
  const [activeTab, setActiveTab] = useState(1);
  const { setOpenNotifications } = stateStore();
  const [stateRow, setStateRow] = useState({});

  const handleChange = (e) => {
    setStateRow((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const tabs = [
    { id: 1, label: "Registrar solicitud" },
    { id: 2, label: "Solicitudes" },
    { id: 3, label: "Consolidado" },
  ];

  const columnTitles = [
    "Cliente",
    "Tipo de servicio ",
    "Proceso",
    "Actividad ",
    "Especificaciones",
    "Fecha de entrega",
    "Responsable",
    "Horas estimadas",
    "Horas reales",
    "Estado ",
    "",
  ];
  const columnWidths = [
    "w-44", // Ancho para Columna 1
    "w-44", // Ancho para Columna 2
    "w-44", // Ancho para Columna 3
    "w-[350px]", // Ancho para Columna 4
    "w-[350px]", // Ancho para Columna 5
    "w-44", // Ancho para Columna 6
    "w-44", // Ancho para Columna 7
    "w-44", // Ancho para Columna 8
    "w-44", // Ancho para Columna 9
    "w-44", // Ancho para Columna 10
    "w-44", // Ancho para Columna 11
    "w-44", // Ancho para Columna 12
    "w-10", // Ancho para Columna 13
  ];

  const [initialOptionSelect, setInitialOptionSelect] = useState("Cliente");

  const options = [
    { id: 1, value: "SmartPR" },
    { id: 2, value: "MTC" },
    { id: 3, value: "Ford" },
    { id: 4, value: "Toyota" },
  ];

  const handleSelect = (selectedOption) => {
    setInitialOptionSelect(selectedOption);
  };

  const listItems = [
    {
      data: "Ford",
      editComponent: "select",
      options: [
        { id: 1, value: "SmartPR" },
        { id: 2, value: "MTC" },
        { id: 3, value: "Ford" },
        { id: 4, value: "Toyota" },
      ],
      key_name: "cliente",
    },
    {
      data: "Tipo de servicio",
      editComponent: "select",
      options: [
        { id: 1, value: "Video" },
        { id: 2, value: "Grafica" },
        { id: 3, value: "Ambos" },
      ],
      key_name: "tipo_de_servicio",
    },
    {
      data: "Proceso",
      editComponent: "input",
      type: "text",
      key_name: "Proceso",
    },
    {
      data: "Actividad",
      editComponent: "input",
      type: "text",
      key_name: "actividad",
    },
    {
      data: "Especificaciones",
      editComponent: "input",
      type: "text",
      key_name: "especificaciones",
    },
    {
      data: "2024-01-26",
      editComponent: "input",
      type: "date",
      key_name: " ",
    },
    {
      data: "German",
      editComponent: "select",
      options: [
        { id: 1, value: "German" },
        { id: 2, value: "Sebas" },
      ],
      key_name: " ",
    },
    {
      data: "04:00",
      editComponent: "input",
      type: "time",
      key_name: "hora_estimada",
    },
    {
      data: "05:00",
      editComponent: "input",
      type: "time",
      key_name: "hora_reales",
    },
    {
      data: "En proceso",
      editComponent: "status",
      options: [
        { id: 1, value: "Pendiente" },
        { id: 2, value: "Finalizado" },
        { id: 3, value: "En ejecucion" },
        { id: 4, value: "En proceso" },
      ],
      key_name: "estado",
    },
    {
      data: "Animación",
      editComponent: "input",
      type: "text",
      key_name: "observaciones",
    },
  ];

  return (
    <div className="flex flex-col" onClick={() => setOpenNotifications(false)}>
      <div className="w-full flex justify-between z-[2]">
        <div className="flex items-end tab">
          <div className="flex items-end">
            <Tabs
              tabs={tabs}
              activeTab={activeTab}
              handleTabClick={handleTabClick}
            />
          </div>
        </div>
        {activeTab === 2 && (
          <div className="flex gap-3 items-center mb-2">
            <Select
              options={options}
              onSelect={handleSelect}
              initialOption={initialOptionSelect}
              readOnly={false}
              editStatus={true}
            />
          </div>
        )}

        {activeTab === 3 && (
          <div className="flex gap-3 items-center mb-2">
            <Select
              options={options}
              onSelect={handleSelect}
              initialOption={initialOptionSelect}
              readOnly={false}
              editStatus={true}
            />
            <InputDate text={"Diciembre"} />
          </div>
        )}
      </div>

      <div className="bg-white rounded-bl-md rounded-r-md overflow-auto h-[660px]">
        {activeTab === 1 && (
          <div className="overflow-x-auto h-full">
            <div className="w-full">
              <div className="w-full flex px-6 py-5">
                <div className="w-full flex gap-7">
                  <div className="flex flex-col gap-2">
                    <h2>Cliente</h2>
                    <SelectGeneric
                      options={[]}
                      initialOption={""}
                      key_name=""
                      handleChange={() => {}}
                      styleSelect={"w-[157px]"}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2>Tipo de servicio</h2>
                    <SelectGeneric
                      options={[]}
                      initialOption={""}
                      key_name=""
                      handleChange={() => {}}
                      styleSelect={"w-[157px]"}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2>Proceso</h2>
                    <SelectGeneric
                      options={[]}
                      initialOption={""}
                      key_name=""
                      handleChange={() => {}}
                      styleSelect={"w-[157px]"}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2>Actividad </h2>
                    <SelectGeneric
                      options={[]}
                      initialOption={""}
                      key_name=""
                      handleChange={() => {}}
                      styleSelect={"w-[157px]"}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <h2>Responsable</h2>
                  <SelectGeneric
                    options={[]}
                    initialOption={""}
                    key_name=""
                    handleChange={() => {}}
                    styleSelect={"w-[157px]"}
                  />
                </div>
              </div>
              <div className="w-full flex flex-col gap-4 px-6">
                <div className="flex flex-col gap-3">
                  <span>Especificaciones</span>
                  <span>
                    1. Explica brevemente la intención del estudio: ideas para
                    generación de contenido a través de los datos, conocimiento
                    de cliente, share of voice, entre otros.
                  </span>
                  <span>
                    2. Si necesitas una escucha social por favor comparte con
                    nosotros las palabras claves y relevantes para incluir
                    dentro de la búsqueda (de tu cliente y competidores, si
                    aplica).
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  <textarea
                    name="descripcion_pieza"
                    id="descripcion_pieza"
                    cols="30"
                    rows="10"
                    className="w-full rounded-md p-2 shadow-3xl h-[245px] focus:outline-none"
                  ></textarea>
                </div>
              </div>
              <div className="w-1/2 flex gap-8 px-6 py-8 justify-start">
                <div className="w-max flex flex-col gap-3">
                  <span>Fecha entrega</span>
                  <InputDate position={"absolute top-11 -right-20"} />
                </div>
                <div className="w-max flex flex-col gap-3">
                  <span>Hora estimada </span>
                  <InputTime
                    handleChange={() => {}}
                    defaultValue={""}
                    key_name={""}
                    type={"time"}
                  />
                </div>
                <div className="w-max flex flex-col gap-3">
                  <span>Hora realal</span>
                  <InputTime
                    handleChange={() => {}}
                    defaultValue={""}
                    key_name={""}
                    type={"time"}
                  />
                </div>
              </div>
              <div className="w-full flex flex-col gap-4 px-6">
                <div className="flex flex-col gap-3">
                  <span>
                    <strong>Nota: </strong>
                    De ser necesario concretaríamos una reunión con los equipos
                    para ajustar temas de tiempos de entrega u otros detalles de
                    la solicitud (propósito, muestra, requerimientos, etc),
                    debido al trá co de solicitudes que manejamos dentro del
                    área.
                  </span>
                  <span>
                    <strong>Recordatorio: </strong>
                    Si necesitan refrescar el propósito del área, sus servicios
                    y el funcionamiento de Meltwater, lo pueden consultar en el
                    siguiente link.
                  </span>
                  <span>
                    Presentación Meltwater:{" "}
                    <a href="#" className="underline">
                      https://drive.google.com/%20le/d/17uUB9vbAYuYS1VlwHs3acTeHl7DKZGFp/vi%20ew?usp=sharing
                    </a>
                  </span>
                  <span>
                    Presentación Meltwater:{" "}
                    <a href="#" className="underline">
                      https://drive.google.com/%20le/d/17uUB9vbAYuYS1VlwHs3acTeHl7DKZGFp/vi%20ew?usp=sharing
                    </a>
                  </span>
                </div>
              </div>
              <div className="flex justify-end py-8 px-6">
                <ButtonWithIcon
                  text="Registrar solicitud"
                  onClick={() => {}}
                  icon={<CirclePlus />}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 2 && (
          <div className="overflow-x-auto h-full">
            <div className="min-w-max">
              <div className="w-full p-3">
                <table className="min-w-full">
                  <thead>
                    <ColumnTableRequest
                      columnTitlesActivity={columnTitles}
                      columnWidths={columnWidths}
                      readOnly={false}
                    />
                  </thead>
                  <tbody className="border-b border-gray-300">
                    <RowTableRequest
                      listItems={listItems}
                      columnWidths={columnWidths}
                      stateRow={stateRow}
                      handleChange={handleChange}
                      readOnly={false}
                      editStatus={false}
                    />
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 3 && (
          <div className="w-full h-full flex flex-col gap-6">
            <div className="w-full h-full flex flex-col">
              <div className="flex px-4 mt-6 bg-white justify-between">
                <div className="flex gap-2 items-center">
                  <p className="text-xl text-primary-red-600 font-semibold">
                    SmartPR
                  </p>
                  <span className="py-1 px-4 rounded-lg text-white font-base bg-primary-green-500">
                    140 horas
                  </span>
                </div>
                <div className="flex gap-2 items-center">
                  <p className="text-xl text-primary-red-600 font-semibold">
                    Horas totales:
                  </p>
                  <span className="py-1 px-4 rounded-lg text-white font-base bg-primary-blue-500">
                    504 horas
                  </span>
                </div>
              </div>
              <div className="overflow-x-auto h-full">
                <div className="min-w-max">
                  <div className="w-full p-3">
                    <div className="overflow-x-auto">
                      <table className="min-w-full">
                        <thead>
                          <ColumnTableRequest
                            columnTitlesActivity={columnTitles}
                            columnWidths={columnWidths}
                            readOnly={false}
                          />
                        </thead>
                        <tbody className="border-b border-gray-300">
                          <RowTableRequest
                            listItems={listItems}
                            columnWidths={columnWidths}
                            stateRow={stateRow}
                            handleChange={handleChange}
                            readOnly={true}
                            editStatus={false}
                          />
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {activeTab === 3 && (
        <div className="flex justify-end">
          <Pagination />
        </div>
      )}
    </div>
  );
};

export default RequestDataContent;
