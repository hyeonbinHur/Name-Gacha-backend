import service from "../service/projectService";

const get_projects = async (req, res) => {
  try {
    const data = service.readAllProject();
    res.status(201).json(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const get_project = async (req, res) => {
  try {
    const { uuid } = req.query;
    const data = service.readProject(uuid);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const create_project = async (req, res) => {
  try {
    const { projectName, uuid } = req.body;
    const data = service.createProject(projectName, uuid);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const update_project = async (req, res) => {
  try {
    const { projectName } = req.body;
    const { projectId } = req.params.projectId;
    const data = service.updateProject(projectId, projectName);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const delete_project = async (req, res) => {
  try {
    const { projectId } = req.params.projectId;
    const data = service.deleteProject(projectId);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export default {
  get_projects,
  get_project,
  create_project,
  update_project,
  delete_project,
};
