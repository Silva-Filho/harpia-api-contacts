// require( "dotenv" ).config();
require( "dotenv" ).config( { path: "./src/env/.env" } );

const express = require( "express" );
const cors = require( "cors" );

const { db } = require( "./database/connection" );
const { handleError } = require( "./middlewares/handleError" );
const { router } = require( "./router" );

// const port = 8081;
// eslint-disable-next-line no-undef
const port = process.env.PORT;

const server = express();

db.hasConnection();

server.use( express.json() );
server.use( cors() );
server.use( router );
// server.use( "/api", require( "./router" ) );
// server.use( "/api", router );

server.use( handleError );

server.listen( port, () => {
    console.log( `O servidor está rodando em http://localhost:${ port }` );
} );
