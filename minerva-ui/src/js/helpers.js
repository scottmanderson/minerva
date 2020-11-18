export const percentFormat = (decimalNumber, digits = 2) => {
  return (decimalNumber * 100).toFixed(digits).toString() + "%";
};
