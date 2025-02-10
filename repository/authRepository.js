import connection from "../lib/db_info";

const signInUserByCredentials = async (userId, userPassword) => {
  return new Promise((resolve, reject) => {
    const query = "";
    const values = [userId, userPassword];
    connection.query(query, values, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
const createUser = async (userId, userPassword) => {
  return new Promise((resolve, reject) => {
    const query = "";
    const values = [userId, userPassword];
    connection.query(query, values, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
const updateUserById = async (userId, userOldPassword, userNewPassword) => {
  return new Promise((resolve, reject) => {
    const query = "";
    const values = [userId, userOldPassword, userNewPassword];
    connection.query(query, values, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const findUserByUserId = async (userId) => {
  return new Promise((resolve, reject) => {
    const query = "";
    const values = [userId];
    connection.query(query, values, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const findUserByUUID = async (uuid) => {
  return new Promise((resolve, reject) => {
    const query = "";
    const values = [uuid];
    connection.query(query, values, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

export default {
  signInUserByCredentials,
  createUser,
  updateUserById,
  findUserByUserId,
  findUserByUUID,
};
