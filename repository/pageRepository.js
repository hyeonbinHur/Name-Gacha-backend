import connection from "../lib/db_info.js";

// //이거 필요 없고
// const findAll = async () => {
//   return new Promise((resolve, reject) => {
//     const query = "";
//     connection.query(query, (err, result) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(result);
//       }
//     });
//   });
// };

// 이거 조인문 잘써서 페이지 > 변수, 함수 모두 보여주기
const findById = async (pageId) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT 
    p.Page_ID, p.Page_Name, p.Page_Exp, 
    v.Variable_ID, v.Variable_Name, v.Variable_Exp, 
    f.Function_ID, f.Function_Name, f.Function_Exp 
    FROM Page p
    LEFT JOIN Variable v ON p.Page_ID = v.Page_ID
    LEFT JOIN \`Function\` f ON p.Page_ID = f.Page_ID
    WHERE p.Page_ID = ?`;
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
    const query =
      "INSERT INTO Page (Page_Name, Page_Exp, Project_ID) VALUES (?, ?, ?)";
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
    const query =
      "UPDATE Page SET Page_Name = ?, Page_Exp = ? WHERE Page_ID = ?";
    const values = [pageName, pageExp, pageId];
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
    const query = `DELETE p, v, f FROM Page p 
      LEFT JOIN Variablev ON p.Page_ID = v.Page_ID 
      LEFT JOIN \`Function\` f ON p.Page_ID = f.Page_ID 
      WHERE p.Page_ID = ?`;
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
  findById,
  create,
  update,
  deleteById,
};
