<<<<<<< HEAD
const CheckIcon = ({ action, className, height, width }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || "25"}
      height={height || "25"}
      viewBox="0 0 25 25"
      fill="none"
      onClick={action || ""}
      className={className || ""}
    >
      <path
        d="M9.84359 18.5937L4.01025 12.7604L5.13005 11.6406L9.84359 16.3541L19.8436 6.35413L20.9634 7.47392L9.84359 18.5937Z"
        fill="#F70000"
      />
    </svg>
  );
};

export default CheckIcon;
=======
const CheckIcon = ({ action, className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      onClick={action || ""}
      className={className || ""}
    >
      <path
        d="M9.84359 18.5937L4.01025 12.7604L5.13005 11.6406L9.84359 16.3541L19.8436 6.35413L20.9634 7.47392L9.84359 18.5937Z"
        fill="#F70000"
      />
    </svg>
  );
};

export default CheckIcon;
>>>>>>> b7ecf2887956819aed0507d5ec357a78c09ff6b2
