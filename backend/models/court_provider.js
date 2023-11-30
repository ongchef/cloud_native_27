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

    const { admin_id } = data

    return new Promise((resolve, reject) => {
        db.query('SELECT * from STADIUM.COURT WHERE admin_id = ?', [admin_id], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

// check admin_id of the court
export const isCourtsProvider = (data) => {
    return new Promise((resolve, reject) => {

        const { court_id, admin_id } = data

        db.query('SELECT admin_id FROM STADIUM.COURT WHERE court_id = ?', [court_id], (error, results) => {
            
            if (error) {
                reject(false);
            } else {
                const court_admin_id = results[0]['admin_id']
                if (court_admin_id === admin_id){
                    resolve(true);
                }
                resolve(false)
            }
        });
    });
}

// get court's reserved time by court id
export const getCourtsReservedByCourtIdQuery = async(data) => {
    
    const court_id = data['court_id']

    return new Promise((resolve, reject) => {
        db.query(`SELECT start_time, end_time FROM STADIUM.APPOINTMENT_TIME INNER JOIN 
        STADIUM.APPOINTMENT ON STADIUM.APPOINTMENT_TIME.appointment_id = STADIUM.APPOINTMENT.appointment_id 
        WHERE court_id = ?`, [court_id], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });

}

// put court info by court_id
export const putCourtsByIdQuery = async(data) => {

    const { court_id, admin_id, ...update_col_dict } = data;

    return new Promise((resolve, reject) => {
        db.query('UPDATE STADIUM.COURT SET ? WHERE court_id = ?', [update_col_dict, court_id], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve("變更完成!");
            }
        });
    });
}

// post courts
export const postCourtsQuery = (data) => {

    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO STADIUM.COURT SET ?`, [data], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve("新增完成!");
            }
        });
    });
}

// delete courts
export const deleteCourtsByIdQuery = async(data) => {

    const { court_id } = data;

    return new Promise((resolve, reject) => {
        db.query('DELETE FROM STADIUM.COURT WHERE court_id = ?', [court_id], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve("刪除完成!");
            }
        });
    });
}