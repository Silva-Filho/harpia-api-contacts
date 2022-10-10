const { expressjwt: expressJWT } = require( "express-jwt" );

module.exports = expressJWT( {
    // @ts-ignore
    // eslint-disable-next-line no-undef
    secret: process.env.SECRET_KEY,
    algorithms: [ "HS256" ],
    // requestProperty: "user",
} );
