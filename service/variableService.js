import variableRepository from "../repository/variableRepository";

const readAllVariable = async () => {
  try {
    const result = variableRepository.findAll();
    return result;
  } catch (err) {
    throw new Error("Failed to connect with database");
  }
};

const readVariable = async (variableId) => {
  try {
    const result = variableRepository.findById(variableId);
    return result;
  } catch (err) {
    throw new Error("Failed to connect with database");
  }
};

const createVariable = async (variableName, variableExp, pageId) => {
  try {
    const result = variableRepository.create(variableName, variableExp, pageId);
    return result;
  } catch (err) {
    throw new Error("Failed to connect with database");
  }
};

const updateVariable = async (variableId, variableName, variableExp) => {
  try {
    const result = variableRepository.update(
      variableId,
      variableName,
      variableExp
    );
    return result;
  } catch (err) {
    throw new Error("Failed to connect with database");
  }
};

const deleteVariableInPage = async (pageId) => {
  try {
    const result = variableRepository.deleteAll(pageId);
    return result;
  } catch (err) {
    throw new Error("Failed to connect with database");
  }
};

const deleteVariableCetain = async (variableId) => {
  try {
    const result = variableRepository.deleteById(variableId);
    return result;
  } catch (err) {
    throw new Error("Failed to connect with database");
  }
};

export default {
  readAllVariable,
  readVariable,
  createVariable,
  updateVariable,
  deleteVariableInPage,
  deleteVariableCetain,
};
