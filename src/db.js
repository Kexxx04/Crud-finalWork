const {Pool} = require('pg')

const pool = new Pool({
    user: 'postgres',
    password: 'keith1234',
    host: 'localhost',
    port: 5432,
    database: 'usersdb'
})

module.exports = pool;