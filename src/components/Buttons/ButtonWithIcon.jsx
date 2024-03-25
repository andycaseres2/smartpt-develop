const ButtonWithIcon = ({
  text,
  buttonColor,
  action,
  icon,
  disabled,
  iconRight,
  designButton,
}) => {
  return (
    <button
      onClick={action}
      className={` ${
        !disabled ? buttonColor ?? "bg-primary-red-500" : "bg-gray-400"
      } rounded-md flex h-max justify-center items-center gap-2 py-2 px-4 text-white font-semibold ${designButton}`}
      disabled={disabled}
    >
      {icon && !iconRight && icon}
      <span>{text}</span>
      {iconRight && !icon && iconRight}
    </button>
  );
};

export default ButtonWithIcon;
