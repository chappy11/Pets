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

export const isInvalidMobileNumber = (mobile) => {
  const isMobileStartZero = mobile[0] !== "0";
  const isSecondMobileNumberIsNine = mobile[1] !== "9";
  const isElevenDigit = mobile.length !== 11;
  return isMobileStartZero && isSecondMobileNumberIsNine && isElevenDigit;
};

export const displayStringMonth = (noMonths) => {
  if (+noMonths > 1) {
    return noMonths + " " + "months";
  }

  return noMonths + " " + "month";
};
