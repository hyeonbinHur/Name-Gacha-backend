import connection from "../lib/db_info.js";

// 안쓸거같고
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

//안쓸거 같고
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
    const query =
      "INSERT INTO `Function` (Function_Name, Function_Exp, Page_ID) VALUES (?, ?, ?)";
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
    const query =
      "UPDATE `Function` SET Function_Name = ?, Function_Exp = ? WHERE Function_ID = ?";
    const values = [functionName, functionExp, functionId];
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
    const query = "DELETE FROM `Function` WHERE Function_ID = ?";
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
