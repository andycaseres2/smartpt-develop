<<<<<<< HEAD
import { useState } from "react";

const DeleteIcon = ({ action, className }) => {
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
        className={`cursor-pointer ${className}`}
        onClick={action || ""}
      >
        <path
          d="M6.7972 21.875C6.36751 21.875 5.99967 21.722 5.69368 21.416C5.3877 21.11 5.2347 20.7422 5.2347 20.3125V5.46875H4.16699V3.90625H9.06283V3.125H15.9378V3.90625H20.8337V5.46875H19.766V20.3125C19.766 20.7292 19.6097 21.0938 19.2972 21.4062C18.9847 21.7188 18.6201 21.875 18.2035 21.875H6.7972ZM18.2035 5.46875H6.7972V20.3125H18.2035V5.46875ZM9.55762 18.0729H11.1201V7.68229H9.55762V18.0729ZM13.8805 18.0729H15.443V7.68229H13.8805V18.0729Z"
          fill="#F70000"
        />
      </svg>
      {showText && (
        <span className="absolute bottom-7 -left-5 bg-primary-red-500 text-sm font-semibold text-white px-2 py-1 rounded">
          Eliminar
        </span>
      )}
    </div>
  );
};

export default DeleteIcon;
=======
const DeleteIcon = ({ action, className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      className={className || ""}
      onClick={action || ""}
    >
      <path
        d="M6.7972 21.875C6.36751 21.875 5.99967 21.722 5.69368 21.416C5.3877 21.11 5.2347 20.7422 5.2347 20.3125V5.46875H4.16699V3.90625H9.06283V3.125H15.9378V3.90625H20.8337V5.46875H19.766V20.3125C19.766 20.7292 19.6097 21.0938 19.2972 21.4062C18.9847 21.7188 18.6201 21.875 18.2035 21.875H6.7972ZM18.2035 5.46875H6.7972V20.3125H18.2035V5.46875ZM9.55762 18.0729H11.1201V7.68229H9.55762V18.0729ZM13.8805 18.0729H15.443V7.68229H13.8805V18.0729Z"
        fill="#F70000"
      />
    </svg>
  );
};

export default DeleteIcon;
>>>>>>> b7ecf2887956819aed0507d5ec357a78c09ff6b2
