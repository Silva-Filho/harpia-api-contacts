const { joi } = require( "../configs/Joi" );

const schemaAddUser = {
    body: joi.object( {
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().required(),
    } )
};

const schemaUpdateUser = {
    body: joi.object( {
        name: joi.string(),
        email: joi.string().email(),
        password: joi.string(),
    } )
};

module.exports = {
    schemaAddUser,
    schemaUpdateUser,
};
