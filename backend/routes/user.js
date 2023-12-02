import express from 'express'
import {
    getUsers,
    getUsersById,
    postUsers,
    putUsers,
    getUsersAppointment,
    postUsersAppointment,
    postUsersLogin,
    getUsersOrderCourts,
    getUsersJoinCourts,
} from "../controllers/user.js";

const router = express.Router();

// GET /api/users
router.get("/", getUsers);

// POST /api/users
router.post("/", postUsers);

// PUT /api/users
router.put("/", putUsers);

// GET /api/users/id
router.get("/id", getUsersById);

// GET /api/users/order
router.get("/order", getUsersOrderCourts);

// POST /api/users/order
router.post("/order", postUsersAppointment);

// GET /api/users/order/history
router.get("/order/history", getUsersAppointment);

// GET /api/users/order/join
router.get("/order/join", getUsersJoinCourts)

// POST /api/users/login
router.post("/login", postUsersLogin)

export default router