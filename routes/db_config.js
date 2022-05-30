const sql =  require('mysql');
// Coloca aquí tus credenciales

const db = sql.createConnection({
    host : "localhost",
    user : "root",
    port : 3306,
    password : "1234",
    database : "mvp_all",
});


module.exports = db;