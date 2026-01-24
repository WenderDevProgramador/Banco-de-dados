const { Pool} = require('pg');

const poll = new Pool({
    connectionString:"postgresql://postgres:145271@localhost:5432/node_postgres",
    max: 3 // número máximo de conexões no pool
})

async function openConnection() {
    const client = await poll.connect();
    const result = await client.query("select 1 + 1 as resultado");
    console.log(result.rows);

    setTimeout(() => {
        client.release(); // devolve a conexão para o pool
        console.log('Conexão encerrada');
    }, 3000);
}

openConnection();
openConnection();
openConnection();
openConnection();