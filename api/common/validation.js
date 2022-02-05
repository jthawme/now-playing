const glpn = require("google-libphonenumber");
const validator = require("email-validator");

const PNF = glpn.PhoneNumberFormat;
const phoneUtil = glpn.PhoneNumberUtil.getInstance();

const validateSchema = (obj, schema) => {
  const failed = schema.filter(item => {
    if (typeof item === "string") {
      return !(item in obj) || obj[item].trim() === "";
    }

    const { key, validator } = item;

    if (!validator) {
      return !(item in obj) || obj[item].trim() === "";
    }

    return !validator(obj[key]);
  });

  return failed.length === 0
    ? true
    : failed.map(item => {
        const key = typeof item === "string" ? item : item.key;
        const value = typeof item === "string" ? item : obj[item.key];

        return {
          key,
          message:
            typeof item.error !== "undefined" ? item.error(value) : "missing"
        };
      });
};

const minMaxValidation = (max, min = 0) => ({
  validator: val => {
    return val && val.split(" ").length >= min && val.split(" ").length <= max;
  },
  error: val => {
    if (!val) {
      return "missing";
    }

    if (val.split(" ").length < min) {
      return "Too short";
    }

    return "Too long";
  }
});

const isValidPhoneNumber = _phoneNumber => {
  try {
    const phoneNumber = phoneUtil.parseAndKeepRawInput(_phoneNumber, "US");

    if (!phoneUtil.isValidNumber(phoneNumber)) {
      return false;
    }

    return {
      number: _phoneNumber,
      formatted: phoneUtil.format(phoneNumber, PNF.E164)
    };
  } catch (e) {
    return false;
  }
};

const isValidEmailAddress = email => {
  if (!validator.validate(email)) {
    return false;
  }

  // if (email.match(/\+/)) {
  //   reject(new Error("Cannot use emails with '+'"));
  //   return;
  // }

  return true;
};

// const messageSchema = [
//   "singlekey",
//   {
//     key: "customvalidator",
//     validator: val => isValidEmailAddress(val),
//   },
//   {
//     key: "custommessage",
//     validator: val => isValidPhoneNumber(val),
//     error: val => {
//       // if the value isnt here return missing
//       if (!val) {
//         return "missing";
//       }
//       // if it is, it must be invalid
//       return "Invalid number";
//     }
//   },
//   {
//     key: "minmaxcheck",
//     ...minMaxValidation(300, 50)
//   },
// ];

module.exports = {
  validateSchema,
  minMaxValidation,
  isValidPhoneNumber,
  isValidEmailAddress
};
