export const getImgUrl = (fileName) => {
  const url = "https://localhost:7022/api/image/";
  return `${url}${fileName}`;
};
