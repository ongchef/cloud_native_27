import db from './connection_db.js';

// get all courts
export const getCourtsQuery = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * from STADIUM.COURT', (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

// get all courts by admin id
export const getCourtsByAdminIdQuery = (data) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * from STADIUM.COURT WHERE admin_id = ?', [data], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

// TODO: check admin_id of the court
// if finished, it can be added it into other functions
export const checkCourtsProvider = (data) => {
    return new Promise((resolve, reject) => {
        db.query('', [data], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

// get court's reserved time by court id
export const getCourtsReservedByCourtIdQuery = (data) => {
    // TODO: check admin_id of the court

    return new Promise((resolve, reject) => {
        db.query(`SELECT start_time, end_time FROM STADIUM.APPOINTMENT_TIME INNER JOIN 
        STADIUM.APPOINTMENT ON STADIUM.APPOINTMENT_TIME.appointment_id = STADIUM.APPOINTMENT.appointment_id 
        WHERE court_id = ?`, [data], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

// put court info by court_id
// TODO: check which columns should be edited
export const putCourtsInfoByIdQuery = (data) => {
    // TODO: check admin_id of the court

    return new Promise((resolve, reject) => {
        db.query('UPDATE * from STADIUM.COURT SET = ? WHERE = ?', [data], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

// post create courts
// TODO: court_id auto increment setting in DB?
export const postCreateCourtsQuery = (data) => {

    const court_columns = '(admin_id, name, location, contact, available)'

    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO STADIUM.COURT ${court_columns} VALUES ?`, [data], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}