const { ValidationError } = require( "express-validation" );
const { UnauthorizedError } = require( "express-jwt" );

// eslint-disable-next-line no-unused-vars
const handleError = async ( error, req, res, next ) => {
    if ( error instanceof ValidationError ) {
        return res.status( error.statusCode ).json( error );
    }

    // @ts-ignore
    if ( error instanceof UnauthorizedError ) {
        return res.status( error.status ).json( error );
    }

    return res.status( 500 ).json( error );
};

module.exports = {
    handleError,
};
