import db from './connection_db.js';

// get courts appointment query
export const getCourtsAppointmentQuery = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM STADIUM.COURT INNER JOIN STADIUM.APPOINTMENT ON COURT.court_id = APPOINTMENT.court_id', (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

// get courts appointment details query
export const getCourtsAppointmentDetailsQuery = (data) => {

    const { court_id } = data

    return new Promise((resolve, reject) => {

        db.query(`SELECT start_time, end_time, COUNT(P.appointment_id) AS participant_count FROM STADIUM.APPOINTMENT_TIME AS AT INNER JOIN 
        STADIUM.APPOINTMENT AS A ON AT.appointment_id = A.appointment_id LEFT JOIN 
        STADIUM.PARTICIPANT AS P ON A.appointment_id = P.appointment_id
        WHERE A.court_id = ? GROUP BY AT.start_time, AT.end_time`, [court_id], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

// check admin_id 
export const isAdmin = (data) => {
    return new Promise((resolve, reject) => {
        const { admin_id } = data
        db.query('SELECT u.user_id, r.role_id FROM USER u JOIN ROLE_REF r ON u.role_id = r.role_id WHERE u.user_id = ? AND r.role_id = 1;', [admin_id], (error, results) => {
        
            if (error) {
                reject(false);
            } else {

                if (results.length === 0) {
                    resolve(false)
                } else {
                    resolve(true)
                }
            }
        });
    });
}
