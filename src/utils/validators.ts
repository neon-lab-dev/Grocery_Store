const onlyStringAllowed = (value: string): boolean => {
  const regex = /^[a-zA-Z]*$/gm;
  return value ? regex.test(value.trim()) : false;
};

const onlyNumberAllowed = (value: string): boolean => {
  const regex = /^[0-9]*$/gm;
  return value ? regex.test(value.trim()) : false;
};

const isPhoneNumber = (value: string): boolean => {
  const regex = /^[0-9]{10}$/gm;
  return value ? regex.test(value.trim()) : false;
};

const isEmail = (value: string): boolean => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-z0-9.-]+\.[a-zA-z]{2,4}$/gm;
  return value ? regex.test(value.trim()) : false;
};

const onlyStringAndNumberWithSpaceAllowed = (value: string): boolean => {
  const regex = /^[a-zA-Z0-9 ]*$/gm;
  return value ? regex.test(value.trim()) : false;
};

const isAddress = (value: string): boolean => {
  const regex = /^[\sa-zA-Z0-9 .,/+&]*$/gm;
  return value ? regex.test(value.trim()) : false;
};

const stringWithSpace = (value: string): boolean => {
  const regex = /^[a-zA-Z ]+$/gm;
  return value ? regex.test(value.trim()) : false;
};

const stringDigitWithSpace = (value: string): boolean => {
  const regex = /^[a-zA-Z0-9 ]*$/gm;
  return value ? regex.test(value.trim()) : false;
};

const stringDigitWithSpaceAndComma = (value: string): boolean => {
  const regex = /^[a-zA-Z0-9, ]*$/gm;
  return value ? regex.test(value.trim()) : false;
};

export default {
  onlyStringAllowed,
  onlyNumberAllowed,
  isEmail,
  onlyStringAndNumberWithSpaceAllowed,
  isAddress,
  isPhoneNumber,
  stringWithSpace,
  stringDigitWithSpace,
  stringDigitWithSpaceAndComma,
};
