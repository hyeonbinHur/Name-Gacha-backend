import express from 'express';
import dbClient from '../db/dbClient.js';
const router = express.Router();

// Get a project with all related pages, variables, and functions
router.get('/all/projects/:id', (req, res) => {
    const projectId = req.params.id;
    const query = `
SELECT 
p."projectId", p."projectName", 
pa."pageId", pa."pageName", 
v."variableId", v."variableName", 
f."functionId", f."functionName"
FROM 
projects p
LEFT JOIN 
pages pa ON p."projectId" = pa."projectId"
LEFT JOIN 
variables v ON pa."pageId" = v."pageId_fk"
LEFT JOIN 
functions f ON pa."pageId" = f."pageId_fk"
WHERE 
p."projectId" = $1;
    `;
    dbClient.query(query, [projectId], (err, queryRes) => {
        if (err) {
            console.error(err);
            res.status(500).send('Failed to retrieve data');
        } else {
            const data = {
                projectId: queryRes.rows[0]?.projectId,
                projectName: queryRes.rows[0]?.projectName,
                pages: [],
            };
            queryRes.rows.forEach((row) => {
                let page = data.pages.find((p) => p.pageId === row.pageId);
                if (!page) {
                    page = {
                        pageId: row.pageId,
                        pageName: row.pageName,
                        variables: [],
                        functions: [],
                    };
                    data.pages.push(page);
                }
                if (
                    row.variableId &&
                    !page.variables.some((v) => v.variableId === row.variableId)
                ) {
                    page.variables.push({
                        variableId: row.variableId,
                        variableName: row.variableName,
                        variableExp: row.variableExp,
                    });
                }
                if (
                    row.functionId &&
                    !page.functions.some((f) => f.functionId === row.functionId)
                ) {
                    page.functions.push({
                        functionId: row.functionId,
                        functionName: row.functionName,
                        functionExp: row.functionExp,
                    });
                }
            });

            res.json(data);
        }
    });
});

router.get('/all/projects', (req, res) => {
    const query = `
SELECT 
p."projectId", p."projectName", 
pa."pageId", pa."pageName", 
v."variableId", v."variableName", 
f."functionId", f."functionName"
FROM 
projects p
LEFT JOIN 
pages pa ON p."projectId" = pa."projectId"
LEFT JOIN 
variables v ON pa."pageId" = v."pageId_fk"
LEFT JOIN 
functions f ON pa."pageId" = f."pageId_fk"
ORDER BY p."projectId", pa."pageId", v."variableId", f."functionId"
    `;

    dbClient.query(query, (err, queryRes) => {
        if (err) {
            console.error(err);
            res.status(500).send('Failed to retrieve data');
        } else {
            const projects = {};
            queryRes.rows.forEach((row) => {
                if (!projects[row.projectId]) {
                    projects[row.projectId] = {
                        projectId: row.projectId,
                        projectName: row.projectName,
                        pages: [],
                    };
                }

                let project = projects[row.projectId];
                let page = project.pages.find((p) => p.pageId === row.pageId);

                if (!page && row.pageId) {
                    page = {
                        pageId: row.pageId,
                        pageName: row.pageName,
                        variables: [],
                        functions: [],
                    };
                    project.pages.push(page);
                }

                if (page) {
                    if (
                        row.variableId &&
                        !page.variables.find(
                            (v) => v.variableId === row.variableId
                        )
                    ) {
                        page.variables.push({
                            variableId: row.variableId,
                            variableName: row.variableName,
                        });
                    }

                    if (
                        row.functionId &&
                        !page.functions.find(
                            (f) => f.functionId === row.functionId
                        )
                    ) {
                        page.functions.push({
                            functionId: row.functionId,
                            functionName: row.functionName,
                        });
                    }
                }
            });

            // Convert the projects object to an array of project values
            res.json(Object.values(projects));
        }
    });
});

export default router;
