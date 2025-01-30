import mysql from 'mysql'
import dotenv from 'dotenv';
dotenv.config();
const db = mysql.createConnection({
    connectionLimit: 10,
    host: process.env.DATABASE_SERVER,
    user: process.env.DATABSE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});


export default db