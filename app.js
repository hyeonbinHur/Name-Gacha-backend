const express = require('express');
const cors = require('cors');
const projectRoutes = require('./routes/projectRoutes');
const pageRoutes = require('./routes/pageRoutes');

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the routes defined in projectRoutes.js
app.use('/api', projectRoutes, pageRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));