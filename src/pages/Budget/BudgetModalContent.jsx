import { useEffect, useState } from "react";
import InputSecondary from "../../components/Inputs/InputSecondary";
import SelectGeneric from "../../components/Selects/SelectGeneric";
import { stateStore } from "../../store/stateStore";
import ButtonWithIcon from "../../components/Buttons/ButtonWithIcon";
import CirclePlus from "../../assets/Icons/CirclePlus";

const BudgetModalContent = ({
  currentBudget,
  currentBudgetTables,
  tax,
  readOnly,
}) => {
  const { clients, processes, activities } = stateStore();
  const [fieldsStates, setFieldsStates] = useState({});
  const [fieldReset, setFieldReset] = useState(false);
  const [updateActivities, setUpdateActivities] = useState(activities);
  const [porcentajeFinancial, setPorcentajeFinancial] = useState(
    currentBudget.financialexpense || 0
  );
  const [TRM, setTRM] = useState(currentBudget.trm || 0);
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [totalUSD, setTotalUSD] = useState(0);
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

  const getById = (clientId, options) => {
    const client = options.find((client) => client.id === clientId);
    return client?.name;
  };

  const calculateSubtotal = (items) => {
    // Utilizar el método reduce() para multiplicar units * price de cada objeto y sumarlos todos
    const subtotal = items.reduce((total, item) => {
      return total + item.units * item.price;
    }, 0);

    return subtotal;
  };

  useEffect(() => {
    setSubTotal(calculateSubtotal(currentBudgetTables));
  }, []);

  useEffect(() => {
    const financial = (subTotal * porcentajeFinancial) / 100;
    const taxes = Math.round(((tax.percentage * subTotal) / 100) * TRM);
    const total = subTotal + financial + taxes;
    setTotal(total);
    setTotalUSD(Math.round(total * TRM));
  }, [total, TRM, subTotal, tax, porcentajeFinancial]);

  const handleChange = (e) => {
    setFieldsStates({
      ...fieldsStates,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectProcess = (id) => {
    const filterActivities = activities.filter(
      (activity) => activity.idprocess === id
    );
    setUpdateActivities(filterActivities);
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

  return (
    <div className=" overflow-y-auto overflow-hidden h-full">
      <div className="">
        <div className="w-full flex px-6 py-5">
          <div className="w-full flex gap-7">
            <div className="flex flex-col gap-2">
              <h2>Cliente</h2>
              <SelectGeneric
                options={clients}
                initialOption={getById(currentBudget?.idcustomer, clients)}
                key_name="idcustomer"
                handleChange={handleChange}
                styleSelect={"w-[157px]"}
                fieldReset={fieldReset}
                readOnly={readOnly}
              />
            </div>
            <div className="flex flex-col gap-2">
              <h2>Nombre del servicio</h2>
              <InputSecondary
                type="text"
                name="name"
                placeholder="Nombre del servicio"
                value={currentBudget?.servicename}
                key_name={"servicename"}
                handleChange={handleChange}
                readOnly={readOnly}
              />
            </div>
            <div className="flex flex-col gap-2">
              <h2>Vigencia presupuesto días</h2>
              <InputSecondary
                type="text"
                name="name"
                placeholder="Nombre del servicio"
                value={currentBudget?.validto}
                handleChange={handleChange}
                key_name={"validto"}
                onlyNumber={true}
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
                readOnly={readOnly}
              />
            </div>
            <div className="flex flex-col gap-2">
              <h2>Actividad</h2>
              <SelectGeneric
                options={updateActivities}
                initialOption={getById(currentBudget?.idactivity, activities)}
                key_name="idactivity"
                handleChange={handleChange}
                styleSelect={"w-[157px]"}
                fieldReset={fieldReset}
                readOnly={readOnly}
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
              value={fieldReset ? "" : currentBudget?.description}
              readOnly={readOnly}
            ></textarea>
          </div>
        </div>
        <div className="w-full flex flex-col gap-4 px-6 mt-4">
          <div className="flex flex-col gap-3 ">
            <span>Presupuesto</span>
            <div className="w-full">
              <div className="w-full h-full flex items-end justify-end pb-4 gap-4">
                <div className="w-1/6">
                  <h2 className="text-center">TRM</h2>
                  <InputSecondary
                    type="text"
                    name="name"
                    placeholder="Nombre del servicio"
                    value={TRM}
                    key_name={"servicename"}
                    handleChange={handleChange}
                    onlyNumber={true}
                    readOnly={readOnly}
                  />
                </div>
                {readOnly?(<div></div>):(<ButtonWithIcon
                  text=" Agregar fila"
                  action={addRow}
                  icon={<CirclePlus />}
                />)}
              </div>
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="w-full flex justify-center gap-8">
                    <th className="py-2 text-center w-2/5">Descripción</th>
                    <th className="py-2 text-center w-1/5">Cantidad</th>
                    <th className="py-2 text-center w-1/5">Coste unitario</th>
                    <th className="py-2 text-center w-1/5">Total</th>
                    <th className="py-2 text-center w-1/5">Total USD</th>
                  </tr>
                </thead>
                <tbody>
                  {currentBudgetTables.map((row, index) => (
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
                          onChange={""}
                          readOnly={readOnly}
                        />
                      </td>
                      <td className="py-2 w-1/5">
                        <input
                          className="w-full p-2 bg-white rounded shadow-3xl focus:outline-none"
                          type="text"
                          name="units" // Cambiado de "cantidad" a "units"
                          value={row.units}
                          onChange={""}
                          readOnly={readOnly}
                        />
                      </td>
                      <td className="py-2 w-1/5">
                        <input
                          className="w-full p-2 bg-white rounded shadow-3xl focus:outline-none"
                          type="text"
                          name="price" // Cambiado de "costoUnitario" a "price"
                          value={row.price}
                          onChange={""}
                          readOnly={readOnly}
                        />
                      </td>

                      <td className="py-2 w-1/5 text-center flex items-center justify-center">
                        {row.units * row.price}
                      </td>
                      <td className="py-2 w-1/5 text-center flex items-center justify-center">
                        {row.units * row.price * TRM}
                      </td>
                    </tr>
                  ))}

                  <tr className="w-full flex justify-center gap-8 bg-rose-100">
                    <td className="py-2 font-bold w-2/5">Subtotal</td>
                    <td className="py-2 w-1/5"></td>
                    <td className="py-2 w-1/5"></td>
                    <td className="py-2 w-1/5 text-center">{subTotal}</td>
                    <td className="py-2 w-1/5 text-center">
                      {Math.round(TRM * subTotal)}
                    </td>
                  </tr>

                  <tr className="w-full flex justify-center gap-8 ">
                    <td className="py-2 w-2/5 flex items-center">
                      Financial Expenses
                    </td>
                    <td className="py-2 w-1/5"></td>
                    <td className="py-2 w-1/5">
                      <input
                        className="w-full p-2 bg-white rounded shadow-3xl focus:outline-none"
                        type="text"
                        name=""
                        value={porcentajeFinancial}
                        placeholder="%"
                        onChange={(e) => {
                          const newValue = e.target.value.replace(/\D/g, "");
                          setPorcentajeFinancial(newValue);
                        }}
                        readOnly={readOnly}
                      />
                    </td>
                    <td className="py-2 w-1/5 text-center flex items-center justify-center">
                      {porcentajeFinancial
                        ? (subTotal * porcentajeFinancial) / 100
                        : 0}
                    </td>
                    <td className="py-2 w-1/5 text-center items-center flex justify-center">
                      {Math.round(
                        ((subTotal * porcentajeFinancial) / 100) * TRM
                      )}
                    </td>
                  </tr>

                  <tr className="w-full flex justify-center gap-8 font-bold">
                    <td className="py-2 font-bold w-2/5">BEFORE TAXES</td>
                    <td className="py-2 w-1/5"></td>
                    <td className="py-2 w-1/5"></td>
                    <td className="py-2 w-1/5 text-center">
                      {subTotal + (subTotal * porcentajeFinancial) / 100}
                    </td>
                    <td className="py-2 w-1/5 text-center">
                      {Math.round(
                        subTotal +
                          ((subTotal * porcentajeFinancial) / 100) * TRM
                      )}
                    </td>
                  </tr>

                  <tr className="w-full flex justify-center gap-8 ">
                    <td className="py-2  w-2/5">{"Local Taxes (IVA - 19%)"}</td>
                    <td className="py-2 w-1/5"></td>
                    <td className="py-2 w-1/5"></td>
                    <td className="py-2 w-1/5 text-center">
                      {(tax.percentage * subTotal) / 100}
                    </td>
                    <td className="py-2 w-1/5 text-center">
                      {Math.round(((tax.percentage * subTotal) / 100) * TRM)}
                    </td>
                  </tr>

                  <tr className="w-full flex justify-center gap-8 bg-primary-red-600 text-white font-bold">
                    <td className="py-2 font-bold w-2/5">Total</td>
                    <td className="py-2 w-1/5"></td>
                    <td className="py-2 w-1/5"></td>
                    <td className="py-2 w-1/5 text-center">
                      {Math.round(total)}
                    </td>
                    <td className="py-2 w-1/5 text-center">
                      {Math.round(totalUSD)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-end pt-1 pb-8 px-6 w-full gap-14">
          <div className="w-[80%] ml-4">
            <span className="text-sm text-gray-500">
              Todas las ideas, conceptos, información, materiales y estrategias
              contenidas en este documento (incluyendo todos los derechos de
              autor y marcas) son y deben ser confidenciales y su propiedad
              intelectual pertenece a Smart PR SAS y no puede ser utilizada
              hasta que pueda estar disponible a través de una relación
              contractual.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetModalContent;
