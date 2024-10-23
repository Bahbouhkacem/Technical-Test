// bsh tconnecti from mysql msh mongo
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',  
    password: '',  
    database: 'movie_review_app'  
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL!');
    }
});

module.exports = connection;
