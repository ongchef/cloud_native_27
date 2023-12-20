import dotenv from 'dotenv'

// load variables stored in .env
dotenv.config();

export default {
    CONNECTION_LIMIT: 10,
    HOST: process.env.HOST,
    USER: process.env.USER,
    PASSWORD: process.env.PASSWORD,
    DB: process.env.DB,
}