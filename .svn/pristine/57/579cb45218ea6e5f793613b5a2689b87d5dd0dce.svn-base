import { useState } from "react";
import Tabs from "../../components/Tabs/Tabs";
import { stateStore } from "../../store/stateStore";
import SelectGeneric from "../../components/Selects/SelectGeneric";
import Pagination from "../../components/Paginations/Pagination";
import ButtonWithIcon from "../../components/Buttons/ButtonWithIcon";
import Select from "../../components/Selects/Select";
import ColumnTableRequest from "../../components/Tables/ColumnTableRequest";
import InputSecondary from "../../components/Inputs/InputSecondary";
import RowTableBudget from "../../components/Tables/RowTableBudget";
import ProfileCheck from "../../assets/Icons/ProfileCheck";
import CircleCheck from "../../assets/Icons/CircleCheck";
import ExportIcon from "../../assets/Icons/ExportIcon";
import Modal from "../../components/Modals/Modal";
import BudgetModalContent from "./BudgetModalContent";
import CirclePlus from "../../assets/Icons/CirclePlus";

const BudgetContent = () => {
  const [activeTab, setActiveTab] = useState(1);
  const { setOpenNotifications } = stateStore();
  const [stateRow, setStateRow] = useState({});
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };
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
    { id: 1, label: "Registrar presupuesto " },
    { id: 2, label: "Solicitudes" },
    { id: 3, label: "Consolidado" },
  ];

  const columnTitles = [
    "Cliente",
    "Nombre del servicio",
    "Vigencia presupuesto ",
    "Proceso",
    "Actividad",
    "Descripción",
    "",
  ];

  const columnWidths = [
    "w-44", // Ancho para Columna 1
    "w-52", // Ancho para Columna 2
    "w-44", // Ancho para Columna 3
    "w-44", // Ancho para Columna 4
    "w-[350px]", // Ancho para Columna 5
    "w-[350px]", // Ancho para Columna 6
  ];

  const [initialOptionSelect, setInitialOptionSelect] = useState("Cliente");
  const [initialOptionSelectStatus, setInitialOptionSelectStatus] =
    useState("Aprobado");

  const options = [
    { id: 1, value: "SmartPR" },
    { id: 2, value: "MTC" },
    { id: 3, value: "Ford" },
    { id: 4, value: "Toyota" },
  ];

  const optionsStatus = [
    { id: 1, value: "Aprobado" },
    { id: 2, value: "Viable" },
    { id: 3, value: "Rechazado" },
  ];

  const handleSelect = (selectedOption) => {
    setInitialOptionSelect(selectedOption);
  };

  const handleSelectStatus = (selectedOption) => {
    setInitialOptionSelectStatus(selectedOption);
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
      data: "Lorem Ipsum is simply",
      editComponent: "input",
      type: "text",
      key_name: "nombre_del_servicio",
    },
    {
      data: "30 días",
      editComponent: "input",
      type: "text",
      key_name: "vigencia_presupuesto",
    },
    {
      data: "Eventos",
      editComponent: "select",
      options: [
        { id: 1, value: "Eventos" },
        { id: 2, value: "Eventos" },
        { id: 3, value: "Eventos" },
      ],
      key_name: "proceso",
    },
    {
      data: "Construcción o desarrollo de presupuestos",
      editComponent: "input",
      type: "text",
      key_name: "actividad",
    },
    {
      data: "Construcción o desarrollo de presupuestos",
      editComponent: "input",
      type: "text",
      key_name: "descripcion",
    },
  ];

  const data = [
    {
      descripcion: "Estación de cafe y galletas",
      cantidad: 25,
      costoUnitario: 31.0,
      total: 775.0,
      totalUSD: 191.83,
    },
    {
      descripcion: "Estación de cafe y galletas",
      cantidad: 25,
      costoUnitario: 31.0,
      total: 775.0,
      totalUSD: 191.83,
    },
    {
      descripcion: "Estación de cafe y galletas",
      cantidad: 25,
      costoUnitario: 31.0,
      total: 775.0,
      totalUSD: 191.83,
    },
    {
      descripcion: "Estación de cafe y galletas",
      cantidad: 25,
      costoUnitario: 31.0,
      total: 775.0,
      totalUSD: 191.83,
    },
    {
      descripcion: "Estación de cafe y galletas",
      cantidad: 25,
      costoUnitario: 31.0,
      total: 775.0,
      totalUSD: 191.83,
    },
    // Agrega más filas según sea necesario
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
              options={optionsStatus}
              onSelect={handleSelectStatus}
              initialOption={initialOptionSelectStatus}
              readOnly={false}
              editStatus={true}
            />
            <Select
              options={options}
              onSelect={handleSelect}
              initialOption={initialOptionSelect}
              readOnly={false}
              editStatus={true}
            />
          </div>
        )}
      </div>

      <div className="bg-white rounded-bl-md rounded-r-md overflow-auto h-[660px]">
        {activeTab === 1 && (
          <div className="overflow-x-auto h-full">
            <div className="">
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
                    <h2>Nombre del servicio</h2>
                    <InputSecondary
                      type="text"
                      name="name"
                      placeholder="Nombre del servicio"
                      value={""}
                      handleChange={() => {}}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2>Vigencia presupuesto días</h2>
                    <InputSecondary
                      type="text"
                      name="name"
                      placeholder="Nombre del servicio"
                      value={"30"}
                      handleChange={() => {}}
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
                    <h2>Actividad</h2>
                    <SelectGeneric
                      options={[]}
                      initialOption={""}
                      key_name=""
                      handleChange={() => {}}
                      styleSelect={"w-[157px]"}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col gap-4 px-6">
                <div className="flex flex-col gap-3 ">
                  <span>Descripción</span>
                  <textarea
                    name="descripcion_pieza"
                    id="descripcion_pieza"
                    cols="30"
                    rows="10"
                    className="w-full rounded-md p-2 shadow-3xl h-[120px] focus:outline-none"
                  ></textarea>
                </div>
              </div>
              <div className="w-full flex flex-col gap-4 px-6 mt-4">
                <div className="flex flex-col gap-3 ">
                  <span>Presupuesto</span>
                  <div className="w-full">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="py-2 text-left">Descripción</th>
                          <th className="py-2 text-left">Cantidad</th>
                          <th className="py-2 text-left">Coste unitario</th>
                          <th className="py-2 text-left">Total</th>
                          <th className="py-2 text-left">Total USD</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((item, index) => (
                          <tr key={index}>
                            <td className="py-2">{item.descripcion}</td>
                            <td className="py-2">{item.cantidad}</td>
                            <td className="py-2">{item.costoUnitario}</td>
                            <td className="py-2">{item.total}</td>
                            <td className="py-2">{item.totalUSD}</td>
                          </tr>
                        ))}
                        {/* Subtotal Row */}
                        <tr className="bg-rose-100">
                          <td className="py-2 font-bold" colSpan="3">
                            Subtotal
                          </td>
                          <td className="py-2">$3.875.000</td>
                          <td className="py-2">$971.01</td>
                        </tr>
                        {/* Financial Expenses Row */}
                        <tr className="">
                          <td className="py-2" colSpan="3">
                            Financial Expenses
                          </td>
                          <td className="py-2">$3.875.000</td>
                          <td className="py-2">$971.01</td>
                        </tr>
                        {/* BEFORE TAXES Row */}
                        <tr className="font-bold">
                          <td className="py-2" colSpan="3">
                            BEFORE TAXES
                          </td>
                          <td className="py-2">$3.875.000</td>
                          <td className="py-2">$971.01</td>
                        </tr>
                        {/* Local Taxes Row */}
                        <tr className="">
                          <td className="py-2" colSpan="3">
                            Local Taxes (IVA - 19%)
                          </td>
                          <td className="py-2">$3.875.000</td>
                          <td className="py-2">$971.01</td>
                        </tr>
                        {/* Total Row */}
                        <tr className="text-white bg-primary-red-600 font-bold">
                          <td className="py-2" colSpan="3">
                            Total
                          </td>
                          <td className="py-2">$3.875.000</td>
                          <td className="py-2">$971.01</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-end pt-2 pb-8 px-6 w-full gap-14">
                <div className="w-[67%] ml-2">
                  <span className="text-sm text-gray-500">
                    Todas las ideas, conceptos, información, materiales y
                    estrategias contenidas en este documento (incluyendo todos
                    los derechos de autor y marcas) son y deben ser
                    confidenciales y su propiedad intelectual pertenece a Smart
                    PR SAS y no puede ser utilizada hasta que pueda estar
                    disponible a través de una relación contractual.
                  </span>
                </div>
                <ButtonWithIcon
                  text="Registrar presupuesto"
                  onClick={() => {}}
                  icon={<CirclePlus />}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 2 && (
          <div className="overflow-x-auto h-full">
            <div className="h-[580px] min-w-max">
              <div className="min-w-max h-full">
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
                      <RowTableBudget
                        listItems={listItems}
                        columnWidths={columnWidths}
                        stateRow={stateRow}
                        handleChange={handleChange}
                        readOnly={false}
                        editStatus={false}
                        onOpenModal={handleOpenModal}
                      />
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="fixed w-full flex gap-8 justify-center py-4">
              <ButtonWithIcon
                icon={<ProfileCheck />}
                text="Aprobar por cliente"
                onClick={() => {}}
              />
              <ButtonWithIcon
                icon={<CircleCheck />}
                text="Aprobar por planeación "
                onClick={() => {}}
              />
              <ButtonWithIcon
                icon={<ExportIcon />}
                text="Exportar"
                onClick={() => {}}
              />
            </div>
          </div>
        )}

        {activeTab === 3 && (
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
                    <RowTableBudget
                      listItems={listItems}
                      columnWidths={columnWidths}
                      stateRow={stateRow}
                      handleChange={handleChange}
                      readOnly={true}
                      onOpenModal={handleOpenModal}
                    />
                  </tbody>
                </table>
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

      {isOpenModal && (
        <Modal onClose={handleCloseModal}>
          <BudgetModalContent data={data} />
        </Modal>
      )}
    </div>
  );
};

export default BudgetContent;
