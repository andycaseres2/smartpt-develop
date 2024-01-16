const CalendarIcon = ({ className, width, height, fill, action }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ?? "48"}
      height={height ?? "48"}
      viewBox="0 0 48 48"
      fill="none"
      className={className ?? ""}
      onClick={action}
    >
      <g clipPath="url(#clip0_180_2410)">
        <path
          d="M48 35.812V37.687C47.9672 37.8532 47.9288 38.0195 47.9016 38.1867C47.19 42.5905 44.7666 45.6246 40.6312 47.2977C39.6844 47.6809 38.6766 47.8012 37.6875 48.0003H35.7188C35.6362 47.9073 35.52 47.9261 35.415 47.9101C30.8841 47.2225 27.7819 44.7473 26.1572 40.4581C26.0053 40.057 25.8413 39.9255 25.4072 39.9264C17.9775 39.9424 10.5469 39.9349 3.11719 39.9424C2.27063 39.9424 1.51594 39.7395 0.879375 39.1618C0.410625 38.7362 0.209063 38.1642 0 37.594C0 27.0937 0 16.5934 0 6.09214C0.045 5.97753 0.0946875 5.86575 0.133125 5.74927C0.510938 4.58069 1.46625 3.8414 2.69813 3.7531C3.03562 3.72868 3.49406 3.90152 3.67875 3.6695C3.85031 3.45438 3.73594 3.0157 3.76031 2.67658C3.915 0.505695 6.24469 -0.707973 8.06063 0.445575C9.08906 1.09938 9.44625 2.09417 9.36844 3.26557C9.34313 3.64977 9.44719 3.7625 9.84656 3.75874C12.0328 3.73713 14.2191 3.74841 16.4062 3.74841C17.1497 3.74841 17.1441 3.7484 17.16 2.98282C17.1656 2.71885 17.1844 2.45019 17.2425 2.19375C17.6756 0.28964 19.8487 -0.604642 21.4847 0.455908C22.4888 1.10689 22.8497 2.08478 22.7747 3.23927C22.7484 3.63568 22.8412 3.76625 23.2734 3.76062C25.335 3.73338 27.3966 3.75216 29.4581 3.74559C29.8116 3.74465 30.2503 3.89307 30.4969 3.67326C30.7097 3.4835 30.5316 3.05139 30.5691 2.72919C30.5869 2.57419 30.5962 2.41638 30.6319 2.26514C30.9056 1.08904 31.6256 0.330972 32.8069 0.078281C33.9741 -0.171592 34.9275 0.236095 35.6484 1.17547C36.1078 1.77479 36.2344 2.48025 36.1819 3.2139C36.1528 3.61971 36.2475 3.79349 36.7013 3.76062C37.3228 3.71647 37.95 3.74934 38.5744 3.74934C40.6978 3.74934 41.8125 4.86062 41.8125 6.97702C41.8125 13.3647 41.8162 19.7525 41.8041 26.1402C41.8041 26.5404 41.9006 26.7621 42.2756 26.9753C44.985 28.5131 46.7531 30.8089 47.5988 33.8017C47.7844 34.4574 47.8697 35.1422 48.0009 35.8129L48 35.812ZM20.9531 13.4051C14.7506 13.4051 8.54906 13.4051 2.34656 13.4023C2.06719 13.4023 1.86281 13.3732 1.86375 13.7931C1.87781 21.511 1.87313 29.2289 1.87594 36.9467C1.87594 37.7048 2.24156 38.0599 3.00937 38.0608C10.3988 38.0636 17.7881 38.0608 25.1775 38.0693C25.5187 38.0693 25.6041 37.9725 25.5591 37.6447C25.4194 36.6114 25.5225 35.5828 25.7137 34.5682C26.8819 28.3543 33.3019 24.2624 39.4219 25.8358C39.8691 25.9505 39.9469 25.8575 39.945 25.4178C39.9291 21.5899 39.9291 17.7629 39.945 13.9349C39.9469 13.5188 39.855 13.3939 39.4172 13.3948C33.2625 13.4108 27.1069 13.4051 20.9522 13.4051H20.9531ZM46.1231 36.7617C46.1381 31.6158 41.94 27.3999 36.7772 27.3755C31.6378 27.3511 27.4125 31.5472 27.3759 36.7091C27.3394 41.8456 31.6022 46.1263 36.75 46.1235C41.9006 46.1206 46.1081 41.9179 46.1231 36.7617ZM20.9128 11.5302C23.6616 11.5302 26.4103 11.5302 29.1591 11.5302C32.6109 11.5302 36.0619 11.5302 39.5138 11.532C39.7584 11.532 39.9525 11.563 39.9469 11.1873C39.9234 9.68805 39.945 8.18881 39.9338 6.68958C39.9291 5.99162 39.555 5.63936 38.8453 5.62621C38.3456 5.61775 37.8459 5.61494 37.3462 5.62715C36.9759 5.63654 36.5184 5.47403 36.2597 5.6976C36.0347 5.89205 36.2062 6.34671 36.1819 6.68488C36.0281 8.8398 33.765 10.0572 31.9266 8.9544C30.9722 8.38138 30.5672 7.48992 30.5616 6.39555C30.5578 5.62433 30.555 5.62433 29.7703 5.62433C27.7247 5.62433 25.6781 5.62433 23.6325 5.62433C22.7981 5.62433 22.8009 5.62433 22.7784 6.47634C22.7728 6.6783 22.7569 6.88309 22.7175 7.08129C22.3331 9.04364 20.1422 9.99429 18.4575 8.91777C17.5538 8.34005 17.1637 7.47301 17.1553 6.41716C17.1488 5.62433 17.1459 5.62433 16.3387 5.62433C14.3709 5.62433 12.4031 5.62057 10.4353 5.62809C10.0969 5.62903 9.67125 5.48342 9.4425 5.6976C9.22969 5.89675 9.40875 6.3204 9.36844 6.64261C9.345 6.8286 9.33281 7.01742 9.28594 7.19778C8.98406 8.34757 8.25187 9.07746 7.0875 9.30479C5.93906 9.52836 4.99688 9.12443 4.29094 8.19821C3.79969 7.55474 3.72281 6.7976 3.74344 6.01793C3.74719 5.88735 3.84094 5.70512 3.61031 5.62903C2.66531 5.31716 1.87688 5.86387 1.875 6.84363C1.87219 8.2339 1.89375 9.62417 1.86281 11.0135C1.8525 11.4541 1.98937 11.5424 2.40375 11.5414C8.57344 11.5283 14.7422 11.532 20.9119 11.532L20.9128 11.5302ZM7.5 4.73193C7.5 4.13824 7.5075 3.54456 7.49813 2.95182C7.48781 2.30929 7.10437 1.88 6.5625 1.88093C6.01969 1.88187 5.63344 2.31023 5.62781 2.95276C5.61844 4.10818 5.61844 5.26455 5.62781 6.41998C5.63344 7.06251 6.02063 7.4918 6.56344 7.49086C7.10531 7.49086 7.48688 7.06157 7.49813 6.4181C7.5075 5.85635 7.5 5.29367 7.5 4.73193ZM19.0322 4.68214C19.0322 5.25985 19.0247 5.83757 19.0341 6.41528C19.0444 7.05875 19.4241 7.48804 19.9659 7.49086C20.5078 7.49368 20.8988 7.06439 20.9044 6.4228C20.9137 5.26737 20.9137 4.111 20.9044 2.95558C20.8997 2.31211 20.5153 1.88281 19.9734 1.88093C19.4306 1.87906 19.0453 2.30647 19.0341 2.949C19.0238 3.52671 19.0322 4.10443 19.0322 4.68214ZM34.3125 4.67838C34.3125 4.10067 34.3209 3.52296 34.3106 2.94524C34.2994 2.30459 33.9103 1.8753 33.3684 1.88187C32.8256 1.88845 32.4459 2.31586 32.4412 2.96121C32.4328 4.11664 32.4319 5.27301 32.4412 6.42843C32.4469 7.06908 32.8406 7.49838 33.3834 7.49274C33.9253 7.4871 34.3013 7.05875 34.3106 6.4134C34.32 5.83569 34.3125 5.25798 34.3125 4.68026V4.67838Z"
          fill={fill || "#D9D9D9"}
        />
        <path
          d="M10.4203 36.1874C9.24844 36.1874 8.0775 36.1874 6.90563 36.1874C6.75 36.1874 6.59156 36.1911 6.43875 36.1648C5.97094 36.085 5.64094 35.7073 5.6325 35.2649C5.62406 34.8093 5.97188 34.411 6.45656 34.3321C6.57844 34.3124 6.70594 34.3143 6.83063 34.3143C9.25219 34.3133 11.6738 34.3143 14.0944 34.3143C14.2031 34.3143 14.3138 34.3114 14.4216 34.3274C14.9128 34.3979 15.2653 34.7783 15.2738 35.2377C15.2822 35.7139 14.9175 36.1122 14.4038 36.177C14.265 36.1949 14.1234 36.1883 13.9828 36.1883C12.7959 36.1883 11.6081 36.1883 10.4213 36.1883L10.4203 36.1874Z"
          fill={fill || "#D9D9D9"}
        />
        <path
          d="M9.51562 17.4367C10.4372 17.4367 11.3587 17.432 12.2803 17.4386C12.96 17.4433 13.3987 17.8171 13.3987 18.3742C13.3987 18.9312 12.96 19.3079 12.2803 19.3098C10.4372 19.3145 8.59406 19.3145 6.75094 19.3098C6.07125 19.3079 5.6325 18.9312 5.6325 18.3742C5.6325 17.8171 6.07125 17.4433 6.75094 17.4386C7.6725 17.432 8.59406 17.4367 9.51562 17.4367Z"
          fill={fill || "#D9D9D9"}
        />
        <path
          d="M21.0169 19.3116C20.1112 19.3116 19.2047 19.3154 18.2991 19.3107C17.6119 19.3069 17.1759 18.9481 17.1637 18.3919C17.1506 17.8199 17.5997 17.4404 18.3112 17.4385C20.1384 17.4347 21.9666 17.4347 23.7937 17.4385C24.4809 17.4404 24.9169 17.8011 24.9291 18.3572C24.9422 18.9293 24.4931 19.3069 23.7816 19.3107C22.86 19.3154 21.9384 19.3116 21.0169 19.3116Z"
          fill={fill || "#D9D9D9"}
        />
        <path
          d="M9.51563 23.0615C10.4372 23.0615 11.3588 23.0568 12.2803 23.0634C12.96 23.0681 13.3988 23.442 13.3988 23.999C13.3988 24.5561 12.9609 24.9328 12.2813 24.9346C10.4381 24.9393 8.595 24.9393 6.75188 24.9346C6.07219 24.9328 5.63344 24.5561 5.63344 23.999C5.63344 23.442 6.07125 23.0672 6.75094 23.0625C7.6725 23.0559 8.59406 23.0606 9.51563 23.0606V23.0615Z"
          fill={fill || "#D9D9D9"}
        />
        <path
          d="M21 24.9365C20.0944 24.9365 19.1878 24.9412 18.2822 24.9347C17.6025 24.93 17.1638 24.5561 17.1647 23.9981C17.1647 23.441 17.6034 23.0644 18.2831 23.0625C20.1263 23.0578 21.9694 23.0578 23.8125 23.0625C24.4922 23.0644 24.9309 23.441 24.93 23.9981C24.93 24.5551 24.4913 24.929 23.8116 24.9337C22.8741 24.9403 21.9375 24.9356 21 24.9356V24.9365Z"
          fill={fill || "#D9D9D9"}
        />
        <path
          d="M9.50437 30.5606C8.55187 30.5606 7.59844 30.5766 6.64594 30.5559C5.88563 30.5399 5.43094 29.8814 5.71969 29.2502C5.88469 28.8895 6.1875 28.696 6.57469 28.6941C8.5275 28.6847 10.4803 28.68 12.4322 28.6941C13.005 28.6988 13.4062 29.1234 13.3987 29.6344C13.3912 30.1463 12.9891 30.5437 12.4097 30.554C11.4412 30.5719 10.4728 30.5587 9.50437 30.5597V30.5606Z"
          fill={fill || "#D9D9D9"}
        />
        <path
          d="M21.0319 30.5615C20.0794 30.5615 19.1259 30.5765 18.1734 30.5568C17.415 30.5408 16.9594 29.8767 17.2528 29.2473C17.4291 28.8687 17.7506 28.6921 18.1566 28.6902C20.0775 28.6846 21.9994 28.6799 23.9203 28.6921C24.5241 28.6959 24.9403 29.112 24.93 29.6399C24.9197 30.1669 24.5034 30.5511 23.8903 30.5587C22.9378 30.5709 21.9844 30.5615 21.0319 30.5615Z"
          fill={fill || "#D9D9D9"}
        />
        <path
          d="M32.3906 19.3117C31.5319 19.3117 30.6722 19.3164 29.8134 19.3098C29.1338 19.3051 28.695 18.9312 28.695 18.3742C28.695 17.8171 29.1338 17.4404 29.8134 17.4386C31.5628 17.4329 33.3122 17.4329 35.0616 17.4386C35.7413 17.4404 36.18 17.8171 36.18 18.3742C36.18 18.9312 35.7413 19.3051 35.0616 19.3098C34.1709 19.3164 33.2813 19.3117 32.3906 19.3117Z"
          fill={fill || "#D9D9D9"}
        />
        <path
          d="M19.0237 35.234C19.0331 35.7243 18.6028 36.1696 18.1087 36.179C17.6175 36.1884 17.1731 35.7581 17.1637 35.264C17.1544 34.7737 17.5847 34.3284 18.0778 34.319C18.5681 34.3087 19.0134 34.7399 19.0228 35.234H19.0237Z"
          fill={fill || "#D9D9D9"}
        />
        <path
          d="M35.8125 33.9376C35.8125 33.0631 35.8078 32.1885 35.8134 31.3149C35.8181 30.6348 36.1894 30.197 36.7462 30.1942C37.3031 30.1914 37.6819 30.6301 37.6856 31.3083C37.6913 32.6826 37.6969 34.056 37.6809 35.4303C37.6772 35.7393 37.7691 35.822 38.0728 35.8192C39.4622 35.8042 40.8516 35.8042 42.2409 35.8164C43.0031 35.8229 43.4653 36.3931 43.2497 37.031C43.1006 37.4715 42.7669 37.681 42.3225 37.6829C40.4803 37.6914 38.6381 37.697 36.7959 37.6801C36.1669 37.6744 35.8238 37.2761 35.8163 36.6092C35.8059 35.7196 35.8134 34.8291 35.8134 33.9395L35.8125 33.9376Z"
          fill={fill || "#D9D9D9"}
        />
      </g>
      <defs>
        <clipPath id="clip0_180_2410">
          <rect width="48" height="48" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default CalendarIcon;
