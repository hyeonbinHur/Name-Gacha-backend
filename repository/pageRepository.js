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
const findById = async (pageId) => {
  return new Promise((resolve, reject) => {
    const query = "";
    const values = [pageId];
    connection.query(query, values, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
const create = async (pageName, pageExp, projectId) => {
  return new Promise((resolve, reject) => {
    const query = "";
    const values = [pageName, pageExp, projectId];
    connection.query(query, values, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
const update = async (pageId, pageName, pageExp) => {
  return new Promise((resolve, reject) => {
    const query = "";
    const values = [pageId, pageName, pageExp];
    connection.query(query, values, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
const deleteById = async (pageId) => {
  return new Promise((resolve, reject) => {
    const query = "";
    const values = [pageId];
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
