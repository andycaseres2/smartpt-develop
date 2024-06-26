// fetchInterceptor.js
let originalFetch = window.fetch;

export const fetch = async (url, options) => {
  const response = await originalFetch(url, options);
  return response;
};

export const setOriginalFetch = (fetchFunction) => {
  originalFetch = fetchFunction;
};
