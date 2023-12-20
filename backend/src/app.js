import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import bearerToken from 'express-bearer-token';
import userRoutes from '../routes/user.js';
import courtRoutes from '../routes/court_provider.js';
import adminRoutes from '../routes/admin.js';
import poolConnection from "../models/connection_db.js";
import http from "http";
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
// import swaggerFile from '../swagger_output.json' assert { type: 'json' };
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

// Send Email
// Comment follow otherwise my mail inbox will be exploded.
// const loopInterval = setInterval(email, 10000);


// Listen
const port = process.env.PORT || 3000;

// app.listen(port, () => {
//  console.log(`Server is running on port ${port}`);
// });

const server = http.createServer(app)
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
 })

// Graceful Shutdown
process.on('SIGINT', () => {
  console.log('SIGINT signal received.');

  server.close(function(err) {
    if (err){
      console.log(err);
      process.exit(1)
    }
  })

  poolConnection.end(function(err) {
    if (err){
      console.log(err);
      process.exit(1);
    }
    console.log('Graceful shutdown successfully.');
    process.exit(0);
  })
})

export default app; 
