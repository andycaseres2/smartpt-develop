export const formatTime = (timeString) => {
  const [hours, minutes] = timeString.split(":").map(parseFloat);
  if (hours === 1 && minutes === 0) {
    return "1 hora";
  } else if (hours === 0 && minutes === 1) {
    return "1 minuto";
  } else if (hours === 0) {
    return `${minutes} minutos`;
  } else if (minutes === 0) {
    return `${hours} horas`;
  } else {
    return `${hours} horas y ${minutes} minutos`;
  }
};
