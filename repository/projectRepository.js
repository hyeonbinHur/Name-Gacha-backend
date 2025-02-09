import connection from "../lib/db_info.js";

// 이거 필요 없고
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

// 이거 조인문 잘 확인해서 다시 작성해야하고
const findById = async (uuid) => {
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

const create = async (projectName, uuid) => {
  return new Promise((resolve, reject) => {
    const query =
      'INSERT INTO public.projects ("projectName", "userId_frk") VALUES ($1, $2) RETURNING *;';
    const values = [projectName, uuid];
    connection.query(query, values, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const update = async (projectName, projectId) => {
  return new Promise((resolve, reject) => {
    const query =
      'UPDATE public.projects SET "projectName" = $1 WHERE "projectId" = $2 RETURNING *';
    const values = [projectName, projectId];
    connection.query(query, values, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const deleteById = async (projectId) => {
  return new Promise((resolve, reject) => {
    const query =
      'DELETE FROM public.projects WHERE "projectId" = $1 RETURNING *;';
    const values = [projectId];
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
