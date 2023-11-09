import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import userRoutes from '../routes/user.js'

const app = express();
app.use(bodyParser.json());
app.use(cors());

// load variables stored in .env
dotenv.config();

//healthcheck
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

// use 'router' to handle each request
app.use("/api/users", userRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});