// fetchInterceptor.js
let originalFetch = window.fetch;

export const fetch = async (url, options) => {
  // Aquí puedes hacer lo que necesites antes de realizar la solicitud original
  console.log("Interceptando fetch:", url);

  // Realiza la solicitud original utilizando la función fetch original
  const response = await originalFetch(url, options);

  // Aquí puedes hacer lo que necesites después de la solicitud original
  console.log("Fetch completado:", url);

  return response;
};

export const setOriginalFetch = (fetchFunction) => {
  originalFetch = fetchFunction;
};
