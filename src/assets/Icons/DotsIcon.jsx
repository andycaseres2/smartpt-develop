const DotsIcon = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="4"
      height="18"
      viewBox="0 0 4 18"
      fill="none"
      className={className || ""}
    >
      <circle cx="2" cy="2" r="2" fill="#F70000" />
      <circle cx="2" cy="9" r="2" fill="#F70000" />
      <circle cx="2" cy="16" r="2" fill="#F70000" />
    </svg>
  );
};

export default DotsIcon;
