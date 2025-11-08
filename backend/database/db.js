const mysql=require("mysql2/promise");

const db=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'Kanav@2005',
    database:'dchelper_backend',
    waitForConnections:true,
    connectionLimit:100,
    queueLimit:0
});


module.exports = db;