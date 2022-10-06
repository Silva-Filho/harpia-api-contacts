const { joi } = require( "../configs/Joi" );

const schemaIdParams = {
    params: joi.object( {
        id: joi.string().pattern( /^[0-9]+$/ ),
    } ),
};

module.exports = {
    schemaIdParams,
};
