import { useState } from "react";

const PencilIcon = ({ action, className }) => {
  const [showText, setShowText] = useState(false);

  return (
    <div
      className={`relative cursor-pointer ${className}`}
      onMouseEnter={() => setShowText(true)}
      onMouseLeave={() => setShowText(false)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="25"
        viewBox="0 0 25 25"
        fill="none"
        onClick={action || ""}
      >
        <path
          d="M5.20833 19.7917H6.69271L16.875 9.60938L15.3906 8.125L5.20833 18.3073V19.7917ZM3.125 21.875V17.4479L16.875 3.72396C17.0833 3.53299 17.3135 3.38542 17.5656 3.28125C17.8177 3.17708 18.0823 3.125 18.3594 3.125C18.6372 3.125 18.9062 3.17708 19.1667 3.28125C19.4271 3.38542 19.6528 3.54167 19.8437 3.75L21.276 5.20833C21.4844 5.39931 21.6365 5.625 21.7323 5.88542C21.8281 6.14583 21.8757 6.40625 21.875 6.66667C21.875 6.94444 21.8274 7.20937 21.7323 7.46146C21.6372 7.71354 21.4851 7.9434 21.276 8.15104L7.55208 21.875H3.125ZM16.1198 8.88021L15.3906 8.125L16.875 9.60938L16.1198 8.88021Z"
          fill="#F70000"
          className="transition-colors duration-100"
        />
      </svg>
      {showText && (
        <span className="absolute bottom-7 -left-4 bg-primary-red-500 text-sm font-semibold text-white px-2 py-1 rounded">
          Editar
        </span>
      )}
    </div>
  );
};

export default PencilIcon;
