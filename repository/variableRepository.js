import connection from "../lib/db_info.js";

const findAll = async () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM public.variables";
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
    const query = 'SELECT * FROM public.variables WHERE "variableId" = $1';
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
      'INSERT INTO public.variables ("variableName","variableExp","pageId_frk") VALUES ($1,$2,$3) RETURNING *;';
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
      'UPDATE public.variables SET "variableName" = $1, "variableExp" = $2 WHERE "variableId" = $3 RETURNING *';
    const values = [variableId, variableName, variableExp];
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
    const query =
      'DELETE FROM public.variables WHERE "variableId" = $1 RETURNING *;';
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
