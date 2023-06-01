import Bcrypt from "bcrypt";

const salt = 10;

async function getErrorMessage(value) {
  try {
    if (value) {
      return value?.response?.data?.message;
    }
  } catch (error) {
    return error?.response?.data?.message;
  }
}

function encryptPassword(password) {
  Bcrypt.hash(password, salt)
    .then((hash) => {
      const hashed = hash;
      return hashed;
    })
    .catch((error) => {
      console.log(error);
      return getErrorMessage(error);
    });
}

function validatePassword(password) {
  Bcrypt.compare(password, salt)
    .then((res) => {
      console.log(res); // return true
    })
    .catch((err) => console.error(err.message));
}

export { encryptPassword, validatePassword, getErrorMessage };
