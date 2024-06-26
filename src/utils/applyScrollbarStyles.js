export const applyScrollbarStyles = (colorHex) => {
  const scrollbarStyle = `
    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
      background-color: transparent;
    }

    ::-webkit-scrollbar-track {
      background-color: transparent;
    }

    ::-webkit-scrollbar-thumb {
      background-color: ${colorHex};
      border-radius: 4px;
    }
  `;

  const styleElement = document.createElement("style");
  styleElement.innerHTML = scrollbarStyle;
  document.head.appendChild(styleElement);
};
