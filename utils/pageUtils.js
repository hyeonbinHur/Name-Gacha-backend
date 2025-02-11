const formattingPage = (pageData) => {
  console.log(pageData);
  const pageId = pageData[0].Page_ID;
  const pageExp = pageData[0].Page_Exp;
  const pageName = pageData[0].Page_Name;
  const functions = [];
  const variables = [];
  const varMap = new Set();
  const funcMap = new Set();

  for (let i = 0; i < pageData.length; i++) {
    if (pageData[i].Variable_ID) {
      if (!varMap.has(pageData[i].Variable_ID)) {
        variables.push({
          variableId: pageData[i].Variable_ID,
          variableName: pageData[i].Variable_Exp,
          variableExp: pageData[i].Variable_Name,
        });
        varMap.add(pageData[i].Variable_ID);
      }
    }
    if (pageData[i].Function_ID) {
      if (!funcMap.has(pageData[i].Function_ID)) {
        functions.push({
          functionId: pageData[i].Function_ID,
          functionName: pageData[i].Function_Name,
          functionExp: pageData[i].Function_Exp,
        });
        funcMap.add(pageData[i].Function_ID);
      }
    }
  }
  const result = {
    pageId,
    pageExp,
    pageName,
    variables,
    functions,
  };
  return result;

  /** 예시 format
   * {
    "pageId": 3,
    "pageExp": "page Exp test",
    "pageName": "page name test",
    "variables": [
        {
            "variableId": 2,
            "variableName": "test1",
            "variableExp": "test1 body"
        },
        {
            "variableId": 3,
            "variableName": "test1",
            "variableExp": "test1 body"
        }
    ],
    "functions": [
        {
            "functionId": 6,
            "functionName": "Fucntion Name test",
            "functionExp": "Function Exp Test"
        },
        {
            "functionId": 7,
            "functionName": "Fucntion Name test",
            "functionExp": "Function Exp Test"
        }
    ]
    }
   */
};
export default { formattingPage };
