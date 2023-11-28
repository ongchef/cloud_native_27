import db from './connection_db.js';

// get courts appointment details query
export const getCourtsAppointmentDetailsQuery = () => {
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
