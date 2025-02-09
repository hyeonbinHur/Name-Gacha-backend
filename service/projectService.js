import projectRepository from "../repository/projectRepository.js";

const readAllProject = async () => {
  try {
    const result = projectRepository.findAll();
    return result;
  } catch (err) {
    throw new Error("Failed to connect with database");
  }
};
const readProject = async (uuid) => {
  try {
    const result = projectRepository.findById(uuid);
    return result;
  } catch (err) {
    throw new Error("Failed to connect with database");
  }
};
const createProject = async (projectName, uuid) => {
  try {
    const result = projectRepository.create(projectName, uuid);
    return result;
  } catch (err) {
    throw new Error("Failed to connect with database");
  }
};
const updateProject = async (projectName, projectId) => {
  try {
    const result = projectRepository.update(projectName, projectId);
    return result;
  } catch (err) {
    throw new Error("Failed to connect with database");
  }
};
const deleteProject = async (projectId) => {
  try {
    const result = projectRepository.deleteById(projectId);
    return result;
  } catch (err) {
    throw new Error("Failed to connect with database");
  }
};

export default {
  readAllProject,
  readProject,
  createProject,
  updateProject,
  deleteProject,
};
