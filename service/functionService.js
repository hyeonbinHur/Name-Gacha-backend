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
    const result = await functionRepository.create(
      functionName,
      functionExp,
      pageId
    );
    return { statusCode: 201, response: result };
  } catch (err) {
    return { statusCode: 400, response: err.message };
  }
};

const updateFunction = async (functionId, functionName, functionExp) => {
  try {
    console.log(functionId);
    const result = await functionRepository.update(
      functionId,
      functionName,
      functionExp
    );
    return { statusCode: 201, response: result };
  } catch (err) {
    return { statusCode: 400, response: err.message };
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
    const result = await functionRepository.deleteById(functionId);
    return { statusCode: 201, response: result };
  } catch (err) {
    return { statusCode: 401, response: err.message };
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
