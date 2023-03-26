export const formatCurrency = (money) => {
  return "Php " + money.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

export const getDiscount = (amount, percent) => {
  const percentage = parseFloat(percent) / 100;
  return parseFloat(amount) * parseFloat(percentage);
};
