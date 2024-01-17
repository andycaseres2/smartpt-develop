import SelectGeneric from "../../components/Selects/SelectGeneric";

const BudgetModalContent = ({ data }) => {
  return (
    <div className=" h-full">
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
                readOnly={true}
              />
            </div>
            <div className="flex flex-col gap-2">
              <h2>Fecha</h2>
              <SelectGeneric
                options={[]}
                initialOption={""}
                key_name=""
                handleChange={() => {}}
                styleSelect={"w-[157px]"}
                readOnly={true}
              />
            </div>
            <div className="flex flex-col gap-2">
              <h2>Lugar</h2>
              <SelectGeneric
                options={[]}
                initialOption={""}
                key_name=""
                handleChange={() => {}}
                styleSelect={"w-[157px]"}
                readOnly={true}
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
              className="w-full rounded-md p-2 shadow-3xl h-[100px] focus:outline-none"
            ></textarea>
          </div>
        </div>
        <div className="w-full flex flex-col gap-4 px-6 mt-4">
          <div className="flex flex-col gap-2">
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
