import imgur from 'imgur';
import dotenv from 'dotenv'

const { ImgurClient } = imgur;
// load variables stored in .env
dotenv.config();

export const imgurClient =  new ImgurClient({
    clientId: process.env.IMGUR_CLIENTID,
    clientSecret: process.env.IMGUR_CLIENT_SECRET,
    refreshToken: process.env.IMGUR_REFRESH_TOKEN,
});
