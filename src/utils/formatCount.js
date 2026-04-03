export const formatCount = (count) => {
  if (!count || count <= 0) return '';

  if (count >= 1000000) {
    return (count / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }

  if (count >= 1000) {
    return (count / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  }

  return count.toString();
};
