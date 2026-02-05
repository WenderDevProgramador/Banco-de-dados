const { Pool } = require('pg');

const pool = new Pool({
    connectionString: 'postgresql://postgres:145271@localhost:5432/node_postgres',
});
    

async function query(queryString, params, callBack) {
    return pool.query(queryString, params, callBack);
}

async function getClient() {
    return pool.connect();
}

module.exports = {
    query,
    getClient
};