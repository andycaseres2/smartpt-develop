<<<<<<< HEAD
import { useEffect, useRef, useState } from "react";
import InputSecondary from "../../components/Inputs/InputSecondary";
import SelectGeneric from "../../components/Selects/SelectGeneric";
import { stateStore } from "../../store/stateStore";
import ButtonWithIcon from "../../components/Buttons/ButtonWithIcon";
import CirclePlus from "../../assets/Icons/CirclePlus";
import CloseIcon from "../../assets/Icons/CloseIcon";
import { userStore } from "../../store/userStore";
import { putData } from "../../services/putData";
import ExportIcon from "../../assets/Icons/ExportIcon";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const BudgetModalContent = ({
  currentBudget,
  currentBudgetTables,
  tax,
  readOnly,
  setTooltipError,
  setTooltipSuccess,
  setRealTime,
  selectedRowId,
}) => {
  const { clients, processes, activities } = stateStore();
  const modalRef = useRef(null);
  const { token } = userStore();
  const [fieldsStates, setFieldsStates] = useState({});

  const [fieldReset, setFieldReset] = useState(false);
  const [updateActivities, setUpdateActivities] = useState(activities);
  const [porcentajeFinancial, setPorcentajeFinancial] = useState(null);
  const [TRM, setTRM] = useState(null);
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [totalUSD, setTotalUSD] = useState(0);
  const [rows, setRows] = useState([]);

  const getById = (id, options) => {
    const client = options.find((client) => client.id === id);
    return client?.name;
  };

  useEffect(() => {
    if (currentBudget) {
      setFieldsStates(currentBudget);
      setTRM(currentBudget.trm || 0);
      setPorcentajeFinancial(currentBudget.financialexpense || 0);
    }
  }, [currentBudget]);

  const recalculateRows = () => {
    let totalGlobal = 0;
    let nuevosElementos;

    if (rows?.length === 0) {
      // Si rows está vacío, utiliza currentBudgetTables
      nuevosElementos = currentBudgetTables?.map((objeto) => {
        const total = objeto.units * objeto.price;
        const totalUSD = total / TRM;
        totalGlobal += total;
        return { ...objeto, total, totalUSD };
      });
    } else {
      // Si rows ya tiene información, utiliza rows
      nuevosElementos = rows?.map((objeto) => {
        const total = objeto.units * objeto.price;
        const totalUSD = total / TRM;
        totalGlobal += total;
        return { ...objeto, total, totalUSD };
      });
    }

    const newSubTotal = totalGlobal; // Actualizar el subtotal
    return { nuevosElementos, newSubTotal };
  };

  const handleSubmit = async (idBudget) => {
    try {
      const baseUrl = import.meta.env.VITE_REACT_APP_URL_BASE;
      const budgetEndpoint = `${baseUrl}BudgetDetails`;

      for (const row of rows) {
        row.idbudget = idBudget;
        row.idtax = 1;

        // Eliminar la propiedad 'id' de 'row'
        const { id, ...rowWithoutId } = row;

        const body = {
          ...rowWithoutId,
        };

        // Concatenar el id a la URL
        const rowEndpoint = `${budgetEndpoint}/${id}`;

        await putData(rowEndpoint, body, token);
      }
    } catch (error) {
      console.error("Error al manejar la solicitud:", error);
    }
  };

  const handleFormSubmit = async (event) => {
    try {
      event.preventDefault();
      const baseUrl = import.meta.env.VITE_REACT_APP_URL_BASE;
      const budgetEndpoint = `${baseUrl}Budget/${selectedRowId}`;
      const body = {
        ...fieldsStates,
        trm: TRM,
      };
      await putData(budgetEndpoint, body, token);
      await handleSubmit(selectedRowId);
      setTooltipSuccess("Registro creado con exito");
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setTooltipError("Hubo un error al crear el registro");
    } finally {
      setRealTime(true);
    }
  };

  useEffect(() => {
    // Función para recalcular filas y subtotal
    const recalculateAndSetRows = () => {
      const { nuevosElementos, newSubTotal } = recalculateRows();

      // Comprobamos si los nuevos elementos son diferentes de los actuales antes de actualizar el estado
      if (!areRowsEqual(rows, nuevosElementos)) {
        setRows(nuevosElementos);
      }

      setSubTotal(newSubTotal);
    };

    // Llamamos a la función cuando cambian las filas
    recalculateAndSetRows();
  }, [rows]); // Aplicar efecto cuando rows cambie

  // Función para comparar dos arrays de objetos
  const areRowsEqual = (rows1, rows2) => {
    if (rows1?.length !== rows2?.length) {
      return false;
    }
    for (let i = 0; i < rows1?.length; i++) {
      if (!areObjectsEqual(rows1[i], rows2[i])) {
        return false;
      }
    }
    return true;
  };

  // Función para comparar dos objetos
  const areObjectsEqual = (obj1, obj2) => {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) {
      return false;
    }
    for (let key of keys1) {
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    const beforeTaxes = subTotal + (subTotal * porcentajeFinancial) / 100;
    const taxes =
      (tax.percentage * (subTotal + (subTotal * porcentajeFinancial) / 100)) /
      100;
    const total = beforeTaxes + taxes;
    setTotal(total);
    setTotalUSD((total / TRM).toFixed(2));
  }, [total, TRM, subTotal, tax, porcentajeFinancial]);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;

    // Creamos una copia de las filas actualizadas
    const updatedRows = [...rows];

    // Obtenemos la fila que queremos modificar
    const updatedRow = { ...updatedRows[index] };

    // Actualizamos el valor correspondiente en la fila
    if (name === "description") {
      updatedRow[name] = value;
    } else {
      const numericValue = parseFloat(value);
      updatedRow[name] = isNaN(numericValue) ? "" : numericValue;
    }

    // Calculamos el total para la fila actual multiplicando unidades por precio
    const units = parseFloat(updatedRow.units) || 0;
    const price = parseFloat(updatedRow.price) || 0;
    updatedRow.total = units * price;
    updatedRow.totalUSD = updatedRow.total / TRM;

    // Actualizamos la fila modificada en el arreglo de filas actualizadas
    updatedRows[index] = updatedRow;

    // Actualizamos el estado de las filas
    setRows(updatedRows);

    // Calculamos el nuevo total sumando los totales de todas las filas
    let newTotal = 0;
    updatedRows.forEach((row) => {
      newTotal += parseFloat(row.total);
    });

    // Actualizamos el estado del total
    setTotal(newTotal);
    setSubTotal(newTotal);
  };

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
      ...currentBudgetTables.filter((n) => n),
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

  function findProcessName(activityId) {
    // Find the activity by its ID
    const activity = activities.find((act) => act.id === activityId);

    // If activity is not found, return null
    if (!activity) return null;

    // Find the corresponding process by its idprocess
    const process = processes.find((proc) => proc.id === activity.idprocess);

    // If process is not found, return null
    if (!process) return null;

    // Return the name of the process
    return process.name;
  }

  const handleGeneratePDF = () => {
    const modalElement = modalRef.current;

    // Clonar el contenido del modal
    const clonedModal = modalElement.cloneNode(true);

    // Agregar el clon al DOM para que html2canvas pueda renderizarlo correctamente
    document.body.appendChild(clonedModal);

    // Ajustar estilos de los textos generados dinámicamente de forma asíncrona en el clon
    setTimeout(() => {
      const inputs = clonedModal.querySelectorAll("input");
      const textareas = clonedModal.querySelectorAll("textarea");
      const containerSelects =
        clonedModal.querySelectorAll(".container-select");

      // Estilos para inputs, textareas y selects
      inputs.forEach((input) => {
        input.style.backgroundColor = "transparent";
        input.style.background = "transparent";
        input.style.border = "none";
        input.style.height = "50px";
        input.style.lineHeight = "normal";
        input.style.verticalAlign = "middle";
        input.style.color = ""; // Restaurar color de texto
      });

      textareas.forEach((textarea) => {
        textarea.style.background = "transparent";
        textarea.style.backgroundColor = "transparent";
        textarea.style.border = "none";
        textarea.style.height = "auto";
        textarea.style.lineHeight = "normal";
        textarea.style.verticalAlign = "middle";
        textarea.style.color = ""; // Restaurar color de texto
      });

      containerSelects.forEach((containerSelect) => {
        containerSelect.style.background = "transparent";
        containerSelect.style.backgroundColor = "transparent";
        containerSelect.style.border = "none";
        containerSelect.style.height = "50px";
        containerSelect.style.width = "max-content";
        containerSelect.style.padding = "0 20px";
        containerSelect.style.lineHeight = "normal";
        containerSelect.style.verticalAlign = "middle";
        containerSelect.style.display = "flex";
        containerSelect.style.alignItems = "flex-start";
        containerSelect.style.color = "";
        // Restaurar color de texto

        const span = containerSelect.querySelector("span");
        if (span) {
          span.style.background = "transparent";
          span.style.backgroundColor = "transparent";
          span.style.border = "none";
          span.style.height = "auto";
          span.style.lineHeight = "normal";
          span.style.verticalAlign = "middle";
          span.style.display = "flex";
          span.style.alignItems = "flex-start";
          span.style.marginTop = "6px";
          span.style.height = "100%";
          span.style.color = ""; // Restaurar color de texto
        }
      });

      // Capturar el contenido del clon para generar el PDF
      html2canvas(clonedModal, {
        scrollY: -window.scrollY,
        height: modalElement.scrollHeight,
      }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("l", "px", [canvas.width, canvas.height]);
        pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
        pdf.save("modal_content.pdf");

        // Eliminar el clon del DOM después de generar el PDF
        document.body.removeChild(clonedModal);
      });
    }, 0);
  };

  return (
    <div className=" overflow-y-auto overflow-hidden h-full">
      <div ref={modalRef} className="">
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
                value={fieldsStates?.servicename}
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
                value={fieldsStates?.validto}
                handleChange={handleChange}
                key_name={"validto"}
                onlyNumber={true}
              />
            </div>
            <div className="flex flex-col gap-2">
              <h2>Proceso</h2>
              <SelectGeneric
                options={processes}
                initialOption={findProcessName(fieldsStates?.idactivity)}
                key_name="idprocesses"
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
                initialOption={getById(fieldsStates?.idactivity, activities)}
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
              value={fieldReset ? "" : fieldsStates?.description}
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
                    key_name={"trm"}
                    handleChange={(e) => {
                      setTRM(e.target.value);
                      recalculateRows();
                    }}
                    onlyNumber={true}
                    readOnly={readOnly}
                  />
                </div>
                {readOnly ? (
                  <div></div>
                ) : (
                  <ButtonWithIcon
                    text=" Agregar fila"
                    action={addRow}
                    icon={<CirclePlus />}
                  />
                )}
              </div>
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="w-full flex justify-center gap-8">
                    <th className="py-2 text-center w-2/5">Descripción</th>
                    <th className="py-2 text-center w-1/5">Cantidad</th>
                    <th className="py-2 text-center w-1/5">Coste unitario</th>
                    <th className="py-2 text-center w-1/5">Total</th>
                    <th className="py-2 text-center w-1/5">Total USD</th>
                    <th className="py-2 text-center w-1/7"></th>
                  </tr>
                </thead>
                <tbody>
                  {rows?.map((row, index) => (
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
                          readOnly={readOnly}
                          onChange={(e) => handleInputChange(index, e)}
                        />
                      </td>
                      <td className="py-2 w-1/5">
                        <input
                          className="w-full p-2 bg-white rounded shadow-3xl focus:outline-none"
                          type="text"
                          name="units" // Cambiado de "cantidad" a "units"
                          value={row.units}
                          readOnly={readOnly}
                          onChange={(e) => handleInputChange(index, e)}
                        />
                      </td>
                      <td className="py-2 w-1/5">
                        <input
                          className="w-full p-2 bg-white rounded shadow-3xl focus:outline-none"
                          type="text"
                          name="price" // Cambiado de "costoUnitario" a "price"
                          value={row.price}
                          readOnly={readOnly}
                          onChange={(e) => handleInputChange(index, e)}
                        />
                      </td>

                      <td className="py-2 w-1/5 text-center flex items-center justify-center">
                        {isNaN(row.total)
                          ? "$0.00"
                          : Intl.NumberFormat("es-CO", {
                              style: "currency",
                              currency: "COP",
                            }).format(row.total)}
                      </td>
                      <td className="py-2 w-1/5 text-center flex items-center justify-center">
                        {isNaN(row.totalUSD)
                          ? "$0.00"
                          : Intl.NumberFormat("es-CO", {
                              style: "currency",
                              currency: "COP",
                            }).format(row.totalUSD)}
                      </td>
                      <td className="py-2 w-1/8 text-center flex items-center justify-center">
                        {!readOnly && (
                          <CloseIcon
                            action={() => {
                              delete currentBudgetTables[index];
                              recalculateRows();
                            }}
                            className={"cursor-pointer hover:scale-105"}
                          />
                        )}
                      </td>
                    </tr>
                  ))}

                  <tr className="w-full flex justify-center gap-8 bg-rose-100">
                    <td className="py-2 font-bold w-2/5">Subtotal</td>
                    <td className="py-2 w-1/5"></td>
                    <td className="py-2 w-1/5"></td>
                    <td className="py-2 w-1/5 text-center">
                      {" "}
                      {isNaN(subTotal)
                        ? "$0.00"
                        : Intl.NumberFormat("es-CO", {
                            style: "currency",
                            currency: "COP",
                          }).format(subTotal)}
                    </td>
                    <td className="py-2 w-1/5 text-center">
                      {isNaN(subTotal)
                        ? "$0.00"
                        : Intl.NumberFormat("es-CO", {
                            style: "currency",
                            currency: "COP",
                          }).format(subTotal / TRM)}
                    </td>
                    <td className="py-2 w-1/8"></td>
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
                          handleChange({
                            target: {
                              name: "financialexpense",
                              value: newValue,
                            },
                          });
                        }}
                        readOnly={readOnly}
                      />
                    </td>
                    <td className="py-2 w-1/5 text-center flex items-center justify-center">
                      {porcentajeFinancial
                        ? Intl.NumberFormat("es-CO", {
                            style: "currency",
                            currency: "COP",
                          }).format((subTotal * porcentajeFinancial) / 100)
                        : "$0.00"}
                    </td>
                    <td className="py-2 w-1/5 text-center items-center flex justify-center">
                      {porcentajeFinancial
                        ? Intl.NumberFormat("es-CO", {
                            style: "currency",
                            currency: "COP",
                          }).format(
                            (subTotal * porcentajeFinancial) / 100 / TRM
                          )
                        : "$0.00"}
                    </td>
                    <td className="py-2 w-1/8"></td>
                  </tr>

                  <tr className="w-full flex justify-center gap-8 font-bold">
                    <td className="py-2 font-bold w-2/5">BEFORE TAXES</td>
                    <td className="py-2 w-1/5"></td>
                    <td className="py-2 w-1/5"></td>
                    <td className="py-2 w-1/5 text-center">
                      {isNaN(subTotal)
                        ? "$0.00"
                        : Intl.NumberFormat("es-CO", {
                            style: "currency",
                            currency: "COP",
                          }).format(
                            subTotal + (subTotal * porcentajeFinancial) / 100
                          )}
                    </td>
                    <td className="py-2 w-1/5 text-center">
                      {isNaN(subTotal)
                        ? "$0.00"
                        : Intl.NumberFormat("es-CO", {
                            style: "currency",
                            currency: "COP",
                          }).format(
                            (subTotal +
                              (subTotal * porcentajeFinancial) / 100) /
                              TRM
                          )}
                    </td>
                    <td className="py-2 w-1/8"></td>
                  </tr>

                  <tr className="w-full flex justify-center gap-8 ">
                    <td className="py-2  w-2/5">{"Local Taxes (IVA - 19%)"}</td>
                    <td className="py-2 w-1/5"></td>
                    <td className="py-2 w-1/5"></td>
                    <td className="py-2 w-1/5 text-center flex justify-center items-center">
                      {isNaN(subTotal)
                        ? "$0.00"
                        : Intl.NumberFormat("es-CO", {
                            style: "currency",
                            currency: "COP",
                          }).format(
                            (tax.percentage *
                              (subTotal +
                                (subTotal * porcentajeFinancial) / 100)) /
                              100
                          )}
                    </td>
                    <td className="py-2 w-1/5 text-center flex justify-center items-center">
                      {isNaN(subTotal)
                        ? "$0.00"
                        : Intl.NumberFormat("es-CO", {
                            style: "currency",
                            currency: "COP",
                          }).format(
                            (tax.percentage *
                              (subTotal +
                                (subTotal * porcentajeFinancial) / 100)) /
                              100 /
                              TRM
                          )}
                    </td>
                  </tr>

                  <tr className="w-full flex justify-center gap-8 bg-primary-red-600 text-white font-bold">
                    <td className="py-2 font-bold w-2/5">Total</td>
                    <td className="py-2 w-1/5"></td>
                    <td className="py-2 w-1/5"></td>
                    <td className="py-2 w-1/5 text-center">
                      {isNaN(total)
                        ? "$0.00"
                        : Intl.NumberFormat("es-CO", {
                            style: "currency",
                            currency: "COP",
                          }).format(total)}
                    </td>
                    <td className="py-2 w-1/5 text-center">
                      {isNaN(totalUSD)
                        ? "$0.00"
                        : Intl.NumberFormat("es-CO", {
                            style: "currency",
                            currency: "COP",
                          }).format(totalUSD)}
                    </td>
                    <td className="py-2 w-1/8"></td>
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

        <div className="flex justify-end px-8 mb-8 gap-4">
          <ButtonWithIcon
            icon={<ExportIcon />}
            text="Exportar"
            action={handleGeneratePDF}
            designButton="!w-44 h-8 flex justify-center items-center"
          />
          {!readOnly && (
            <ButtonWithIcon
              text="Guardar"
              action={handleFormSubmit}
              icon={<CirclePlus />}
              designButton="!w-44 h-8 flex justify-center items-center"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BudgetModalContent;
=======
import { useEffect, useState } from "react";
import InputSecondary from "../../components/Inputs/InputSecondary";
import SelectGeneric from "../../components/Selects/SelectGeneric";
import { stateStore } from "../../store/stateStore";
import ButtonWithIcon from "../../components/Buttons/ButtonWithIcon";
import CirclePlus from "../../assets/Icons/CirclePlus";
import CloseIcon from "../../assets/Icons/CloseIcon";

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

  const recalculateRows = () => {
    const updatedRows = [...currentBudgetTables.filter(n=>n)];
    let newTotal = 0;
    for(var i=0;i<updatedRows.length;i++)
    {
      if(updatedRows[i]!==undefined) {
        updatedRows[i].totalUSD = updatedRows[i].total / TRM;
        newTotal += parseFloat(updatedRows[i].total);
      }
    }
    
    // Actualizar el estado de las filas
    setRows(updatedRows);
    // Actualizar el estado del total
    setTotal(newTotal);
    setSubTotal(newTotal);

  }

  useEffect(() => {
    recalculateRows();
  }, []);

  useEffect(() => {
    const beforeTaxes = subTotal + (subTotal * porcentajeFinancial) / 100;
    const taxes = (tax.percentage * (subTotal + (subTotal * porcentajeFinancial) / 100)) / 100;
    const total = beforeTaxes + taxes;
    setTotal(total);
    setTotalUSD((total / TRM).toFixed(2));
  }, [total, TRM, subTotal, tax, porcentajeFinancial]);
  
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedRows = [...currentBudgetTables];

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
    updatedRows[index].totalUSD = updatedRows[index].total / TRM;

    // Calcular el total en USD (asumiendo un tipo de cambio fijo)
    const exchangeRate = Number(TRM);
    updatedRows[index].totalUSD = Math.round(
      updatedRows[index].total / exchangeRate
    );

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
      ...currentBudgetTables.filter(n=>n),
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
                {readOnly ? (
                  <div></div>
                ) : (
                  <ButtonWithIcon
                    text=" Agregar fila"
                    action={addRow}
                    icon={<CirclePlus />}
                  />
                )}
              </div>
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="w-full flex justify-center gap-8">
                    <th className="py-2 text-center w-2/5">Descripción</th>
                    <th className="py-2 text-center w-1/5">Cantidad</th>
                    <th className="py-2 text-center w-1/5">Coste unitario</th>
                    <th className="py-2 text-center w-1/5">Total</th>
                    <th className="py-2 text-center w-1/5">Total USD</th>
                    <th className="py-2 text-center w-1/7"></th>
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
                          readOnly={readOnly}
                          onChange={(e) => handleInputChange(index, e)}
                        />
                      </td>
                      <td className="py-2 w-1/5">
                        <input
                          className="w-full p-2 bg-white rounded shadow-3xl focus:outline-none"
                          type="text"
                          name="units" // Cambiado de "cantidad" a "units"
                          value={row.units}
                          readOnly={readOnly}
                          onChange={(e) => handleInputChange(index, e)}
                        />
                      </td>
                      <td className="py-2 w-1/5">
                        <input
                          className="w-full p-2 bg-white rounded shadow-3xl focus:outline-none"
                          type="text"
                          name="price" // Cambiado de "costoUnitario" a "price"
                          value={row.price}
                          readOnly={readOnly}
                          onChange={(e) => handleInputChange(index, e)}
                        />
                      </td>

                      <td className="py-2 w-1/5 text-center flex items-center justify-center">
                        {isNaN(row.total) ? "$0.00" : Intl.NumberFormat("es-CO", {style: "currency",currency: "COP",}).format(row.total)}
                      </td>
                      <td className="py-2 w-1/5 text-center flex items-center justify-center">
                        {isNaN(row.totalUSD) ? "$0.00" : Intl.NumberFormat("es-CO", {style: "currency",currency: "COP",}).format(row.totalUSD)}
                      </td>
                      <td className="py-2 w-1/8 text-center flex items-center justify-center">
                              {!readOnly && (<CloseIcon
                                action={() => {
                                  delete currentBudgetTables[index];
                                  recalculateRows();
                                }}
                                className={"cursor-pointer hover:scale-105"}
                              />)}
                        </td>
                    </tr>
                  ))}

                  <tr className="w-full flex justify-center gap-8 bg-rose-100">
                    <td className="py-2 font-bold w-2/5">Subtotal</td>
                    <td className="py-2 w-1/5"></td>
                    <td className="py-2 w-1/5"></td>
                    <td className="py-2 w-1/5 text-center">{subTotal}</td>
                    <td className="py-2 w-1/5 text-center">
                      {isNaN(subTotal) ? "$0.00" : Intl.NumberFormat("es-CO", {style: "currency",currency: "COP",}).format(subTotal / TRM)}
                    </td>
                    <td className="py-2 w-1/8"></td>
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
                        ? Intl.NumberFormat("es-CO", {style: "currency",currency: "COP",}).format((subTotal * porcentajeFinancial) / 100)
                              : "$0.00"}
                    </td>
                    <td className="py-2 w-1/5 text-center items-center flex justify-center">
                      {porcentajeFinancial ? Intl.NumberFormat("es-CO", {style: "currency",currency: "COP",}).format((subTotal * porcentajeFinancial) / 100 / TRM):"$0.00"}
                    </td>
                    <td className="py-2 w-1/8"></td>
                  </tr>

                  <tr className="w-full flex justify-center gap-8 font-bold">
                    <td className="py-2 font-bold w-2/5">BEFORE TAXES</td>
                    <td className="py-2 w-1/5"></td>
                    <td className="py-2 w-1/5"></td>
                    <td className="py-2 w-1/5 text-center">
                      {isNaN(subTotal) ? "$0.00" : Intl.NumberFormat("es-CO", {style: "currency",currency: "COP",}).format(subTotal + (subTotal * porcentajeFinancial) / 100)}
                    </td>
                    <td className="py-2 w-1/5 text-center">
                      {
                      isNaN(subTotal) ? "$0.00" : Intl.NumberFormat("es-CO", {style: "currency",currency: "COP",}).format((subTotal + ((subTotal * porcentajeFinancial) / 100)) / TRM)
                      }
                    </td>
                    <td className="py-2 w-1/8"></td>
                  </tr>

                  <tr className="w-full flex justify-center gap-8 ">
                    <td className="py-2  w-2/5">{"Local Taxes (IVA - 19%)"}</td>
                    <td className="py-2 w-1/5"></td>
                    <td className="py-2 w-1/5"></td>
                    <td className="py-2 w-1/5 text-center">
                      {isNaN(subTotal) ? "$0.00" : Intl.NumberFormat("es-CO", {style: "currency",currency: "COP",}).format((tax.percentage * (subTotal + (subTotal * porcentajeFinancial) / 100)) / 100)}
                    </td>
                    <td className="py-2 w-1/5 text-center">
                      {isNaN(subTotal) ? "$0.00" : Intl.NumberFormat("es-CO", {style: "currency",currency: "COP",}).format((tax.percentage * (subTotal + (subTotal * porcentajeFinancial) / 100)) / 100 / TRM)}
                    </td>
                  </tr>

                  <tr className="w-full flex justify-center gap-8 bg-primary-red-600 text-white font-bold">
                    <td className="py-2 font-bold w-2/5">Total</td>
                    <td className="py-2 w-1/5"></td>
                    <td className="py-2 w-1/5"></td>
                    <td className="py-2 w-1/5 text-center">
                      {isNaN(total) ? "$0.00" : Intl.NumberFormat("es-CO", {style: "currency",currency: "COP",}).format(total)}
                    </td>
                    <td className="py-2 w-1/5 text-center">
                      {isNaN(totalUSD) ? "$0.00" : Intl.NumberFormat("es-CO", {style: "currency",currency: "COP",}).format(totalUSD)}
                    </td>
                    <td className="py-2 w-1/8"></td>
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
>>>>>>> b7ecf2887956819aed0507d5ec357a78c09ff6b2
