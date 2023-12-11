import Moment from 'moment';
import MomentRange from 'moment-range';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { imgurClient } from '../config/imgur.js';
import dotenv from 'dotenv'

// load variables stored in .env
dotenv.config();

// check available courts according to query time
// query_time format: 'YYYY-MM-DD hh:mm:ss'
export const availableCourtChecker = (reserved_court, query_time) => {

    const moment = MomentRange.extendMoment(Moment);
    const start = moment(`${reserved_court['date']} ${reserved_court['start_time']}`, moment.ISO_8601);
    const end = moment(`${reserved_court['date']} ${reserved_court['end_time']}`, moment.ISO_8601);
    const range = moment.range(start, end);
    const query_time_moment = moment(query_time)

    // range.contains() returns True if query_time in a court's appointment start time and end time period
    // -> the court is not available to order
    return range.contains(query_time_moment)
}

// check joinable courts according to query time
// query_time format: 'YYYY-MM-DD hh:mm:ss'
export const joinableCourtChecker = (reserved_court, query_time) => {

    const moment = MomentRange.extendMoment(Moment);
    const start = moment(`${reserved_court['date']} ${reserved_court['start_time']}`, moment.ISO_8601);
    const end = moment(`${reserved_court['date']} ${reserved_court['end_time']}`, moment.ISO_8601);
    const range = moment.range(start, end);
    const query_time_moment = moment(query_time)

    // range.contains() returns True if query_time in a court's appointment start time and end time period
    // -> the court is joinable
    return range.contains(query_time_moment)
}

export const hashPassword = (plaintextPassword) => {
    return bcrypt.hash(plaintextPassword, 10);
}

export const comparePassword = (plaintextPassword, hash) => {
    return bcrypt.compare(plaintextPassword, hash);
}

export const generate_uuid = () => {
    return uuidv4();
}

export const parseISODate = (date) => {
    const cur_date = new Date(date);
    return `${cur_date.getFullYear()}-${cur_date.getMonth()+1}-${cur_date.getDate()}`
}

export const add_one_day = (date) => {
    const cur_date = new Date(date);
    return `${cur_date.getFullYear()}-${cur_date.getMonth()+1}-${cur_date.getDate()+1}`
}

export const imageClient = (image_file) => {
    return imgurClient.upload({
            image: image_file.toString('base64'),
            type: 'base64',
            album: process.env.IMGUR_ALBUM_ID
        });
}