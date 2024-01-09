const ButtonWithChildren = ({ action, children }) => {
  return (
    <button
      onClick={action}
      className="h-8 w-8 rounded flex justify-center items-center border border-red-500 bg-transparent mr-2"
    >
      {children}
    </button>
  );
};

export default ButtonWithChildren;
