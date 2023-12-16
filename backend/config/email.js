import dotenv from "dotenv";

export default {
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: "billy784512369@gmail.com",
        pass: process.env.PASSKEY
    },
};