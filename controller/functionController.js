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
    const data = await functionService.createFunction(
      functionName,
      functionExp,
      pageId
    );
    res.status(201).send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const update_function = async (req, res) => {
  try {
    const { functionId } = req.params.functionId;
    const { functionExp, functionName } = req.body;
    const data = await functionService.updateFunction(
      functionId,
      functionName,
      functionExp
    );
    return data;
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const delete_function_inpage = async (req, res) => {
  try {
    const { pageId } = req.params.pageId;
    const data = functionService.deleteFunctionInPage(pageId);
    return data;
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const delete_function_certain = async (req, res) => {
  try {
    const { functionId } = req.params.functionId;
    const data = functionService.deleteFunctionCetain(functionId);
    return data;
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
