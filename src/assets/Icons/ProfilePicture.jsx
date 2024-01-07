const ProfilePicture = ({ action, className }) => {
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
        d="M4.6875 21.875C4.27083 21.875 3.90625 21.7188 3.59375 21.4062C3.28125 21.0938 3.125 20.7292 3.125 20.3125V4.6875C3.125 4.27083 3.28125 3.90625 3.59375 3.59375C3.90625 3.28125 4.27083 3.125 4.6875 3.125H10.0781C10.0434 2.48264 10.2691 1.90538 10.7552 1.39323C11.2413 0.881076 11.8229 0.625 12.5 0.625C13.1771 0.625 13.7587 0.881076 14.2448 1.39323C14.7309 1.90538 14.9566 2.48264 14.9219 3.125H20.3125C20.7292 3.125 21.0938 3.28125 21.4062 3.59375C21.7188 3.90625 21.875 4.27083 21.875 4.6875V20.3125C21.875 20.7292 21.7188 21.0938 21.4062 21.4062C21.0938 21.7188 20.7292 21.875 20.3125 21.875H4.6875ZM12.5 3.59375C12.7257 3.59375 12.9123 3.51997 13.0599 3.3724C13.2075 3.22483 13.2812 3.03819 13.2812 2.8125C13.2812 2.58681 13.2075 2.40017 13.0599 2.2526C12.9123 2.10503 12.7257 2.03125 12.5 2.03125C12.2743 2.03125 12.0877 2.10503 11.9401 2.2526C11.7925 2.40017 11.7188 2.58681 11.7188 2.8125C11.7188 3.03819 11.7925 3.22483 11.9401 3.3724C12.0877 3.51997 12.2743 3.59375 12.5 3.59375ZM4.6875 19.349C5.72917 18.3767 6.90882 17.5911 8.22646 16.9922C9.54411 16.3932 10.9677 16.0938 12.4973 16.0938C14.0269 16.0938 15.4514 16.3932 16.7708 16.9922C18.0903 17.5911 19.2708 18.3767 20.3125 19.349V4.6875H4.6875V19.349ZM12.5521 14.0365C13.559 14.0365 14.4097 13.6892 15.1042 12.9948C15.7986 12.3003 16.1458 11.4497 16.1458 10.4427C16.1458 9.43576 15.7986 8.58507 15.1042 7.89062C14.4097 7.19618 13.559 6.84896 12.5521 6.84896C11.5451 6.84896 10.6944 7.19618 10 7.89062C9.30556 8.58507 8.95833 9.43576 8.95833 10.4427C8.95833 11.4497 9.30556 12.3003 10 12.9948C10.6944 13.6892 11.5451 14.0365 12.5521 14.0365ZM6.11979 20.3125H18.8802V20.0781C17.9427 19.2795 16.9358 18.6762 15.8594 18.2682C14.783 17.8602 13.6632 17.6562 12.5 17.6562C11.3368 17.6562 10.217 17.8602 9.14062 18.2682C8.06424 18.6762 7.05729 19.2795 6.11979 20.0781V20.3125ZM12.5521 12.474C11.9878 12.474 11.5082 12.2765 11.1133 11.8815C10.7183 11.4865 10.5208 11.0069 10.5208 10.4427C10.5208 9.87847 10.7183 9.39887 11.1133 9.00391C11.5082 8.60894 11.9878 8.41146 12.5521 8.41146C13.1163 8.41146 13.5959 8.60894 13.9909 9.00391C14.3859 9.39887 14.5833 9.87847 14.5833 10.4427C14.5833 11.0069 14.3859 11.4865 13.9909 11.8815C13.5959 12.2765 13.1163 12.474 12.5521 12.474Z"
        fill="#F70000"
      />
    </svg>
  );
};

export default ProfilePicture;
