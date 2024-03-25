const CloseIcon = ({ action, className }) => {
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
        d="M6.48438 19.6094L5.39062 18.5156L11.4063 12.5L5.39062 6.48438L6.48438 5.39062L12.5 11.4063L18.5156 5.39062L19.6094 6.48438L13.5938 12.5L19.6094 18.5156L18.5156 19.6094L12.5 13.5938L6.48438 19.6094Z"
        fill="#F70000"
      />
    </svg>
  );
};

export default CloseIcon;
