const Button = ({ text, action }) => {
  return (
    <button
      onClick={action}
      className="border-none text-white bg-primary-red-500 py-2 px-4 rounded"
    >
      {text}
    </button>
  );
};

export default Button;
