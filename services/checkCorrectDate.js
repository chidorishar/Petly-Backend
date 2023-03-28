const checkCorrectDate = dateToCheck => {
  const birthDate = new Date(dateToCheck);
  const today = new Date();
  const minDate = new Date();
  minDate.setFullYear(today.getFullYear() - 15);
  if (birthDate > today || birthDate < minDate) {
    return false;
  }
  return true;
};

module.exports = checkCorrectDate;
