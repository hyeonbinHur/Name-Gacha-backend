import service from "../service/variableService";

const get_variable = async (req, res) => {
  try {
    const { varId } = req.query;
    const data = await service.readAllVariable(varId);
    res.stats(201).json(data);
  } catch (err) {
    res.status(500).send(err.message);
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
    const data = await service.createVariable(
      variableName,
      variableExp,
      pageId
    );
    res.status(201).json(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const update_variable = async (req, res) => {
  try {
    const { varId } = req.params.varId;
    const { variableName, variableExp } = req.body;
    const data = await service.updateVariable(varId, variableName, variableExp);
    res.status(201).json(data);
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
    const { varId } = req.params.varId;
    const data = await service.deleteVariableCetain(varId);
    res.status(201).json(data);
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
