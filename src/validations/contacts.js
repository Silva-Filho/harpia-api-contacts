const { joi } = require( "../configs/Joi" );

const schemaAddContact = {
    body: joi.object( {
        name: joi.string().required(),
        email: joi.string().email().required(),
        telephone: joi.string().pattern( /^[0-9]{11}$/ ).required(),
    } )
};

const schemaUpdateContact = {
    body: joi.object( {
        name: joi.string(),
        email: joi.string().email(),
        telephone: joi.string().pattern( /^[0-9]{11}$/ ),
    } )
};

module.exports = {
    schemaAddContact,
    schemaUpdateContact,
};
