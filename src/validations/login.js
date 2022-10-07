const { joi } = require( "../configs/Joi" );

const schemaLogin = {
    body: joi.object( {
        email: joi.string().email().required(),
        password: joi.string().required(),
    } )
};

module.exports = {
    schemaLogin,
};
