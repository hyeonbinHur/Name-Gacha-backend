const formattingProject = (projectData) => {
  if (projectData.length === 0) return {};
  const projectMap = new Map();
  const pageMap = new Map();
  projectData.forEach((item) => {
    // 페이지 처리
    if (!projectMap.has(item.Project_ID)) {
      const newProject = {
        projectId: item.Project_ID,
        projectName: item.Project_Name,
        pages: [],
      };
      projectMap.set(item.Project_ID, newProject);
    }
    const currentProject = projectMap.get(item.Project_ID);
    if (item.Page_ID && !pageMap.has(item.Page_ID)) {
      const newPage = {
        pageId: item.Page_ID,
        pageName: item.Page_Name,
        variables: [],
        functions: [],
        varSet: new Set(), // 페이지별 변수 중복 체크
        funcSet: new Set(), // 페이지별 함수 중복 체크
      };
      pageMap.set(item.Page_ID, newPage);
      currentProject.pages.push(newPage);
    }
    const currentPage = pageMap.get(item.Page_ID);
    // 변수 처리
    if (
      currentPage &&
      item.Variable_ID &&
      !currentPage.varSet.has(item.Variable_ID)
    ) {
      currentPage.variables.push({
        variableId: item.Variable_ID,
        variableName: item.Variable_Name,
      });
      currentPage.varSet.add(item.Variable_ID);
    }
    // 함수 처리
    if (
      currentPage &&
      item.Function_ID &&
      !currentPage.funcSet.has(item.Function_ID)
    ) {
      currentPage.functions.push({
        functionId: item.Function_ID,
        functionName: item.Function_Name,
      });
      currentPage.funcSet.add(item.Function_ID);
    }
  });
  const project = [];
  for (let key of projectMap) {
    project.push(projectMap.get(key[0]));
  }
  return project;
};
export default {
  formattingProject,
};
