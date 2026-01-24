const pg = require('pg');

const db = new pg.Client({
    // Connection string: protocolo://usuario:senha@host:porta/nome_do_banco
    connectionString: 'postgresql://postgres:145271@localhost:5432/node_postgres'
});

async function insertPokemon() {
    await db.connect();

    const pokemon = { name: "Bulbasauro", type: "planta" }


    const result1 = await db.query(`INSERT INTO "Pokemon" (name, type) VALUES ($1, $2);`
        , [pokemon.name, pokemon.type]
    )


    // Em PostgreSQL:
    // - Aspas duplas ("") são usadas para identificar nomes de objetos do banco (tabelas, colunas, schemas) 
    //   preservando maiúsculas/minúsculas ou caracteres especiais.
    // - Aspas simples ('') são usadas para valores literais de texto (strings).
    
    console.log(result1);
    await db.end();
}

insertPokemon();