const formatDate = (dateString) => {
  const options = {year: 'numeric', month: 'long'};
  dateString = dateString.slice(0, 10);
  const dateObj = new Date(dateString);
  const formatted = dateObj.toLocaleDateString('en-US', options);
  return formatted;
}

module.exports = {
  formatDate,
}