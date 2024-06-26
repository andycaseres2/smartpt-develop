const ArrowRigth = ({ action }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="8"
      height="10"
      viewBox="0 0 8 10"
      fill="none"
      onClick={action || ""}
    >
      <path
        d="M7.55 4.74019C7.75 4.85566 7.75 5.14434 7.55 5.25981L0.950001 9.07032C0.750002 9.18579 0.500001 9.04145 0.500001 8.81051L0.500001 1.18949C0.500001 0.958549 0.750001 0.814211 0.950001 0.929681L7.55 4.74019Z"
        fill="#2F2F2F"
      />
    </svg>
  );
};

export default ArrowRigth;
