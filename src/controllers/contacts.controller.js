const { Contact, User } = require( "../models" );

const addNewContact = async ( req, res ) => {
    try {
        const { name, email, telephone, users_id } = req.body;
        const { name: userName } = req.user;

        /* return res.status( 200 ).json( {
            name,
            email,
            telephone,
            users_id,
        } ); */

        // @ts-ignore
        const customAdded = await Contact.create( {
            name,
            email,
            telephone,
            users_id,
        } );

        // return res.status( 200 ).json( { customAdded: customAdded } );

        const newUser = {
            id: customAdded.id,
            name: customAdded.name,
            email: customAdded.email,
            telephone: customAdded.telephone,
            user: {
                id: customAdded.users_id,
                name: userName,
            },
        };

        return res.status( 201 ).json( newUser );
    } catch ( error ) {
        console.log( { error: error.message } );
        return res.status( 400 ).json( { error: error.errors[ 0 ].message } );
    }
};

const getAllUserContacts = async ( req, res ) => {
    try {
        const { id: idUser } = req.auth;
        // @ts-ignore
        const contactsList = await Contact.findAll( {
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
        const { id } = req.params;
        const { name, email, telephone } = req.body;
        // return res.status( 200 ).json( req.body );
        // @ts-ignore
        const [ , rowData ] = await Contact.update( {
            name,
            email,
            telephone,
        }, {
            where: {
                id,
            },
            returning: [
                "id",
                "name",
                "email",
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
