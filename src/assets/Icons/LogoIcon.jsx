const LogoIcon = ({ redirect }) => {
  return (
    <a href={redirect || ""}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="61"
        height="61"
        viewBox="0 0 61 61"
        fill="none"
      >
        <rect width="61" height="61" rx="5" fill="#F70000" />
        <line
          x1="22.8873"
          y1="35.0426"
          x2="37.6383"
          y2="49.7936"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="24.1852"
          y1="12.9788"
          x2="31.1489"
          y2="19.9425"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="16.3979"
          y1="18.1702"
          x2="42.8298"
          y2="44.602"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </a>
  );
};

export default LogoIcon;
