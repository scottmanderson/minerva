export const percentFormat = (decimalNumber, digits = 2) => {
  return (decimalNumber * 100).toFixed(digits).toString() + "%";
};

export const apiRoot =
  process.env.REACT_APP_API_ROOT || "http://127.0.0.1:5000";
