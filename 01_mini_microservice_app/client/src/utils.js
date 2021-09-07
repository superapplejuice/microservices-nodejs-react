export const capitalizeFirstLetter = string => {
  return `${string[0].toUpperCase()}${string.substr(1).toLowerCase()}`;
};

export const generateNetworkError = error => {
  const defaultErrMessage = ', please try again later';
  return (
    capitalizeFirstLetter(`${error.message}${defaultErrMessage}`) ||
    `Something went wrong${defaultErrMessage}`
  );
};
