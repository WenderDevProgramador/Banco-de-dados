const { Pool } = require('pg')

const pool = new Pool({
    connectionString: 'postgresql://postgres:145271@localhost:5432/node_postgres'
})

async function query(queryString, params, callback) {
    console.log('Query executada -> '+ queryString)
    return pool.query(queryString, params, callback)
}

module.exports = { query };