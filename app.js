import express from "express";
import cors from "cors";
import projectRouter from "./routers/projectRouter.js";
import pageRouter from "./routers/pageRouter.js";
import functionRouter from "./routers/functionRouter.js";
import variableRouter from "./routers/variableRouter.js";
import authRouter from "./routers/authRouter.js";
import cookieParser from "cookie-parser";
import aiRouter from "./routers/aiRouter.js";

const app = express();
const port = 8080;

app.use(
  cors({
    origin: "*",
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTION"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Use the routes defined in projectRoutes.js
app.get("/", (req, res) => {
  res.send("Welcome to the Panther Charitan API!");
});
app.use(
  "/namegacha/api",
  projectRouter,
  pageRouter,
  functionRouter,
  variableRouter,
  authRouter,
  aiRouter
);
app.listen(port, () => console.log(`Server running on port ${port}`));
