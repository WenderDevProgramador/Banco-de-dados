
const {Client} = require("pg");

const client = new Client({
    connectionString:"postgresql://postgres:145271@localhost:5432/node_postgres"
})

async function openConnection() {
    await client.connect();

    const result = await client.query("select 1 + 1 as resultado");
    console.log(result.rows)

    setTimeout(() => {
        client.end();
        console.log('Conexão encerrada');
    }, 5000);
}

openConnection();



openConnection();