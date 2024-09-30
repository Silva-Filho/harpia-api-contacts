const { Sequelize } = require( "sequelize" );

// Dados de conexão ao banco de dados.
const DB_CONFIG = {
    // eslint-disable-next-line no-undef
    dialect: process.env.DB_CONFIG_DIALECT,
    // eslint-disable-next-line no-undef
    host: process.env.DB_CONFIG_HOST,
    // eslint-disable-next-line no-undef
    port: Number( process.env.DB_CONFIG_PORT ),
    pool: {
        max: 9,
        min: 0,
        idle: 10000
    },
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
        paranoid: true,
        freezeTableName: true,
    },
};

// Objeto para guardar a conexão do banco de dados.
let db = {};

try {
    db = new Sequelize(
        // @ts-ignore
        // eslint-disable-next-line no-undef
        process.env.DB_NAME,
        // eslint-disable-next-line no-undef
        process.env.DB_USER,
        // eslint-disable-next-line no-undef
        process.env.DB_PASSWORD,
        // @ts-ignore
        DB_CONFIG,
    );
} catch ( error ) {
    console.log( { "Mensagem de erro": error.message } );
}

function hasConnection() {
    db.authenticate()
        .then( function () {
            console.log( "Conexão com exito ao banco de dados." );

        } )
        .catch( function ( error ) {
            console.log( "Erro de conexão: " + error.message + " ao banco de dados." );
        } );
}

Object.assign( db, {
    hasConnection,
} );

// Syncroniza as tabelas:
db.sync();

module.exports = {
    db,
};
