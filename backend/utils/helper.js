import Moment from 'moment';
import MomentRange from 'moment-range';
import bcrypt from 'bcrypt';

// check available courts according to query time
// query_time format: 'YYYY-MM-DD hh:mm:ss'
export const availableCourtChecker = (reserved_court, query_time) => {

    const moment = MomentRange.extendMoment(Moment);
    const reserved_date = moment.utc(reserved_court['date']).format('YYYY-MM-DD');
    const start = moment(`${reserved_date} ${reserved_court['start_time']}`);
    const end = moment(`${reserved_date} ${reserved_court['end_time']}`);
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
    const reserved_date = moment.utc(reserved_court['date']).format('YYYY-MM-DD');
    const start = moment(`${reserved_date} ${reserved_court['start_time']}`);
    const end = moment(`${reserved_date} ${reserved_court['end_time']}`);
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