<<<<<<< HEAD
// fetchInterceptor.js
let originalFetch = window.fetch;

export const fetch = async (url, options) => {
  const response = await originalFetch(url, options);
  return response;
};

export const setOriginalFetch = (fetchFunction) => {
  originalFetch = fetchFunction;
};
=======
// fetchInterceptor.js
let originalFetch = window.fetch;

export const fetch = async (url, options) => {
  const response = await originalFetch(url, options);
  return response;
};

export const setOriginalFetch = (fetchFunction) => {
  originalFetch = fetchFunction;
};
>>>>>>> b7ecf2887956819aed0507d5ec357a78c09ff6b2
