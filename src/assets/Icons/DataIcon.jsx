const DataIcon = ({ className, width, height }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || "48"}
      height={height || "41"}
      viewBox="0 0 48 41"
      fill="none"
      className={className || ""}
    >
      <path
        d="M47.9977 24.57C47.7488 25.2871 47.412 25.9409 46.7418 26.3646C46.2371 26.6838 45.6843 26.8141 45.0951 26.8141C36.8063 26.8141 28.5164 26.8176 20.2277 26.8118C18.4871 26.8106 17.3474 25.6862 17.3298 23.9491C17.3099 22.0911 17.311 20.2343 17.3298 18.3763C17.3462 16.6369 18.473 15.5019 20.2171 15.5007C28.5059 15.4902 36.7958 15.4925 45.0845 15.4996C46.5223 15.4996 47.4507 16.205 47.9084 17.5747C47.9272 17.6298 47.9671 17.6791 47.9977 17.7308V24.5723V24.57ZM32.6279 25.408C36.7512 25.408 40.8732 25.408 44.9965 25.408C46.0927 25.408 46.5904 24.9045 46.5915 23.8C46.5927 22.0348 46.5927 20.2707 46.5915 18.5054C46.5915 17.4092 46.0869 16.901 44.9883 16.901C36.7735 16.8998 28.5599 16.8998 20.3451 16.901C19.2136 16.901 18.7336 17.3904 18.7324 18.5371C18.73 20.2707 18.7312 22.0042 18.7324 23.7378C18.7324 24.9432 19.1972 25.4068 20.4014 25.408C24.4777 25.408 28.554 25.408 32.6291 25.408H32.6279Z"
        fill="#D9D9D9"
      />
      <path
        d="M47.9977 11.1687C47.7923 11.813 47.5258 12.4152 46.9742 12.8565C46.3932 13.3213 45.7254 13.4703 45.007 13.4703C36.7782 13.4703 28.5493 13.4738 20.3204 13.468C18.4261 13.4668 17.3322 12.3576 17.3263 10.4644C17.3204 8.70036 17.3204 6.93511 17.3263 5.17102C17.3322 3.2567 18.4354 2.16867 20.3639 2.1675C23.7993 2.16633 27.2347 2.1675 30.669 2.1675C30.8099 2.1675 30.9531 2.15694 31.0892 2.18041C31.4542 2.24379 31.6831 2.45389 31.6984 2.83769C31.7136 3.22267 31.5023 3.45506 31.142 3.53957C30.9777 3.5783 30.8016 3.57008 30.6303 3.57008C27.1948 3.57126 23.7594 3.57008 20.3251 3.57126C19.2101 3.57126 18.7336 4.04661 18.7324 5.16632C18.7289 6.94684 18.7289 8.72618 18.7324 10.5067C18.7347 11.563 19.2218 12.0595 20.2793 12.0595C28.5235 12.063 36.7676 12.063 45.0129 12.0595C46.0927 12.0595 46.5904 11.5537 46.5915 10.4832C46.5927 8.68746 46.5939 6.89168 46.5915 5.0959C46.5892 4.08182 46.0786 3.57126 45.0646 3.57008C41.6455 3.56774 38.2254 3.57008 34.8063 3.57008C34.6819 3.57008 34.5563 3.5736 34.4319 3.57008C33.9202 3.55013 33.6045 3.28018 33.6033 2.86468C33.6033 2.44684 33.9167 2.17102 34.4308 2.16867C35.8521 2.16163 37.2723 2.16633 38.6937 2.16633C40.6455 2.16633 42.5974 2.16633 44.5493 2.16633C46.6197 2.16633 47.2148 2.55482 48 4.41985V11.1675L47.9977 11.1687Z"
        fill="#D9D9D9"
      />
      <path
        d="M47.9977 37.8764C47.8333 38.2438 47.7465 38.6463 47.5 38.9773C46.8944 39.7907 46.0833 40.1499 45.0739 40.1452C42.7312 40.1323 40.3885 40.1417 38.0458 40.1417C36.9988 40.1417 35.9531 40.1417 34.9061 40.1417C33.9437 40.1417 33.6092 39.9656 33.6045 39.4539C33.5998 38.9316 33.9624 38.7355 34.939 38.7355C38.0786 38.7355 41.2171 38.7355 44.3568 38.7355C44.6538 38.7355 44.9507 38.7414 45.2465 38.732C46.0305 38.7062 46.5786 38.1827 46.5845 37.4022C46.5986 35.4656 46.5986 33.529 46.5845 31.5924C46.5798 30.8306 46.0481 30.3095 45.2899 30.2649C45.1808 30.2579 45.0716 30.259 44.9624 30.259C36.7629 30.259 28.5634 30.259 20.3639 30.259C20.2394 30.259 20.1139 30.259 19.9894 30.2672C19.2664 30.3177 18.7512 30.8048 18.743 31.5325C18.723 33.4996 18.7207 35.4679 18.7406 37.4363C18.7488 38.2637 19.2993 38.7332 20.1937 38.7344C23.6608 38.7391 27.1279 38.7367 30.5951 38.7367C30.8134 38.7367 31.034 38.7191 31.243 38.8025C31.5763 38.9351 31.7336 39.1816 31.6913 39.536C31.6514 39.8717 31.4448 40.0654 31.1186 40.124C30.9965 40.1463 30.8697 40.1417 30.7453 40.1417C27.2465 40.1417 23.7488 40.1464 20.25 40.1417C18.7782 40.1393 17.7301 39.3705 17.4061 38.0536C17.3357 37.7696 17.3286 37.4656 17.3275 37.171C17.3204 35.3905 17.3181 33.61 17.3251 31.8295C17.3322 29.9609 18.4284 28.8564 20.2946 28.8553C28.5258 28.8506 36.7559 28.8517 44.9871 28.8553C46.5833 28.8553 47.3005 29.4057 47.9953 31.1311V37.8787L47.9977 37.8764Z"
        fill="#D9D9D9"
      />
      <path
        d="M0.0164397 21.1405C0.0164397 20.2191 0.00939743 19.2977 0.0176134 18.3776C0.0328716 16.6992 1.13733 15.536 2.8216 15.5043C4.72536 15.4679 6.63029 15.4914 8.53522 15.4996C9.05752 15.502 9.56456 15.6147 9.99883 15.9198C10.2265 16.0794 10.3427 16.0032 10.4941 15.8224C10.9742 15.2473 11.4484 14.6651 11.9624 14.1217C12.6561 13.3893 13.5188 13.144 14.4812 13.4715C15.4202 13.7907 15.9613 14.4855 16.0927 15.4691C16.1972 16.2496 15.8838 16.8963 15.3826 17.4762C14.2207 18.8236 13.0869 20.1968 11.8979 21.5196C11.4707 21.9949 11.2617 22.4703 11.3181 23.1064C11.3662 23.6487 11.3603 24.2027 11.2301 24.7367C10.9355 25.9433 9.90024 26.7837 8.59743 26.8048C6.64672 26.8353 4.69367 26.8412 2.74297 26.8048C1.15024 26.7743 0.0422613 25.6017 0.0176134 24.0008C0.00352888 23.0489 0.0152659 22.0959 0.0152659 21.144L0.0164397 21.1405ZM9.89907 23.874C9.67489 24.1205 9.53874 24.2872 9.38498 24.4363C8.30517 25.475 6.80752 25.4327 5.8439 24.2766C5.00588 23.2708 4.20541 22.2285 3.45423 21.1569C2.69719 20.0771 2.97419 18.6992 4.02348 17.9198C5.05048 17.1569 6.45775 17.3482 7.28639 18.3635C7.38498 18.4844 7.49649 18.5971 7.58099 18.7273C7.71832 18.9398 7.82512 18.955 7.99414 18.7438C8.32395 18.3294 8.68663 17.9398 9.02231 17.529C9.12325 17.4057 9.34977 17.2989 9.25588 17.1158C9.17841 16.9656 8.9601 16.975 8.78639 16.9632C6.77583 16.8271 4.76292 16.9104 2.75118 16.9151C1.9425 16.9175 1.43193 17.4973 1.42841 18.3142C1.41902 20.2027 1.4202 22.0912 1.42841 23.9785C1.43193 24.8388 1.97301 25.3987 2.82395 25.4034C4.72771 25.4151 6.63146 25.4163 8.53522 25.4034C9.37207 25.3975 9.85916 24.8776 9.90259 23.8752L9.89907 23.874ZM7.74062 23.7449C8.09038 23.7637 8.35916 23.5184 8.61151 23.2215C10.4859 21.0243 12.3674 18.8318 14.243 16.6346C14.3744 16.4809 14.5082 16.3212 14.5939 16.1416C14.7923 15.732 14.7171 15.3412 14.3944 15.0278C14.088 14.7297 13.7089 14.6628 13.3134 14.8412C13.0822 14.9456 12.919 15.1417 12.7559 15.3318C11.3157 17.0172 9.87559 18.7039 8.43076 20.3846C7.95893 20.9339 7.52583 20.9245 7.07982 20.3658C6.80752 20.0243 6.55282 19.6675 6.277 19.3294C5.85212 18.8083 5.30987 18.7132 4.84508 19.0642C4.37207 19.421 4.30048 19.9715 4.70189 20.5102C5.41198 21.4609 6.1432 22.394 6.86855 23.333C7.06926 23.5924 7.32395 23.7578 7.73827 23.7449H7.74062Z"
        fill="#D9D9D9"
      />
      <path
        d="M5.70892 2.16745C6.61385 2.16745 7.51996 2.17449 8.42489 2.1651C9.00118 2.15923 9.54813 2.26369 10.0258 2.59116C10.2453 2.74139 10.3416 2.65923 10.4777 2.49609C10.9378 1.94444 11.3991 1.39397 11.8791 0.859936C12.5681 0.0946775 13.4284 -0.189362 14.419 0.113455C15.3897 0.40923 15.9448 1.10876 16.0892 2.10993C16.1984 2.87167 15.9108 3.51252 15.4214 4.08294C14.1502 5.56299 12.8862 7.05008 11.6103 8.52543C11.4155 8.75078 11.3169 8.97379 11.3204 9.27895C11.3286 9.8705 11.3568 10.4632 11.284 11.0559C11.1244 12.347 10.1538 13.3564 8.84742 13.4233C6.74296 13.5289 4.63381 13.5278 2.52935 13.4257C1.14437 13.3588 0.0786431 12.2872 0.0422581 10.9092C-0.0129062 8.85055 -0.0152536 6.78716 0.0422581 4.72848C0.0821642 3.28482 1.2547 2.21322 2.71127 2.17684C3.7101 2.15102 4.70892 2.17214 5.70892 2.17214C5.70892 2.17214 5.70892 2.16979 5.70892 2.16862V2.16745ZM9.87559 10.5876C9.69484 10.7825 9.57395 10.9233 9.44249 11.0536C8.38263 12.1088 6.85799 12.1158 5.8932 10.9832C5.01409 9.95265 4.19367 8.8658 3.4155 7.75547C2.77231 6.83763 2.95188 5.58998 3.73005 4.83998C4.82395 3.78717 6.4108 3.90336 7.38029 5.10876C7.65963 5.45539 7.94562 5.45657 8.23827 5.11228C8.40024 4.92214 8.58099 4.74491 8.72184 4.54069C8.89907 4.28247 9.35681 4.06416 9.22653 3.78951C9.08569 3.49374 8.60799 3.58177 8.27113 3.57942C6.49179 3.56768 4.71245 3.57003 2.9331 3.57355C1.94719 3.5759 1.42723 4.08998 1.42606 5.07003C1.42137 6.89632 1.42254 8.72261 1.42606 10.5489C1.42841 11.5278 1.93897 12.0477 2.92606 12.0606C3.87794 12.0736 4.82982 12.0642 5.78169 12.0642C6.68662 12.0642 7.59273 12.0794 8.49766 12.0583C9.40141 12.0372 9.90024 11.5184 9.87911 10.5876H9.87559ZM5.42958 5.53364C5.02935 5.5266 4.74061 5.71674 4.55869 6.05947C4.35212 6.44679 4.42841 6.81651 4.68545 7.15337C5.38615 8.07121 6.08686 8.99022 6.79461 9.90219C7.33216 10.5935 7.9824 10.6052 8.55634 9.93505C10.4671 7.70735 12.3744 5.4773 14.2805 3.24608C14.4014 3.10524 14.5188 2.95266 14.5998 2.78717C14.7911 2.3928 14.6784 1.91627 14.3533 1.64045C14.0223 1.35993 13.5481 1.32825 13.1831 1.58764C13.02 1.70266 12.8779 1.85407 12.7465 2.00665C11.3122 3.67566 9.88381 5.35055 8.44836 7.01839C7.93428 7.6158 7.53287 7.60055 7.03874 6.97731C6.777 6.6475 6.527 6.30712 6.26409 5.97848C6.05165 5.7144 5.7946 5.51956 5.43076 5.53247L5.42958 5.53364Z"
        fill="#D9D9D9"
      />
      <path
        d="M5.63967 40.1416C4.4378 40.1416 3.23592 40.1463 2.03404 40.1404C0.75235 40.1346 0.0211295 39.4127 0.0187821 38.1451C0.0140872 35.7097 0.0129135 33.2754 0.0187821 30.84C0.0211295 29.597 0.748829 28.8611 2 28.8564C4.45071 28.8458 6.90141 28.8447 9.35211 28.8564C10.5775 28.8623 11.3146 29.5817 11.3239 30.8059C11.3416 33.2719 11.3427 35.7378 11.3239 38.2038C11.3146 39.4245 10.5657 40.1322 9.34155 40.1404C8.10798 40.1486 6.87559 40.1416 5.64202 40.1416H5.63967ZM5.68662 38.7355C6.87324 38.7355 8.05986 38.7378 9.24648 38.7355C9.79695 38.7343 9.91902 38.6228 9.92019 38.0888C9.92488 35.7003 9.92488 33.3106 9.92019 30.9221C9.92019 30.3775 9.80164 30.2625 9.25704 30.2613C6.86855 30.2578 4.47888 30.2578 2.09038 30.2613C1.52582 30.2613 1.42371 30.3623 1.42254 30.9116C1.42019 33.3001 1.42019 35.6897 1.42254 38.0782C1.42254 38.6322 1.52582 38.7343 2.07864 38.7355C3.28052 38.739 4.48357 38.7355 5.68545 38.7355H5.68662Z"
        fill="#D9D9D9"
      />
      <path
        d="M32.6667 8.52663C29.2805 8.52663 25.8944 8.52663 22.5082 8.52663C21.7653 8.52663 21.4038 8.28603 21.4143 7.80128C21.4249 7.33063 21.7559 7.12053 22.4894 7.12053C29.2617 7.12053 36.034 7.12053 42.8063 7.12053C42.9777 7.12053 43.1526 7.11349 43.3192 7.14166C43.6467 7.198 43.8474 7.40105 43.8815 7.73673C43.9178 8.09119 43.7617 8.33767 43.4249 8.46326C43.23 8.53603 43.0258 8.52663 42.8239 8.52663C39.4378 8.52663 36.0516 8.52663 32.6655 8.52663H32.6667Z"
        fill="#D9D9D9"
      />
      <path
        d="M32.6667 35.1957C29.2958 35.1957 25.9261 35.1957 22.5552 35.1957C21.7535 35.1957 21.4014 34.975 21.4131 34.4832C21.4249 33.9949 21.7711 33.7896 22.5822 33.7896C29.3075 33.7896 36.0329 33.7895 42.757 33.7907C42.9589 33.7907 43.1643 33.7966 43.3603 33.8377C43.7124 33.9116 43.8897 34.1534 43.8838 34.5102C43.8779 34.8682 43.6866 35.0971 43.3345 35.1628C43.1526 35.1968 42.9624 35.1945 42.7758 35.1945C39.4049 35.1957 36.0352 35.1957 32.6643 35.1957H32.6667Z"
        fill="#D9D9D9"
      />
      <path
        d="M32.6819 21.8563C29.2958 21.8563 25.9096 21.8563 22.5223 21.8563C22.3509 21.8563 22.1761 21.8669 22.0082 21.8387C21.6338 21.7742 21.4237 21.523 21.419 21.1592C21.4155 20.8164 21.6115 20.5664 21.9601 20.4878C22.1244 20.4502 22.3005 20.4538 22.4718 20.4538C29.2606 20.4526 36.0481 20.4526 42.8369 20.4538C42.993 20.4538 43.1526 20.4432 43.3028 20.4761C43.6843 20.5594 43.9096 20.7953 43.8838 21.2038C43.8603 21.5852 43.6279 21.793 43.2606 21.847C43.108 21.8693 42.9495 21.8587 42.7934 21.8587C39.4225 21.8587 36.0516 21.8587 32.6808 21.8587L32.6819 21.8563Z"
        fill="#D9D9D9"
      />
    </svg>
  );
};

export default DataIcon;
