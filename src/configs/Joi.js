const { Joi } = require( "express-validation" );
const { messages } = require( "joiptbr" );

const joi = Joi.defaults( ( schema ) => {
    return schema.options( { messages } );
} );

module.exports = {
    joi,
};
