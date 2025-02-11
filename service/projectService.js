import projectRepository from "../repository/projectRepository.js";
import projectUtils from "../utils/projectUtils.js";
//이건 안쓸거같음
const readAllProject = async () => {
  try {
    const result = await projectRepository.findAll();
    return result;
  } catch (err) {
    throw new Error("Failed to connect with database");
  }
};

//쿼리 조인문으로 사용 가능할듯
const readProjectByUUID = async (uuid) => {
  try {
    const result = await projectRepository.findById(uuid);
    const projects = projectUtils.formattingProject(result);
    return { statusCode: 201, response: projects };
  } catch (err) {
    return { statusCode: 400, response: err.message };
  }
};

const createProject = async (projectName, uuid) => {
  try {
    const result = await projectRepository.create(projectName, uuid);
    return { statusCode: 201, response: result };
  } catch (err) {
    return { statusCode: 500, response: err.message };
  }
};

const updateProject = async (projectId, projectName) => {
  try {
    const result = await projectRepository.update(projectName, projectId);
    return { statusCode: 201, response: result };
  } catch (err) {
    return { statusCode: 500, response: err.message };
  }
};

const deleteProject = async (projectId) => {
  try {
    const result = await projectRepository.deleteById(projectId);
    return { statusCode: 201, response: result };
  } catch (err) {
    return { statusCode: 500, response: err.message };
  }
};

export default {
  readAllProject,
  readProjectByUUID,
  createProject,
  updateProject,
  deleteProject,
};
