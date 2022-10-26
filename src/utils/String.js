export const emailIsvalid = (email) => {
  // eslint-disable-next-line no-useless-escape
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  return regex.test(email);
};

export const isContainNumberAndSpecialCharacter = (value) => {
  // eslint-disable-next-line no-useless-escape
  const specialChars = /[`!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?~]/;

  return specialChars.test(value);
};

export const isContainNumber = (value) => {
  const hasNumber = /\d/;

  return hasNumber.test(value);
};

export const isMobileNumberValid = (mobile) => {
  const format = /([0]\d{3}\s?\d{3}\s?\d{4})/;

  return mobile.match(format);
};

export const displayStringMonth = (noMonths) => {
  if (+noMonths > 1) {
    return noMonths + " " + "months";
  }

  return noMonths + " " + "month";
};
