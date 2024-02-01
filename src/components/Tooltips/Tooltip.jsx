const Tooltip = ({ icon, text, color }) => {
  return (
    <div className="w-max h-16 bg-white flex justify-between gap-4 absolute top-[70px] pr-4 right-6 z-50 items-center rounded">
      <span className={`${color} h-full w-2`}></span>
      <div className="w-full flex justify-between items-center gap-4">
        {icon}
        <span className="font-semibold text-base">{text}</span>
      </div>
    </div>
  );
};

export default Tooltip;
