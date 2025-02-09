import pageRepository from "../repository/pageRepository";

const readAllPages = async () => {
  try {
    const result = await pageRepository.findAll();
    return result;
  } catch (err) {
    throw new Error("Failed to connect with database");
  }
};

const readPageById = async (pageId) => {
  try {
    const result = await pageRepository.findById(pageId);
    return result;
  } catch (err) {
    throw new Error("Failed to connect with database");
  }
};

const createPage = async (pageName, pageExp, projectId) => {
  try {
    const result = await pageRepository.createPage(
      pageName,
      pageExp,
      projectId
    );
    return result;
  } catch (err) {
    throw new Error("Failed to connect with database");
  }
};

const updatePage = async (pageId, pageName, pageExp) => {
  try {
    const result = await pageRepository.update(pageId, pageName, pageExp);
    return result;
  } catch (err) {
    throw new Error("Failed to connect with database");
  }
};

const deletePage = async (pageId) => {
  try {
    const result = await pageRepository.deleteById(pageId);
    return result;
  } catch (err) {
    throw new Error("Failed to connect with database");
  }
};

export default {
  readAllPages,
  readPageById,
  createPage,
  updatePage,
  deletePage,
};
