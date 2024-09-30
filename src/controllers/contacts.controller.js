const { Contact } = require( "../models" );

const addNewContact = async ( req, res ) => {
    try {
        const { name, email, telephone/* , users_id */ } = req.body;
        const { id: user_id } = req.auth;

        // @ts-ignore
        const contactAdded = await Contact.create( {
            name,
            email,
            telephone,
            user_id
        } );

        const newContact = {
            id: contactAdded.id,
            name: contactAdded.name,
            email: contactAdded.email,
            telephone: contactAdded.telephone,
            user_id: contactAdded.users_id,
        };

        return res.status( 201 ).json( newContact );
    } catch ( error ) {
        console.log( { error: error.message } );
        return res.status( 400 ).json( { error: error.errors[ 0 ].message } );
    }
};

const getAllUserContacts = async ( req, res ) => {
    try {
        const { id } = req.auth;
        // @ts-ignore
        const contactsList = await Contact.findAll( {
            where: {
                user_id: id,
            },
            attributes: {
                exclude: [
                    // "users_id",
                    "user_id",
                    "userId",
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
        } );

        return res.status( 200 ).json( contactsList );
    } catch ( error ) {
        console.log( { error: error.message } );
        return res.status( 400 ).json( { error: error.message } );
    }
};

const getContactById = async ( req, res ) => {
    try {
        const { contact } = req;

        return res.status( 200 ).json( contact );
    } catch ( error ) {
        console.log( { error: error.message } );
        return res.status( 400 ).json( { error: error.message } );
    }
};

const updateContactById = async ( req, res ) => {
    try {
        const { id: idParams } = req.params;
        const { name, email, telephone } = req.body;
        // @ts-ignore
        const [ , rowData ] = await Contact.update( {
            name,
            email,
            telephone,
        }, {
            where: {
                id: idParams,
            },
            returning: [
                "id",
                "name",
                "email",
                "telephone",
            ],
        } );

        const contactUpdated = rowData[ 0 ];

        return res.status( 200 ).json( {
            message: "Contato atualizado com sucesso.",
            userUpdated: contactUpdated
        } );
    } catch ( error ) {
        console.log( { error: error.message } );
        return res.status( 400 ).json( { error: error.message } );
    }
};

const deleteContactById = async ( req, res ) => {
    try {
        const { id: idUser } = req.auth;
        const { id } = req.params;

        // @ts-ignore
        await Contact.destroy( {
            where: {
                id: id,
                users_id: idUser,
            }
        } );

        return res.status( 200 ).json( "Contato removido com sucesso." );
    } catch ( error ) {
        console.log( { error: error.message } );
        return res.status( 400 ).json( { error: error.message } );
    }
};

module.exports = {
    addNewContact,
    getAllUserContacts,
    getContactById,
    updateContactById,
    deleteContactById,
};
