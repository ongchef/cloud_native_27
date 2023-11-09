import db from './connection_db.js';

export const getUsersQuery = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * from USER', (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

export const getUsersByIdQuery = (data) => {
    return new Promise((resolve, reject) => {
        // try test id = 60b59b1f-b9c7-7bfe-43a6-9a42089ab18f
        db.query('SELECT * from USER WHERE user_id = ?', [data], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}
