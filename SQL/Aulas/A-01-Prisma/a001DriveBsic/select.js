const pg = require('pg');

const db = new pg.Client({
    // Connection string: protocolo://usuario:senha@host:porta/nome_do_banco
    connectionString: 'postgresql://postgres:145271@localhost:5432/node_postgres'
});

async function selectPokemon() {
    await db.connect();

    const query = `SELECT * FROM "public"."Pokemon";`;
    const result = await db.query(query);

    console.log(result.rows); // Exibe as linhas retornadas pela consulta

    await db.end();
}

selectPokemon();