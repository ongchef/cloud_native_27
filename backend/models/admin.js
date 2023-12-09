import db from './connection_db.js';

// get courts appointment query
export const getCourtsAppointmentQuery = (params) => {
    const name = params.name !== 'ALL' ? params.name : null;
    const ball = params.ball !== 'ALL' ? params.ball : null;
    const ballarray = JSON.parse(ball);
    let placeholders = [];
    if (ball !== 'ALL' && ballarray.length >= 1) {
        placeholders = ballarray.map(() => '?').join(', ');
    }
    console.log(ballarray);
    console.log(placeholders);
    const address = params.address !== 'ALL' ? params.address : null;
    const date = params.date !== 'ALL' ? params.date : null;
    const page = params.page || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    return new Promise((resolve, reject) => {
        db.query(`SELECT COUNT(*) AS total_count FROM (
            SELECT COURT.* FROM STADIUM.COURT 
            INNER JOIN STADIUM.APPOINTMENT ON COURT.court_id = APPOINTMENT.court_id
            INNER JOIN STADIUM.APPOINTMENT_TIME ON APPOINTMENT.appointment_id = APPOINTMENT_TIME.appointment_id
            INNER JOIN USER ON COURT.admin_id = USER.user_id
            WHERE 
                (USER.name = ? OR ? IS NULL) 
                AND (COURT.ball_type_id IN (${placeholders}) OR ? IS NULL)
                AND (address = ? OR ? IS NULL)
                AND (date = ? OR ? IS NULL)
        ) AS result;
        
        SELECT COURT.* FROM STADIUM.COURT 
            INNER JOIN STADIUM.APPOINTMENT ON COURT.court_id = APPOINTMENT.court_id
            INNER JOIN STADIUM.APPOINTMENT_TIME ON APPOINTMENT.appointment_id = APPOINTMENT_TIME.appointment_id
            INNER JOIN USER ON COURT.admin_id = USER.user_id
            WHERE 
                (USER.name = ? OR ? IS NULL) 
                AND (COURT.ball_type_id IN (${placeholders}) OR ? IS NULL) 
                AND (address = ? OR ? IS NULL)
                AND (date = ? OR ? IS NULL)
            LIMIT ? OFFSET ?;
        `, [name, name, ...ballarray, ball, address, address, date, date, name, name, ...ballarray, ball, address, address, date, date, limit, offset],(error, results) => {
            if (error) {
                reject(error);
            } else {
                let returns = {}
                returns['total_page'] = Math.ceil(results[0][0]['total_count']/10)
                returns['courts'] = results[1]
                resolve(returns);
            }
        });
    });
}

// get courts appointment details query
export const getCourtsAppointmentDetailsQuery = (data) => {

    const { court_id } = data

    return new Promise((resolve, reject) => {

        db.query(`SELECT start_time, end_time, COUNT(P.appointment_id) AS participant_count, name, address 
        FROM STADIUM.APPOINTMENT_TIME AS AT INNER JOIN STADIUM.APPOINTMENT AS A ON AT.appointment_id = A.appointment_id 
        LEFT JOIN STADIUM.PARTICIPANT AS P ON A.appointment_id = P.appointment_id
        LEFT JOIN STADIUM.USER AS U ON A.creator_id = U.user_id
        WHERE A.court_id = ? GROUP BY AT.start_time, AT.end_time`, [court_id], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

// get user histories query
export const getUserHistoriesQuery = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT user_id, name, email, phone FROM USER WHERE role_id = 2', (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

//post court provider
export const postCourtsProviderQuery = (data) => {

    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO STADIUM.USER SET ?`, [data], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve("新增完成!");
            }
        });
    });
}

// put user info by user_id
export const putUsersByIdQuery = async(data) => {

    const { user_id, ...update_col_dict } = data;

    return new Promise((resolve, reject) => {
        db.query('UPDATE STADIUM.USER SET ? WHERE user_id = ?', [update_col_dict, user_id], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve("變更完成!");
            }
        });
    });
}

// delete user info by user_id
export const deleteUsersByIdQuery = async(data) => {
    const user_id = data;

    return new Promise((resolve, reject) => {
        db.query('DELETE FROM STADIUM.USER WHERE user_id = ?', [user_id], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve("刪除完成!");
            }
        });
    });
}

// check admin_id 
export const isAdmin = (data) => {
    return new Promise((resolve, reject) => {
        const admin_id = data
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
