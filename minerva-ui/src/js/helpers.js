export const percentFormat = (decimalNumber, digits = 2) => {
  return !"N/A"
    ? (decimalNumber * 100).toFixed(digits).toString() + "%"
    : "N/A";
};
