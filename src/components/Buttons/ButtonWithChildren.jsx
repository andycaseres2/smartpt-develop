const ButtonWithChildren = ({ action, children, borderColor }) => {
  return (
    <button
      onClick={action}
      className={`h-7 w-7 rounded flex justify-center items-center border ${borderColor} bg-transparent mr-2`}
    >
      {children}
    </button>
  );
};

export default ButtonWithChildren;
