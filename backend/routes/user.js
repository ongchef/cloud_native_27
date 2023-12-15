import express from 'express'
import {
    getUsers,
    getUsersById,
    postUsers,
    putUsers,
    getUsersAppointment,
    postUsersAppointment,
    getUsersAppointmentDetail,
    postUsersLogin,
    getUsersAppointmentJoin,
    postUsersAppointmentJoin,
    getUsersAppointmentHistory,
    getUsersAppointmentJoinDetail,
    notifyUsersByTime
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

// GET /api/users/appointment
router.get("/appointment", getUsersAppointment);

// POST /api/users/appointment
router.post("/appointment", postUsersAppointment);

// GET /api/users/appointmentDetail
router.get("/appointmentDetail", getUsersAppointmentDetail);

// GET /api/users/appointment/histories
router.get("/appointment/histories", getUsersAppointmentHistory);

// GET /api/users/appointment/join
router.get("/appointment/join", getUsersAppointmentJoin)

// POST /api/users/appointment/join
router.post("/appointment/join", postUsersAppointmentJoin)

// GET /api/users/appointmentDetail/join
router.get("/appointmentDetail/join", getUsersAppointmentJoinDetail)

// POST /api/users/login
router.post("/login", postUsersLogin)

// GET /api/users/notification
router.get("/notification", notifyUsersByTime)

export default router