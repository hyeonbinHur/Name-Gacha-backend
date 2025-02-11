import service from "../service/variableService.js";

const get_variable = async (req, res) => {
  try {
    const { varId } = req.query;
    const data = await service.readAllVariable(varId);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).send(err.ㅈmessage);
  }
};

const get_variables = async (req, res) => {
  try {
    const data = await service.readVariable();
    res.status(201).json(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const create_variable = async (req, res) => {
  try {
    const { variableName, variableExp, pageId } = req.body;
    const { statusCode, response } = await service.createVariable(
      variableName,
      variableExp,
      pageId
    );
    res.status(statusCode).json(response);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const update_variable = async (req, res) => {
  try {
    const varId = req.params.varId;
    const { variableName, variableExp } = req.body;
    const { statusCode, response } = await service.updateVariable(
      varId,
      variableName,
      variableExp
    );
    res.status(statusCode).json(response);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const delete_variable_inpage = async (req, res) => {
  try {
    const { pageId } = req.params.pageId;
    const data = await service.deleteVariableInPage(pageId);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const delete_variable_certain = async (req, res) => {
  try {
    const varId = req.params.varId;
    const { statusCode, response } = await service.deleteVariableCetain(varId);
    res.status(statusCode).json(response);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export default {
  get_variable,
  get_variables,
  create_variable,
  update_variable,
  delete_variable_inpage,
  delete_variable_certain,
};
