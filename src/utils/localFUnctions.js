const CryptoJS = require("crypto-js");

export const encryptWithAES = (text) => {
  const passphrase = "123";
  const value = CryptoJS.AES.encrypt(JSON.stringify(text), passphrase).toString();

  return encodeURIComponent(value);
};

export const decryptWithAES = (ciphertext) => {
  const passphrase = "123";
  const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return decodeURIComponent(originalText);
};

export const formatNumber = (value) => {
  const format = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "USD",
  }).format(value);
  return format;
};

export const DateTimeFormatLocal = (value) => {
  const localDateString = new Intl.DateTimeFormat("en-IN", {
    dateStyle: "full",
    timeStyle: "short",
  }).format;
  const mee = localDateString(new Date(value));
  return mee;
};

export const loggedInUser = async () => {
  var token;
  if (typeof window !== null && typeof window !== "undefined") {
    const mee = await JSON.parse(window.localStorage.getItem("user_log"));
    token = mee?.data;

    return token;
  }
};
