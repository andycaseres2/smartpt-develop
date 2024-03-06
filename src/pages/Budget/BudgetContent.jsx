import { useState, useEffect } from "react";
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
import { postData } from "../../services/postData";
import { userStore } from "../../store/userStore";
import { getData } from "../../services/getData";
import CleanIcon from "../../assets/Icons/CleanIcon";

const BudgetContent = ({
  budget,
  setBudget,
  totalPages,
  setTooltipSuccess,
  setTooltipError,
  setLoading,
  setRealTime,
  columnWidths,
  columnTitles,
}) => {
  const [activeTab, setActiveTab] = useState(1);
  const [stateRow, setStateRow] = useState({});
  const [isOpenModal, setIsOpenModal] = useState(false);
  console.log("stateRow", stateRow);
  const {
    setOpenNotifications,
    clients,
    processes,
    activities,
    setCancelEdit,
  } = stateStore();
  const { user, token } = userStore();
  const [fieldReset, setFieldReset] = useState(false);
  const [updateActivities, setUpdateActivities] = useState([]);
  const [urlBase, setUrlBase] = useState(`
    ${
      import.meta.env.VITE_REACT_APP_URL_BASE
    }FormattedBudget?page=1&size=10&IdEmployee=${user.id}`);

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
  const [initialOptionClient, setInitialOptionClient] = useState("Cliente");

  const handleTabClick = async (tab) => {
    setActiveTab(tab);
    setLoading(true);
    setCancelEdit(true);
    try {
      const baseUrl = import.meta.env.VITE_REACT_APP_URL_BASE;
      let tasksEndpoint = "";
      let initialOptions = {};

      if (tab === 3) {
        tasksEndpoint = `${baseUrl}FormattedBudget?consolidated=true&page=1&size=100&IdEmployee=${user.id}`;
        initialOptions = {
          client: "Clientes",
        };
        setCancelEdit(true);
      } else if (tab === 2) {
        tasksEndpoint = `${baseUrl}FormattedBudget?page=1&size=100&IdEmployee=${user.id}`;
        initialOptions = {
          client: "Clientes",
        };
        setCancelEdit(true);
      }

      setUrlBase(tasksEndpoint);
      const tasksData = await getData(tasksEndpoint, token);
      setBudget(tasksData);
      setInitialOptionClient(initialOptions.client);
    } catch (error) {
      console.error("Error al obtener datos de las tareas:", error);
    } finally {
      setLoading(false);
      setCancelEdit(true);
    }
  };
  const tabs = [
    { id: 1, label: "Registrar presupuesto " },
    { id: 2, label: "Solicitudes" },
    { id: 3, label: "Consolidado" },
  ];

  useEffect(() => {
    setUpdateActivities(activities);
  }, [activities]);

  const handleSelectProcess = (id) => {
    const filterActivities = activities.filter(
      (activity) => activity.idprocess === id
    );
    setUpdateActivities(filterActivities);
  };

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

  const [rows, setRows] = useState([
    {
      id: 0,
      idbudget: 0,
      description: "",
      units: 0,
      price: 0,
      type: 0,
      idtax: 0,
    },
  ]);
  const [total, setTotal] = useState(0);
  const [subTotal, setSubTotal] = useState(0);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedRows = [...rows];

    if (name === "description") {
      // Permitir letras y números en el campo "description"
      updatedRows[index][name] = value;
    } else {
      // Solo permitir números en otros campos
      const numericValue = parseFloat(value);
      updatedRows[index][name] = isNaN(numericValue) ? "" : numericValue;
    }

    // Calcular el total para la fila actual multiplicando unidades por precio
    const units = parseFloat(updatedRows[index].units) || 0;
    const price = parseFloat(updatedRows[index].price) || 0;
    updatedRows[index].total = units * price;

    // Calcular el total en USD (asumiendo un tipo de cambio fijo)
    const exchangeRate = 1.2;
    updatedRows[index].totalUSD = updatedRows[index].total * exchangeRate;

    // Actualizar el estado de las filas
    setRows(updatedRows);

    // Calcular el nuevo total sumando los totales de todas las filas
    let newTotal = 0;
    updatedRows.forEach((row) => {
      newTotal += parseFloat(row.total);
    });

    // Actualizar el estado del total
    setTotal(newTotal);
    setSubTotal(newTotal);
  };

  const addRow = () => {
    setRows([
      ...rows,
      {
        id: 0,
        idbudget: 0,
        description: "",
        units: 1,
        price: 0,
        type: 0,
        idtax: 0,
      },
    ]);
  };

  const handleCleanFilters = async () => {
    setFieldReset(true);
    setInitialOptionClient("Clientes");
    const baseUrl = import.meta.env.VITE_REACT_APP_URL_BASE;
    let tasksEndpoint = "";
    if (activeTab === 2) {
      tasksEndpoint = `${baseUrl}FormattedBudget?page=1&size=100&IdEmployee=${user.id}`;
    } else if (activeTab === 3) {
      tasksEndpoint = `${baseUrl}FormattedBudget?consolidated=true&page=1&size=10&IdEmployee=${user.id}`;
    }
    setUrlBase(tasksEndpoint);
    try {
      const tasksData = await getData(tasksEndpoint, token);
      setBudget(tasksData);
    } catch (error) {
      console.error("Error fetching clients data:", error);
    }
    setFieldReset(false);
  };

  const handleSubmit = async (idBudget) => {
    try {
      const baseUrl = import.meta.env.VITE_REACT_APP_URL_BASE;
      const budgetEndpoint = `${baseUrl}BudgetDetails`;

      for (const row of rows) {
        row.idbudget = idBudget;
        row.idtax = 1;

        // Eliminar la propiedad 'id' de 'row'
        delete row.id;

        const body = {
          ...row,
          total: total,
        };
        await postData(budgetEndpoint, body, token);
      }
    } catch (error) {
      console.error("Error al manejar la solicitud:", error);
      // Puedes manejar el error de otra manera aquí, como mostrar un mensaje de error al usuario.
    }
  };

  const handleFormSubmit = async (event) => {
    try {
      event.preventDefault();
      const baseUrl = import.meta.env.VITE_REACT_APP_URL_BASE;
      const budgetEndpoint = `${baseUrl}Budget`;
      const body = {
        ...stateRow,
        total: total,
      };
      const budget = await postData(budgetEndpoint, body, token);
      await handleSubmit(budget.id);
      setStateRow({});
      setTooltipSuccess("Registro creado con exito");
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setTooltipError("Hubo un error al crear el registro");
    } finally {
      setRealTime(true);
      setStateRow({});
      setFieldReset(true);
    }
  };

  const getDataValues = (arr) => {
    const result = [];
    arr?.forEach((innerArray) => {
      innerArray?.forEach((obj) => {
        if (obj?.key_name === "idcustomer") {
          result.push(obj.data);
        }
      });
    });
    return result;
  };

  const dataList = budget && getDataValues(budget);
  const uniqueMap = {};
  const newClients = [];
  dataList.forEach((value) => {
    const found = clients.find((client) => client.name === value);
    if (found && !uniqueMap[found.id]) {
      uniqueMap[found.id] = true; // Registrar el id como único
      newClients.push(found);
    }
  });

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
              options={newClients}
              setTasks={setBudget}
              newFilter={"IdCustomer"}
              initialOption={initialOptionClient}
              setInitialOption={setInitialOptionClient}
              isFilter={true}
              urlBase={urlBase}
              setUrlBase={setUrlBase}
            />
            <ButtonWithIcon
              text={"Limpiar filtros"}
              icon={<CleanIcon />}
              action={handleCleanFilters}
            />
          </div>
        )}

        {activeTab === 3 && (
          <div className="flex gap-3 items-center mb-2">
            <Select
              options={newClients}
              setTasks={setBudget}
              newFilter={"IdCustomer"}
              initialOption={initialOptionClient}
              setInitialOption={setInitialOptionClient}
              isFilter={true}
              urlBase={urlBase}
              setUrlBase={setUrlBase}
            />

            <ButtonWithIcon
              text={"Limpiar filtros"}
              icon={<CleanIcon />}
              action={handleCleanFilters}
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
                      options={clients}
                      initialOption={""}
                      key_name="idcustomer"
                      handleChange={handleChange}
                      styleSelect={"w-[157px]"}
                      fieldReset={fieldReset}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2>Nombre del servicio</h2>
                    <InputSecondary
                      type="text"
                      name="name"
                      placeholder="Nombre del servicio"
                      value={stateRow?.servicename}
                      key_name={"servicename"}
                      handleChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2>Vigencia presupuesto días</h2>
                    <InputSecondary
                      type="text"
                      name="name"
                      placeholder="Nombre del servicio"
                      value={stateRow?.validto}
                      handleChange={handleChange}
                      key_name={"validto"}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2>Proceso</h2>
                    <SelectGeneric
                      options={processes}
                      initialOption={""}
                      key_name=""
                      handleSelect={handleSelectProcess}
                      styleSelect={"w-[157px]"}
                      fieldReset={fieldReset}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2>Actividad</h2>
                    <SelectGeneric
                      options={updateActivities || activities}
                      initialOption={""}
                      key_name="idactivity"
                      handleChange={handleChange}
                      styleSelect={"w-[157px]"}
                      fieldReset={fieldReset}
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
                    onChange={(e) => {
                      handleChange({
                        target: {
                          name: "description",
                          value: e.target.value,
                        },
                      });
                      setFieldReset(false);
                    }}
                    value={fieldReset ? "" : stateRow["specifications"]}
                  ></textarea>
                </div>
              </div>
              <div className="w-full flex flex-col gap-4 px-6 mt-4">
                <div className="flex flex-col gap-3 ">
                  <span>Presupuesto</span>
                  <div className="w-full">
                    <div className="w-full flex justify-end py-2">
                      <ButtonWithIcon
                        text=" Agregar fila"
                        action={addRow}
                        icon={<CirclePlus />}
                      />
                    </div>
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr className="w-full flex justify-center gap-8">
                          <th className="py-2 text-center w-2/5">
                            {" "}
                            {/* Esta celda ocupará el 40% del ancho */}
                            Descripción
                          </th>
                          <th className="py-2 text-center w-1/5">
                            {" "}
                            {/* Estas celdas ocuparán cada una el 20% del ancho */}
                            Cantidad
                          </th>
                          <th className="py-2 text-center w-1/5">
                            Coste unitario
                          </th>
                          <th className="py-2 text-center w-1/5">Total</th>
                          <th className="py-2 text-center w-1/5">Total USD</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((row, index) => (
                          <tr
                            key={index}
                            className="w-full flex justify-center gap-8"
                          >
                            <td className="py-2 w-2/5">
                              <input
                                className="w-full p-2 bg-white rounded shadow-3xl focus:outline-none"
                                type="text"
                                name="description"
                                value={row.description}
                                onChange={(e) => handleInputChange(index, e)}
                              />
                            </td>
                            <td className="py-2 w-1/5">
                              <input
                                className="w-full p-2 bg-white rounded shadow-3xl focus:outline-none"
                                type="text"
                                name="units" // Cambiado de "cantidad" a "units"
                                value={row.units}
                                onChange={(e) => handleInputChange(index, e)}
                              />
                            </td>
                            <td className="py-2 w-1/5">
                              <input
                                className="w-full p-2 bg-white rounded shadow-3xl focus:outline-none"
                                type="text"
                                name="price" // Cambiado de "costoUnitario" a "price"
                                value={row.price}
                                onChange={(e) => handleInputChange(index, e)}
                              />
                            </td>

                            <td className="py-2 w-1/5 text-center flex items-center justify-center">
                              {row.total}
                            </td>
                            <td className="py-2 w-1/5 text-center flex items-center justify-center">
                              {row.totalUSD}
                            </td>
                          </tr>
                        ))}
                        {/* Subtotal Row */}
                        <tr className="w-full flex justify-center gap-8 bg-rose-100">
                          <td className="py-2 font-bold w-2/5">Subtotal</td>
                          <td className="py-2 w-1/5"></td>
                          <td className="py-2 w-1/5"></td>
                          <td className="py-2 w-1/5 text-center">{subTotal}</td>
                          <td className="py-2 w-1/5 text-center">$971.01</td>
                        </tr>
                        {/* Financial Expenses*/}
                        <tr className="w-full flex justify-center gap-8 ">
                          <td className="py-2 w-2/5">Financial Expenses</td>
                          <td className="py-2 w-1/5"></td>
                          <td className="py-2 w-1/5"></td>
                          <td className="py-2 w-1/5 text-center">$3.875.000</td>
                          <td className="py-2 w-1/5 text-center">$971.01</td>
                        </tr>
                        {/* BEFORE TAXES*/}
                        <tr className="w-full flex justify-center gap-8 font-bold">
                          <td className="py-2 font-bold w-2/5">BEFORE TAXES</td>
                          <td className="py-2 w-1/5"></td>
                          <td className="py-2 w-1/5"></td>
                          <td className="py-2 w-1/5 text-center">$3.875.000</td>
                          <td className="py-2 w-1/5 text-center">$971.01</td>
                        </tr>
                        {/* Local Taxes (IVA - 19%)*/}
                        <tr className="w-full flex justify-center gap-8 ">
                          <td className="py-2  w-2/5">
                            {"Local Taxes (IVA - 19%)"}
                          </td>
                          <td className="py-2 w-1/5"></td>
                          <td className="py-2 w-1/5"></td>
                          <td className="py-2 w-1/5 text-center">$3.875.000</td>
                          <td className="py-2 w-1/5 text-center">$971.01</td>
                        </tr>
                        {/* Total*/}
                        <tr className="w-full flex justify-center gap-8 bg-primary-red-600 text-white font-bold">
                          <td className="py-2 font-bold w-2/5">Total</td>
                          <td className="py-2 w-1/5"></td>
                          <td className="py-2 w-1/5"></td>
                          <td className="py-2 w-1/5 text-center">{total}</td>
                          <td className="py-2 w-1/5 text-center">$971.01</td>
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
                  action={handleFormSubmit}
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
                      {budget?.map((item, index) => (
                        <RowTableBudget
                          key={index}
                          listItems={item}
                          columnWidths={columnWidths}
                          stateRow={stateRow}
                          handleChange={handleChange}
                          readOnly={false}
                          editStatus={false}
                          onOpenModal={handleOpenModal}
                        />
                      ))}
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
                    {budget?.map((item, index) => (
                      <RowTableBudget
                        key={index}
                        listItems={item}
                        columnWidths={columnWidths}
                        stateRow={stateRow}
                        handleChange={handleChange}
                        readOnly={true}
                        onOpenModal={handleOpenModal}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
      {activeTab === 3 && (
        <div className="flex justify-end">
          <Pagination
            setRequests={setBudget}
            totalPages={totalPages}
            urlBase={urlBase}
            setUrlBase={setUrlBase}
            setLoading={setLoading}
          />
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
