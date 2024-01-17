export const getColor = (currentPath) => {
  let result = {};

  if (currentPath === "/planeacion") {
    result = {
      hex: "#D93535",
      border: "border-primary-red-600",
      bg: "bg-primary-red-600",
    };
  } else if (currentPath === "/solicitudes") {
    result = {
      hex: "#FAA500",
      border: "border-primary-yellow-600",
      bg: "bg-primary-yellow-600",
    };
  } else if (currentPath === "/solicitudes/informacion") {
    result = {
      hex: "#75EED1",
      border: "border-primary-lightblue-600",
      bg: "bg-primary-lightblue-600",
    };
  } else if (currentPath === "/presupuesto") {
    result = {
      hex: "#2961CE",
      border: "border-primary-blue-600",
      bg: "bg-primary-blue-600",
    };
  } else if (currentPath === "/dashboard") {
    result = {
      hex: "#6528E5",
      border: "border-primary-purple-600",
      bg: "bg-primary-purple-600",
    };
  }

  return result;
};
