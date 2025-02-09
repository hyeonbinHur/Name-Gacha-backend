import functionRepository from "../repository/functionRepository.js";

const readAllfunction = async () => {
  try {
    const result = functionRepository.findAll();
    return result;
  } catch (err) {
    throw new Error("Failed to connect with database");
  }
};

const readFunction = async (functionId) => {
  try {
    const result = functionRepository.findById(functionId);
    return result;
  } catch (err) {
    throw new Error("Failed to connect with database");
  }
};

const createFunction = async (functionName, functionExp, pageId) => {
  try {
    const result = functionRepository.create(functionName, functionExp, pageId);
    return result;
  } catch (err) {
    throw new Error("Failed to connect with database");
  }
};

const updateFunction = async (functionId, functionName, functionExp) => {
  try {
    const result = functionRepository.update(
      functionId,
      functionName,
      functionExp
    );
    return result;
  } catch (err) {
    throw new Error("Failed to connect with database");
  }
};

const deleteFunctionInPage = async (pageId) => {
  try {
    const result = functionRepository.deleteAll(pageId);
    return result;
  } catch (err) {
    throw new Error("Failed to connect with database");
  }
};

const deleteFunctionCetain = async (functionId) => {
  try {
    const result = functionRepository.deleteById(functionId);
    return result;
  } catch (err) {
    throw new Error("Failed to connect with database");
  }
};

export default {
  readAllfunction,
  readFunction,
  createFunction,
  updateFunction,
  deleteFunctionInPage,
  deleteFunctionCetain,
};
