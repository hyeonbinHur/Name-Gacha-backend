import functionService from "../service/functionService.js";

const get_function = async (req, res) => {
  try {
    const { functionId } = req.params.functionId;
    const data = await functionService.readFunction(functionId);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const get_functions = async (req, res) => {
  try {
    const data = await functionService.readAllfunction();
    res.status(201).json(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const create_function = async (req, res) => {
  try {
    const { pageId, functionName, functionExp } = req.body;
    const { statusCode, response } = await functionService.createFunction(
      functionName,
      functionExp,
      pageId
    );
    res.status(statusCode).send(response);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const update_function = async (req, res) => {
  try {
    const functionId = req.params.functionId;
    const { functionExp, functionName } = req.body;
    const { statusCode, response } = await functionService.updateFunction(
      functionId,
      functionName,
      functionExp
    );
    res.status(statusCode).json(response);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const delete_function_inpage = async (req, res) => {
  try {
    const functionId = req.params.functionId;
    const { statusCode, response } = await functionService.deleteFunctionInPage(
      pageId
    );
    return data;
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const delete_function_certain = async (req, res) => {
  try {
    const functionId = req.params.functionId;
    const { statusCode, response } = await functionService.deleteFunctionCetain(
      functionId
    );
    res.status(statusCode).json(response);
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
