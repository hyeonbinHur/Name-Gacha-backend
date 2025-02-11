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
    const query = `SELECT 
    pr.Project_ID, pr.Project_Name,
    p.Page_ID, p.Page_Name, p.Page_Exp, 
    v.Variable_ID, v.Variable_Name, v.Variable_Exp, 
    f.Function_ID, f.Function_Name, f.Function_Exp 
    FROM Project pr 
    LEFT JOIN Page p ON pr.Project_ID = p.Project_ID 
    LEFT JOIN Variable v ON p.Page_ID = v.Page_ID
    LEFT JOIN \`Function\` f ON p.Page_ID = f.Page_ID
    WHERE pr.User_UUID = ?`;
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
    const query = "INSERT INTO Project (Project_Name, User_UUID) VALUES (?, ?)";
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
    const query = "UPDATE Project SET Project_Name = ? WHERE Project_ID = ?";
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
//쿼리 조인문으로 수정해서 project > page > variable, function 삭제해야함
const deleteById = async (projectId) => {
  return new Promise((resolve, reject) => {
    const query = `DELETE pr, p, v, f FROM Project pr 
    LEFT JOIN Page p ON pr.Project_ID = p.Project_ID 
    LEFT JOIN Variable v ON p.Page_ID = v.Page_ID 
    LEFT JOIN \`Function\` f ON p.Page_ID = f.Page_ID 
    WHERE pr.Project_ID = ?`;
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
