import Calendar from "../../assets/Icons/Calendar";

const InputDate = ({ text }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg px-4 py-2 flex justify-between items-center gap-2">
      <span className="font-semibold">{text}</span>
      <Calendar />
    </div>
  );
};

export default InputDate;
