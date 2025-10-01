export const debugLog = (component, message, data = null) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[${component}]:`, message, data || '');
  }
};

export const debugError = (component, error) => {
  if (process.env.NODE_ENV === 'development') {
    console.error(`[${component} Error]:`, error);
  }
};
