export const formatDate = date => {
  if (!date) return "";
  const month = date.slice(5, 7);
  const day = date.slice(8, 10);
  const year = date.slice(0, 4);
  return `${month}/${day}/${year}`;
};
