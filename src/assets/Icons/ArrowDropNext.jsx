const ArrowDropNext = ({ color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 8 10"
      fill="none"
    >
      <path
        d="M7.55 4.74019C7.75 4.85566 7.75 5.14434 7.55 5.25981L0.95 9.07032C0.750001 9.18579 0.5 9.04145 0.5 8.81051L0.5 1.18949C0.5 0.958549 0.75 0.81421 0.95 0.92968L7.55 4.74019Z"
        fill={color || "#ED0200"}
      />
    </svg>
  );
};

export default ArrowDropNext;
