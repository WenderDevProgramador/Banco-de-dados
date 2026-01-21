const pg = require('pg');

const db = new pg.Client({
    // Connection string: protocolo://usuario:senha@host:porta/nome_do_banco
    connectionString: 'postgresql://postgres:145271@localhost:5432/node_postgres'
});



async function createTable() {
    await db.connect() // Abre a conexão com o banco de dados
    const query = `CREATE TABLE IF NOT EXISTS "public"."Pokemon" (
        "id" SERIAL PRIMARY KEY,
        "name" VARCHAR(100) NOT NULL,
        "type" VARCHAR(50) NOT NULL
    );`
    const result = await db.query(query)
    console.log(result)

    await db.end(); // Fecha a conexão com o banco de dados
}

createTable();