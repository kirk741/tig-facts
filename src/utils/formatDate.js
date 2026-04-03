export const formatDate = (dateValue, locale = 'ru-RU') => {
  if (!dateValue) return '';

  const date = new Date(dateValue);

  if (isNaN(date.getTime())) return dateValue;

  return date.toLocaleDateString(locale, {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};