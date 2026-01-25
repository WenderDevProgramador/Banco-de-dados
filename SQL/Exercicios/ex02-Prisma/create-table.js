const { query } = require('./pool');

async function createTable() {
    await query(`
        CREATE TABLE IF NOT EXISTS events (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            event_date DATE NOT NULL,
            total_tickets INT NOT NULL,
            tickets_sold INT DEFAULT 0 );
        `)

        console.log("Table 'events' created successfully.");

        process.exit(0);

}

createTable();