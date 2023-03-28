const possibleAge = {
  pet: 15,
  human: 100,
};

const checkCorrectDate = (dateToCheck, creature) => {
  const dateCorrection = possibleAge[creature];
  const birthDate = new Date(dateToCheck);
  const today = new Date();
  const minDate = new Date();
  minDate.setFullYear(today.getFullYear() - dateCorrection);
  if (birthDate > today || birthDate < minDate) {
    return false;
  }
  return true;
};

module.exports = checkCorrectDate;
