const SolicitudIcon = ({ width, height, className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || "48"}
      height={height || "48"}
      viewBox="0 0 48 48"
      fill="none"
      className={className || ""}
    >
      <path
        d="M47.9975 14.0546C46.8744 15.2891 45.6599 16.4348 44.4779 17.6118C44.1636 17.9235 43.7492 17.9148 43.4287 17.6005C42.3218 16.5199 41.2237 15.4319 40.1369 14.3326C39.8126 14.0045 39.8377 13.5913 40.1607 13.2445C40.3623 13.0279 40.5714 12.8125 40.8005 12.6272C41.0622 12.4156 41.056 12.2954 40.7667 12.0938C38.4579 10.4862 35.945 9.34803 33.1854 8.78585C27.5961 7.64645 22.3975 8.62808 17.5882 11.6944C17.3128 11.8697 17.2151 12.0037 17.3616 12.353C17.9726 13.8104 17.6371 15.4644 16.5027 16.5362C15.2982 17.6731 13.8908 17.9273 12.3445 17.3376C12.0816 17.2374 11.9326 17.2023 11.741 17.4815C7.03319 24.378 7.22601 34.1843 12.2156 40.8904C12.2506 40.938 12.2957 40.9781 12.3946 41.087C12.6788 40.774 12.938 40.4597 13.2285 40.178C13.6216 39.7961 14.0311 39.7986 14.423 40.1893C15.4747 41.236 16.5189 42.2903 17.5569 43.3508C17.9501 43.7514 17.9501 44.1446 17.5594 44.5402C16.5164 45.5957 15.466 46.6437 14.4104 47.6867C14.0023 48.0899 13.6254 48.0987 13.2235 47.7017C12.1555 46.6487 11.0949 45.5895 10.0432 44.5202C9.66506 44.1358 9.67508 43.7602 10.0457 43.367C10.3562 43.0378 10.663 42.7009 11.0073 42.408C11.2802 42.1763 11.1726 42.0211 11.0111 41.7982C9.27066 39.3917 8.05865 36.741 7.3988 33.8437C6.36333 29.2937 6.7352 24.855 8.46432 20.5253C8.50814 20.4152 8.55447 20.3062 8.59954 20.1973C8.55948 20.1635 8.51941 20.1297 8.47935 20.0959C8.13753 20.4728 7.80698 20.8622 7.45014 21.2253C6.55114 22.1368 5.64839 23.047 4.72561 23.9335C4.46643 24.1827 4.41259 24.3905 4.5115 24.7398C4.85583 25.9594 4.09832 27.2315 2.8838 27.5382C1.62796 27.8563 0.392161 27.1163 0.0691242 25.8542C-0.236383 24.6585 0.49984 23.4051 1.70434 23.0909C2.15008 22.9744 2.60584 22.9694 3.04031 23.1434C3.24816 23.2261 3.37587 23.1848 3.52862 23.032C5.81241 20.7432 8.09997 18.4582 10.3938 16.1794C10.5716 16.0028 10.5703 15.8839 10.4564 15.6673C9.62249 14.0934 9.87541 12.3067 11.0849 11.0897C12.2944 9.8739 14.0999 9.60095 15.6575 10.4348C15.9292 10.5801 16.0557 10.5187 16.241 10.3309C18.4872 8.07091 20.741 5.81842 22.9935 3.56467C23.1374 3.42068 23.2476 3.31175 23.1675 3.05007C22.7493 1.68655 23.3465 0.547159 24.6825 0.0813852C24.7401 0.0613519 24.7927 0.0275458 24.8478 0C25.1608 0 25.4726 0 25.7856 0C25.8257 0.0237895 25.8632 0.0538394 25.907 0.0688644C27.2405 0.538394 27.8903 1.72036 27.5097 2.96117C27.1003 4.29589 25.6278 4.89313 24.5598 4.44739C24.2994 4.33846 24.1892 4.49872 24.0477 4.64021C22.8319 5.85222 21.6149 7.06298 20.4016 8.27625C20.324 8.35388 20.2038 8.41273 20.2013 8.5755C20.3678 8.51164 20.5118 8.4578 20.6546 8.40021C25.0043 6.6786 29.4604 6.35055 34.0118 7.41357C36.854 8.07717 39.4583 9.28292 41.8172 11.0045C42.0827 11.1986 42.2392 11.2211 42.4608 10.957C42.7212 10.6477 43.0255 10.3747 43.3185 10.0943C43.7842 9.64602 44.1448 9.64477 44.6094 10.103C45.298 10.7817 45.9867 11.4628 46.6603 12.1564C47.116 12.6247 47.6369 13.0329 47.9987 13.5888V14.0571L47.9975 14.0546ZM16.1546 13.8242C16.1621 12.5145 15.1241 11.454 13.8282 11.4478C12.5486 11.4415 11.4668 12.5208 11.4656 13.8042C11.4656 15.0813 12.501 16.1255 13.7844 16.1431C15.0991 16.1606 16.1458 15.1364 16.1546 13.8242ZM16.0181 43.9255C15.9718 43.8691 15.9367 43.819 15.8954 43.7777C15.2581 43.1379 14.612 42.5069 13.9847 41.8583C13.8082 41.6767 13.7256 41.7994 13.6166 41.9084C13.0106 42.5144 12.4096 43.1241 11.7974 43.7214C11.6408 43.8741 11.6221 43.9705 11.7886 44.1321C12.4034 44.7281 13.0069 45.3353 13.6079 45.9463C13.7531 46.0941 13.8495 46.1404 14.0198 45.9639C14.6258 45.3366 15.2493 44.7268 15.8641 44.1095C15.918 44.0557 15.963 43.9931 16.0194 43.9255H16.0181ZM43.9608 15.9753C44.0259 15.9277 44.0797 15.8977 44.1211 15.8563C44.7609 15.219 45.3957 14.578 46.0392 13.9444C46.2183 13.7691 46.0806 13.6765 45.9716 13.5675C45.3781 12.9728 44.7771 12.3843 44.1924 11.7808C44.0234 11.6068 43.9182 11.5993 43.7454 11.7783C43.1607 12.3818 42.566 12.9753 41.9625 13.5613C41.7909 13.7278 41.7759 13.8355 41.9575 14.0108C42.5622 14.5955 43.1494 15.1965 43.7454 15.7887C43.8093 15.8526 43.8819 15.9077 43.9608 15.9753ZM25.3098 3.08763C25.7505 3.09389 26.1161 2.73329 26.1161 2.29381C26.1161 1.85433 25.7468 1.49123 25.3098 1.49749C24.8866 1.50375 24.546 1.84431 24.5335 2.27002C24.521 2.71827 24.8666 3.08137 25.3098 3.08638V3.08763ZM3.10291 25.3083C3.10667 24.8788 2.77487 24.537 2.3404 24.5232C1.89716 24.5095 1.5904 24.7937 1.57913 25.2282C1.56786 25.6814 1.91344 26.0445 2.35918 26.047C2.78113 26.0495 3.09916 25.734 3.10291 25.3083Z"
        fill="#D9D9D9"
      />
      <path
        d="M47.9975 35.7982C47.8485 35.9772 47.7133 36.1701 47.548 36.3341C43.8281 40.0578 40.1056 43.7789 36.3845 47.5014C36.3294 47.5565 36.2755 47.6128 36.2179 47.6667C35.6896 48.1625 35.1925 48.0861 34.8669 47.4413C34.1194 45.9663 33.3782 44.4889 32.6508 43.0052C32.5243 42.7472 32.3578 42.5957 32.0911 42.4943C29.5994 41.5465 27.1141 40.5836 24.6212 39.6383C24.2155 39.4843 23.9525 39.2577 23.7848 38.837C21.2781 32.5353 18.7589 26.2386 16.231 19.9456C16.0206 19.4222 16.0907 19.0416 16.5039 18.6522C17.2765 17.9235 18.0189 17.1635 18.7602 16.4022C19.0882 16.0654 19.4263 16.0091 19.8582 16.1831C26.2126 18.7286 32.5681 21.2678 38.9274 23.7982C39.3168 23.9535 39.5096 24.224 39.6499 24.5933C40.5864 27.0562 41.5393 29.5127 42.4733 31.9768C42.5973 32.3024 42.7713 32.519 43.0944 32.6755C44.5117 33.3616 45.914 34.0791 47.3264 34.7777C47.5981 34.9117 47.8335 35.0757 48 35.3312V35.7994L47.9975 35.7982ZM31.3824 26.976C34.2609 26.976 36.3945 29.6743 35.667 32.4301C35.2037 34.1868 34.0568 35.3161 32.2826 35.6817C30.4446 36.0611 28.8983 35.4464 27.8102 33.9213C26.7334 32.4113 26.7059 30.7861 27.5873 29.1559C27.6988 28.9493 27.7852 28.8203 27.5673 28.6037C24.4897 25.5424 21.4196 22.4735 18.3583 19.3947C18.1279 19.163 18.0214 19.2507 17.8411 19.426C17.6471 19.615 17.7823 19.7741 17.8462 19.9343C20.2351 25.9118 22.6304 31.8879 25.0156 37.8666C25.1157 38.117 25.2459 38.2673 25.5076 38.3662C27.8252 39.2452 30.1378 40.1354 32.4454 41.0394C32.7422 41.1558 32.9137 41.097 33.129 40.8791C35.7046 38.2873 38.2876 35.703 40.8782 33.1262C41.1048 32.9009 41.1749 32.7218 41.0497 32.4025C40.1557 30.125 39.2793 27.84 38.4128 25.5512C38.2964 25.2431 38.1148 25.0829 37.8168 24.9652C34.9909 23.8458 32.1712 22.7114 29.349 21.5821C26.2088 20.325 23.0648 19.0754 19.9296 17.8058C19.6304 17.6843 19.4663 17.7657 19.2961 17.9823C19.132 18.1902 19.3461 18.2603 19.4375 18.353C22.4926 21.4155 25.554 24.4706 28.604 27.537C28.8044 27.7385 28.9333 27.7198 29.1549 27.5845C29.8348 27.1701 30.5786 26.9598 31.3811 26.976H31.3824ZM45.9366 35.8044C45.8514 35.7506 45.7913 35.7068 45.725 35.673C44.6256 35.1208 43.5226 34.5749 42.427 34.0152C42.2429 33.9213 42.149 33.9952 42.0301 34.1129C39.3957 36.751 36.7601 39.3892 34.1194 42.021C33.9729 42.1663 33.9504 42.2777 34.0443 42.4618C34.589 43.5298 35.1274 44.6016 35.6532 45.6796C35.7784 45.935 35.8661 45.91 36.0451 45.7322C39.273 42.4968 42.5071 39.2652 45.7375 36.0323C45.8013 35.9685 45.8564 35.8971 45.9366 35.8044ZM31.4062 28.4723C29.7747 28.4685 28.4876 29.7419 28.4838 31.3671C28.4801 32.981 29.7847 34.2944 31.3912 34.2907C32.9901 34.2882 34.3135 32.956 34.3035 31.3583C34.2947 29.7694 32.9963 28.476 31.4062 28.471V28.4723Z"
        fill="#D9D9D9"
      />
    </svg>
  );
};

export default SolicitudIcon;
