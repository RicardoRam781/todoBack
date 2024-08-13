const {Pool} = require('pg');
const config = require ("../config.js")

const pool = new Pool({
    user:config.DB_USER,
    password:config.DB_PASSWORD,
    host:config.DB_HOST,
    port:config.DB_PORT,
    database:config.DB_NAME
})
module.exports = pool;



