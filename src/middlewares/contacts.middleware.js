const { Contact } = require( "../models" );

const checkContactExist = async ( req, res, next ) => {
    try {
        const { id: idUser } = req.auth;
        const { id: idParams } = req.params;

        /* const contact = await Contact.findByPk(
            Number( id ),
            {
                where: {
                    users_id: idUser,
                },
                attributes: {
                    exclude: [
                        "users_id",
                        "createdAt",
                        "updatedAt"
                    ]
                },
                include: [ {
                    model: User,
                    attributes: [
                        "id",
                        "name"
                    ],
                    right: true,
                } ]
            }
        ); */
        const contact = await Contact.findOne(
            {
                where: {
                    id: idParams,
                    user_id: idUser,
                },
                attributes: {
                    exclude: [
                        "users_id",
                        "createdAt",
                        "updatedAt",
                        "deletedAt",
                    ]
                },
                /* include: [ {
                    model: User,
                    attributes: [
                        "id",
                        "name"
                    ],
                    right: true,
                } ] */
            }
        );

        if ( contact === null ) { 
            return res.status( 400 ).json( { error_message: "O ID informado não é válido!" } );
        }

        req.contact = contact;

        next();
    } catch ( error ) {
        console.log( { error: error.message } );
        return res.status( 400 ).json( { error: error.message } );
    }
};

module.exports = {
    checkContactExist,
};
