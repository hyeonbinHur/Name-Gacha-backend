import Service from "../service/functionService.js";
const get_function = async (req, res) => {
  try {
    const { functionId } = req.params.functionId;
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const get_functions = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const create_function = async (req, res) => {
  try {
    const { pageId, functionName, functionExp } = req.body;
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const update_function = async (req, res) => {
  try {
    const { functionId } = req.params.functionId;
    const { functionExp, functionName } = req.body;
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const delete_function_inpage = async (req, res) => {
  try {
    const { pageId } = req.params.pageId;
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const delete_function_certain = async (req, res) => {
  try {
    const { functionId } = req.params.functionId;
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export default {
  get_function,
  get_functions,
  create_function,
  update_function,
  delete_function_inpage,
  delete_function_certain,
};
