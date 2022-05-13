export const truncate = (str, len) => {
  if (!str) {
    return 'No str available';
  }

  if (str.length > len) {
    return str.substring(0, len) + '...';
  } else {
    return str;
  }
};
