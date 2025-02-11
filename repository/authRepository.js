import connection from "../lib/db_info.js";

const signInUserByCredentials = async (userId) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM User WHERE User_ID = ?";
    const valsues = [userId];
    connection.query(query, valsues, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const createUser = async (userId, userPassword, salt) => {
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO User (User_ID, User_Password, Salt) VALUES (?,?,?)";
    const values = [userId, userPassword, salt];
    connection.query(query, values, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const updateUserById = async (uuid, userNewPassword) => {
  return new Promise((resolve, reject) => {
    const query = "UPDATE USER SET = userPassword = ? WHERE uuid = ?";
    const values = [userNewPassword, uuid];
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
    const query = "SELECT * FROM User WHERE User_ID = ?";
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
    const query = "SELECT * FROM User WHERE User_UUID = ?";
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
