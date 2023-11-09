import mysql from "mysql2";
import mysql_config from "../config/mysql.js";

const poolConnection = mysql.createPool({
    connectionLimit: mysql_config.CONNECTION_LIMIT,
    host: mysql_config.HOST,
    user: mysql_config.USER,
    password: mysql_config.PASSWORD,
    database: mysql_config.DB,
    multipleStatements: true
});

poolConnection.getConnection(function (err, connection) {
    if (err) {
        console.log('connecting error!');
        console.log(err);
        return;
    }
    console.log('connecting success');
    connection.release();
});

export default poolConnection;
