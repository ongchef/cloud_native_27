import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import bearerToken from 'express-bearer-token';
import userRoutes from '../routes/user.js';
import courtRoutes from '../routes/court_provider.js';
import adminRoutes from '../routes/admin.js';
import email from './email.js';

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(bearerToken());

// load variables stored in .env
dotenv.config();

//healthcheck
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

// use 'router' to handle each request
app.use("/api/users", userRoutes);
app.use("/api/courts", courtRoutes);
app.use("/api/admin", adminRoutes);

//swagger
import swaggerUi from 'swagger-ui-express';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const swaggerFile = require("../swagger_output.json");
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

// Send Email
// Comment follow otherwise my mail inbox will be exploded.
// const loopInterval = setInterval(email, 3000);

// Listen
const port = process.env.PORT || 3000;

app.listen(port, () => {
 console.log(`Server is running on port ${port}`);
 console.log(email);
});

export default app; 
