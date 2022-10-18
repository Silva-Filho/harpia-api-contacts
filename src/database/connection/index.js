// const { Client } = require( "pg" );
const { Sequelize } = require( "sequelize" );

// Cria o database.
/* const client = new Client( {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_CONFIG_HOST,
    database: process.env.DB_CONFIG_DIALECT,
} );

client.connect();

client.query( "CREATE DATABASE contacts", ( err, res ) => {
    console.log( err, res );
    client.end();
} ); */

// Dados de conexão ao banco de dados.
const DB_CONFIG = {
    // dialect: String( process.env.DB_CONFIG_DIALECT ),
    // eslint-disable-next-line no-undef
    dialect: process.env.DB_CONFIG_DIALECT,
    // host: String( process.env.DB_CONFIG_HOST ),
    // eslint-disable-next-line no-undef
    host: process.env.DB_CONFIG_HOST,
    // eslint-disable-next-line no-undef
    port: Number( process.env.DB_CONFIG_PORT ),
    pool: {
        max: 9,
        min: 0,
        idle: 10000
    },
};

// Objeto para guardar a conexão do banco de dados.
let db = {};

try {
    db = new Sequelize(
        // String( process.env.DB_NAME ),
        // eslint-disable-next-line no-undef
        process.env.DB_NAME,
        // String( process.env.DB_USER ),
        // eslint-disable-next-line no-undef
        process.env.DB_USER,
        // String( process.env.DB_PASSWORD ),
        // eslint-disable-next-line no-undef
        process.env.DB_PASSWORD,
        // @ts-ignore
        DB_CONFIG
    );
} catch ( error ) {
    console.log( { "Mensagem de erro": error.message } );
}

function hasConnection() {
    db.authenticate()
        .then( function () {
            console.log( "Conexão com exito ao banco de dados." );

            // db.drop();
        } )
        // .then( () => db.sync() )
        .catch( function ( error ) {
            console.log( "Erro de conexão: " + error.message + " ao banco de dados." );
        } );
}

/* let db = {};

function hasConnection() {
    console.log( {
        teste02: {
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            host: process.env.DB_CONFIG_HOST,
            database: process.env.DB_CONFIG_DIALECT,
            port: Number( process.env.DB_CONFIG_PORT ),
        }
    } );
} */

Object.assign( db, {
    hasConnection,
} );

module.exports = {
    db,
};
