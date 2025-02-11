import connection from "../lib/db_info.js";

const findAll = async () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM Variable";
    connection.query(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const findById = async (variableId) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM Variable WHERE Variable_ID = ?";
    const values = [variableId];
    connection.query(query, values, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const create = async (variableName, variableExp, pageId) => {
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO Variable (Variable_Name, Variable_Exp, Page_ID) VALUES (?, ?, ?)";
    const values = [variableName, variableExp, pageId];
    connection.query(query, values, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const update = async (variableId, variableName, variableExp) => {
  return new Promise((resolve, reject) => {
    const query =
      "UPDATE Variable SET Variable_Name = ?, Variable_Exp = ? WHERE Variable_ID = ?";
    const values = [variableName, variableExp, variableId];
    connection.query(query, values, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const deleteAll = async (pageId) => {
  return new Promise((resolve, reject) => {
    const query =
      'DELETE FROM public.variables WHERE "pageId_frk" = $1 RETURNING *;';
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

const deleteById = async (variableId) => {
  return new Promise((resolve, reject) => {
    const query = "DELETE FROM Variable WHERE Variable_ID = ?";
    const values = [variableId];
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
  deleteAll,
  deleteById,
};
