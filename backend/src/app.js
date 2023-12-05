import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import bearerToken from 'express-bearer-token';
import userRoutes from '../routes/user.js';
import courtRoutes from '../routes/court_provider.js';
import adminRoutes from '../routes/admin.js';

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
import swaggerFile from '../swagger_output.json' assert { type: 'json' };
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// {
//   "name": "body",
//   "in": "body",
//   "schema": {
//     "type": "object",
//     "properties": {
//       "court_id": {
//         "example": "2"
//       },
//       "public": {
//         "example": "1"
//       },
//       "ball": {
//         "example": "羽球"
//       },
//       "level": {
//         "example": "菜雞"
//       },
//       "rule": {
//         "example": "單打"
//       },
//       "password": {
//         "example": ""
//       },
//       "note": {
//         "example": ""
//       },
//       "date": {
//         "example": "2023-12-01"
//       },
//       "start_time": {
//         "example": "12:00:00"
//       },
//       "end_time": {
//         "example": "13:00:00"
//       }
//     }
//   }
// }
