import db from './connection_db.js';

// get all appointments
export const getCourtsAppointmentsQuery = () => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * from STADIUM.APPOINTMENT_TIME INNER JOIN STADIUM.APPOINTMENT 
        ON APPOINTMENT_TIME.appointment_id = APPOINTMENT.appointment_id`, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

export const getCourtsInfoByAppointmentIdQuery = (data) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT c.name as court_name, c.location, app_t.date, app_t.start_time, app_t.end_time, 
        app.ball, app.level, app.rule, s.name as creator_name, app.attendence, c.available 
        FROM STADIUM.APPOINTMENT app 
        INNER JOIN STADIUM.COURT c on app.court_id = c.court_id 
        INNER JOIN STADIUM.APPOINTMENT_TIME app_t on app.appointment_id = app_t.appointment_id
        INNER JOIN STADIUM.USER s on app.creator_id = s.user_id
        where app.appointment_id in (?)`, [data], (error, results) => {
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

export const getCourtsOrderInfoInIdListQuery = (data) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT c.name, c.location, c.available, c.court_id FROM STADIUM.COURT c where court_id in (?)`, [data], (error, results) => {
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

export const getCourtsAvaTimeByIdQuery = (data) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT weekday, start_time, end_time 
        FROM STADIUM.COURT_AVAILABLE_TIME WHERE court_id = ?`, [data], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

export const putAttendenceQuery = (data) => {
    return new Promise((resolve, reject) => {
        db.query(`UPDATE STADIUM.APPOINTMENT SET attendence = attendence + 1 WHERE appointment_id = ?`, [data], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}