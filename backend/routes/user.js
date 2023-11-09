import express from 'express'
import { getUsers, getUsersById } from "../controllers/user.js";

const router = express.Router();

// GET /api/users
router.get("/", getUsers);

// GET /api/users/:id
router.get("/:id", getUsersById);

export default router