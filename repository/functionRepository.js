import connection from "../lib/db_info.js";

const findAll = async () => {
  return new Promise((resolve, reject) => {
    const query = "";
    connection.query(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
const findById = async (functionId) => {
  return new Promise((resolve, reject) => {
    const query = "";
    const values = [functionId];
    connection.query(query, values, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
const create = async (functionName, functionExp, pageId) => {
  return new Promise((resolve, reject) => {
    const query = "";
    const values = [functionName, functionExp, pageId];
    connection.query(query, values, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
const update = async (functionId, functionName, functionExp) => {
  return new Promise((resolve, reject) => {
    const query = "";
    const values = [functionId, functionName, functionExp];
    connection.query(query, values, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const deleteById = async (functionId) => {
  return new Promise((resolve, reject) => {
    const query = "";
    const values = [functionId];
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
  findAll,
  findById,
  create,
  update,
  deleteById,
};
