import variableRepository from "../repository/variableRepository.js";

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
    const result = await variableRepository.create(
      variableName,
      variableExp,
      pageId
    );
    return { statusCode: 201, response: result };
  } catch (err) {
    return { statusCode: 500, response: err.message };
  }
};

const updateVariable = async (variableId, variableName, variableExp) => {
  try {
    const result = await variableRepository.update(
      variableId,
      variableName,
      variableExp
    );
    return { statusCode: 201, response: result };
  } catch (err) {
    return { statusCode: 500, response: err.message };
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
    const result = await variableRepository.deleteById(variableId);
    return { statusCode: 201, response: result };
  } catch (err) {
    return { statusCode: 501, response: err.message };
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
