
const { Pool } = require('pg');

const poll = new Pool({
    connectionString:"postgresql://postgres:145271@localhost:5432/node_postgres",
    max: 3 // número máximo de conexões no pool
})

async function queryRapida() {
    const result = await poll.query("select 1 + 1 as resultado");
    console.log(result.rows[0]);

    setTimeout(() => {
        console.log('Consulta rápida finalizada');
    }, 3000);
}


queryRapida();
queryRapida();
queryRapida();
queryRapida();