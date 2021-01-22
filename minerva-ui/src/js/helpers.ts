export const percentFormat = (decimalNumber: number, digits = 2) => {
  return decimalNumber
    ? (decimalNumber * 100).toFixed(digits).toString() + "%"
    : "N/A";
};

export const apiRoot =
  process.env.REACT_APP_API_ROOT || "http://127.0.0.1:5000";
