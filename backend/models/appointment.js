import db from './connection_db.js';

// get all appointments
export const getCourtsAppointmentsQuery = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * from STADIUM.APPOINTMENT_TIME', (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

export const getCourtsIdByAppointmentIdQuery = (data) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT court_id FROM STADIUM.APPOINTMENT where appointment_id in (?)', [data], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

export const getCourtsInIdListQuery = (data) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM STADIUM.COURT where court_id in (?)', [data], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

export const getCourtsNotInIdListQuery = (data) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM STADIUM.COURT where court_id not in (?)', [data], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

export const addParticipantQuery = (data) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO STADIUM.PARTICIPANT SET ?', [data], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

export const addAppointmentTimeQuery = (data) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO STADIUM.APPOINTMENT_TIME SET ?', [data], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}
