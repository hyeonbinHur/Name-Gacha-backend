import Service from "../service/pageService";
const get_page = async (req, res) => {
  try {
    const { pageId } = req.params.pageId;
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const get_pages = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const create_page = async (req, res) => {
  try {
    const { pageName, projectId, pageExp } = req.body;
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const update_page = async (req, res) => {
  try {
    const { pageId } = req.params.pageId;
    const { pageName, pageExp } = req.body;
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const delete_page = async (req, res) => {
  try {
    const { pageId } = req.params.pageId;
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
