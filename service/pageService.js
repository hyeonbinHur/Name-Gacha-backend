import pageRepository from "../repository/pageRepository.js";

// const readAllPages = async () => {
//   try {
//     const result = await pageRepository.findAll();
//     return result;
//   } catch (err) {
//     throw new Error("Failed to connect with database");
//   }
// };

const readPageById = async (pageId) => {
  try {
    const result = await pageRepository.findById(pageId);
    return { statusCode: 201, response: result };
  } catch (err) {
    return { statusCode: 500, response: err.message };
  }
};

const createPage = async (pageName, pageExp, projectId) => {
  try {
    const result = await pageRepository.create(pageName, pageExp, projectId);
    return { statusCode: 201, response: result };
  } catch (err) {
    return { statusCode: 500, response: err.message };
  }
};

const updatePage = async (pageId, pageName, pageExp) => {
  try {
    const result = await pageRepository.update(pageId, pageName, pageExp);
    return { statusCode: 201, response: result };
  } catch (err) {
    return { statusCode: 500, response: err.message };
  }
};

const deletePage = async (pageId) => {
  try {
    const result = await pageRepository.deleteById(pageId);
    return { statusCode: 201, response: result };
  } catch (err) {
    console.log(err.message);
    return { statusCode: 500, response: err.message };
  }
};

export default {
  // readAllPages,
  readPageById,
  createPage,
  updatePage,
  deletePage,
};
