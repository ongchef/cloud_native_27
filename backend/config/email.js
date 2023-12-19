import dotenv from "dotenv";

export default {
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.MAILUSER,
        pass: process.env.PASSKEY
    },
};