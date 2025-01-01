export const chunkArray = (array, chunkSize) => {
  if (!Array.isArray(array)) throw new Error("Input must be an array");
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
};
