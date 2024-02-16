export const getImgUrl = (fileName) => {
  const url = "https://localhost:7022/api/image/";
  return `${url}${fileName}`;
};

export const formatMoney = (money) => {
  return money.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
};
