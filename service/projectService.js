import projectRepository from "../repository/projectRepository.js";

//이건 안쓸거같음
const readAllProject = async () => {
  try {
    const result = projectRepository.findAll();
    return result;
  } catch (err) {
    throw new Error("Failed to connect with database");
  }
};

//쿼리 조인문으로 사용 가능할듯
const readProjectByUUID = async (uuid) => {
  try {
    const result = projectRepository.findById(uuid);
    return result;
  } catch (err) {
    throw new Error("Failed to connect with database");
  }
};

const createProject = async (projectName, uuid) => {
  try {
    console.log(projectName, uuid);
    const result = await projectRepository.create(projectName, uuid);
    return result;
  } catch (err) {
    console.log(err.message);
    throw new Error("Failed to connect with database");
  }
};

const updateProject = async (projectId, projectName) => {
  try {
    const result = await projectRepository.update(projectName, projectId);
    console.log(result);
    return result;
  } catch (err) {
    throw new Error("Failed to connect with database");
  }
};

const deleteProject = async (projectId) => {
  try {
    const result = await projectRepository.deleteById(projectId);
    return result;
  } catch (err) {
    console.log(err.message);
    throw new Error("Failed to connect with database");
  }
};

export default {
  readAllProject,
  readProjectByUUID,
  createProject,
  updateProject,
  deleteProject,
};
