const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mcalabofdbms',
    database: 'citydb'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('CONNECTED TO DATABASE');
})

module.exports = db;