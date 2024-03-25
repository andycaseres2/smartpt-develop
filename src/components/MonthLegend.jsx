const MonthLegend = ({ months, colors }) => {
  return (
    <div className="flex flex-wrap justify-end w-[500px]">
      {months.map((month, index) => (
        <div key={month} className="flex items-center gap-1 w-[115px]">
          <span className={`text-2xl text-[${colors[index]}]`}>•</span>
          <span>{month}</span>
        </div>
      ))}
    </div>
  );
};

export default MonthLegend;
