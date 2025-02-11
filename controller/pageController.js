import pageService from "../service/pageService.js";
//이거 안쓸거같고
const get_pages = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).send(err.message);
  }
};
const get_page = async (req, res) => {
  try {
    const pageId = req.params.pageId;
    const { statusCode, response } = pageService.readPageById(pageId);
    res.status(statusCode).json(response);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const create_page = async (req, res) => {
  try {
    const { pageName, projectId, pageExp } = req.body;
    const { statusCode, response } = await pageService.createPage(
      pageName,
      pageExp,
      projectId
    );
    res.status(statusCode).json(response);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const update_page = async (req, res) => {
  try {
    const pageId = req.params.pageId;
    const { pageName, pageExp } = req.body;
    const { statusCode, response } = await pageService.updatePage(
      pageId,
      pageName,
      pageExp
    );
    res.status(statusCode).json(response);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const delete_page = async (req, res) => {
  try {
    const pageId = req.params.pageId;
    const { statusCode, response } = await pageService.deletePage(pageId);
    res.status(statusCode).json(response);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export default {
  get_page,
  get_pages,
  create_page,
  update_page,
  delete_page,
};
