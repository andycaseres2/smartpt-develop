const BoxHours = ({ title, porcentaje, values, color, textColor }) => {
  return (
    <div className="rounded-lg shadow-3xl flex flex-col justify-center w-[223px] h-[146px]">
      <div className="flex justify-between items-center pt-2 px-4 min-h-[50px]">
        <span
          className={`${
            color ? `text-${color}` : "text-primary-red-600"
          }  font-semibold`}
        >
          {title}
        </span>
        <span
          className={`${
            color ? `bg-${color}` : "bg-primary-red-600"
          } h-max rounded py-0.5 px-2 text-white`}
        >
          {porcentaje}
        </span>
      </div>
      <div className="h-full px-3">
        <span className={`${textColor} text-[35px] font-semibold`}>
          {values}
        </span>
      </div>
    </div>
  );
};

export default BoxHours;
