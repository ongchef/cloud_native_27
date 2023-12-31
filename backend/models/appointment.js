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

export const searchCourtsAppointmentsQuery = (searchQuery) => {

    return new Promise((resolve, reject) => {
        db.query(`SELECT * from STADIUM.APPOINTMENT_TIME
        INNER JOIN STADIUM.APPOINTMENT ON APPOINTMENT_TIME.appointment_id = APPOINTMENT.appointment_id
        INNER JOIN STADIUM.COURT ON APPOINTMENT.court_id = COURT.court_id ${searchQuery}`, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

export const searchCourtsQuery = (ball, address) => {

    let searchQuery = "";
    if (typeof address !== "undefined") {
        searchQuery = `WHERE address like '%${address}%'`;
    }

    return new Promise((resolve, reject) => {
        db.query(`SELECT * from STADIUM.COURT ${searchQuery}`, (error, results) => {
            if (error) {
                reject(error);
            } else {
                // no need to search ball type id
                if (typeof ball === "undefined") {
                    resolve(results);
                // need to search ball type id
                } else {
                    const search_results = results.reduce((result, court) => {
                        const ball_type_id_list = court['ball_type_id'].split(',')
                        const ball_query = ball.toString().split(',')
                        const found = ball_query.some(r=> ball_type_id_list.includes(r))
                        if (found) {
                            result.push(court)
                        }
                        return result
                    }, [])
                    resolve(search_results);
                }
            }
        });
    });
}

export const getCourtsInfoByAppointmentIdQuery = (data) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT c.name as court_name, c.location, c.address, c.image_url, app_t.date, app_t.start_time, app_t.end_time, 
        app.ball, app.level, app.rule, s.name as creator_name, app.attendence, c.available, app.appointment_id, app.public
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
        db.query(`SELECT c.name, c.location, c.address, c.available, c.court_id, c.image_url, c.ball_type_id, c.contact FROM STADIUM.COURT c where court_id in (?)`, [data], (error, results) => {
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

export const checkAppointmentByIdQuery = (data) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT public, password FROM STADIUM.APPOINTMENT WHERE appointment_id = ?`, [data], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

export const checkAppointmentsByTimeQuery = (date) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM STADIUM.APPOINTMENT_TIME WHERE date >= ?`, [date], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

export const getUsersAppointmentsInfoByIdQuery = (appointment_id) => {
    return new Promise((resolve, reject) => {
        db.query(`
        SELECT u.name, u.email, app_t.date, app_t.start_time, app_t.end_time, c.name as court_name, c.location, c.address,
        app.ball, app.level, app.rule, app.attendence
        FROM STADIUM.APPOINTMENT_TIME app_t
        INNER JOIN STADIUM.APPOINTMENT app ON app_t.appointment_id = app.appointment_id
        INNER JOIN STADIUM.COURT c ON c.court_id = app.court_id
        INNER JOIN STADIUM.PARTICIPANT p ON app.appointment_id = p.appointment_id
        INNER JOIN STADIUM.USER u ON u.user_id = p.user_id
        WHERE app_t.appointment_id in (?)`, [appointment_id], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}