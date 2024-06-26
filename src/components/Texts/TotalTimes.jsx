const TotalTimes = ({ totalTimes }) => {
  return (
    <div className="flex gap-2 items-center ml-5 h-max mb-3 w-max  ">
      <p className="font-base font-semibold">Total horas programadas:</p>
      <span
        className={`py-1 px-4 rounded-lg text-white font-base ${
          totalTimes > 45 ? "bg-primary-red-600" : "bg-primary-green-500"
        } bg-primary-green-500`}
      >
        {totalTimes} horas
      </span>
    </div>
  );
};

export default TotalTimes;
