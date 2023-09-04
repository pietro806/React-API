import mysql from 'mysql2/promise';

let conexao = await mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB
});

export default conexao; 