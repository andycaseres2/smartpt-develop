import Header from "../../components/Header/Header";
import BudgetContent from "./BudgetContent";

const Budget = () => {
  return (
    <div className="flex flex-col w-full h-screen">
      <Header
        title="Presupuesto clientes"
        date="4/12/2023 - 8/12/2023"
        userName="Kenet Sebastián Segura Murillo"
      />
      <div className="w-full flex flex-col bg-primary-blue-50 py-4 px-6 h-full">
        <BudgetContent />
      </div>
    </div>
  );
};

export default Budget;
