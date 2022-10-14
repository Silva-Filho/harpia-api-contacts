const bcrypt = require( "bcrypt" );

// const { db } = require( "../database/connection" );
const { User } = require( "../models" );

const addNewUser = async ( req, res ) => {
    try {
        const { name, email, password } = req.body;

        const cryptPassword = await bcrypt.hash( password, 10 );

        /* return res.status( 200 ).json( {
            name,
            email,
            cryptPassword,
        } ); */

        // @ts-ignore
        const userAdded = await User.create( {
            name,
            email,
            password: cryptPassword,
        } );

        const newUser = {
            id: userAdded.id,
            name: userAdded.name,
            email: userAdded.email,
        };

        return res.status( 201 ).json( newUser );
    } catch ( error ) {
        console.log( { error: error.message } );
        return res.status( 400 ).json( { error: error.errors[ 0 ].message } );
    }
};

const getAllUsers = async ( req, res ) => {
    try {
        // @ts-ignore
        const usersList = await User.findAll( {
            attributes: {
                exclude: [
                    "password",
                    "createdAt",
                    "updatedAt"
                ]
            }
        } );

        return res.status( 200 ).json( usersList );

        /* const query = "SELECT id, name, email FROM users";
        const [ results ] = await db.query( query );

        return res.status( 200 ).json( results ); */
    } catch ( error ) {
        console.log( { error: error.message } );
        return res.status( 400 ).json( { error: error.message } );
    }
};

const getUserById = async ( req, res ) => {
    try {
        // const { id } = req.auth;
        // const { id } = req.user;
        // return res.status( 200 ).json( { id: id } );
        // return res.status( 200 ).json( { req_auth: req.auth } );
        // return res.status( 200 ).json( { req_user: req.user } );

        /* const userLogged = await User.findByPk( id, {
            attributes: {
                exclude: [
                    "password",
                    "createdAt",
                    "updatedAt"
                ]
            }
        } ); */

        // return res.status( 200 ).json( "Teste getUserById." );
        // return res.status( 200 ).json( { userLogged: userLogged } );
        return res.status( 200 ).json( { user: req.user } );
    } catch ( error ) {
        console.log( { error: error.message } );
        return res.status( 400 ).json( { error: error.message } );
    }
};

const updateUserById = async ( req, res ) => {
    try {
        // const { id: authId } = req.auth;
        const { id } = req.params;
        // const { id: userId, name: userName, email: userEmail } = req.user;
        const { name, email, password } = req.body;
        // return res.status( 200 ).json( req.body );
        let cryptPassword;

        if ( password ) {
            cryptPassword = await bcrypt.hash( password, 10 );
        }
        // @ts-ignore
        const [ , rowData ] = await User.update( {
            name,
            email,
            password: cryptPassword,
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

        const userUpdated = rowData[ 0 ];

        return res.status( 200 ).json( {
            message: "Usuário atualizado com sucesso.",
            userUpdated: userUpdated
        } );

        /* const customerUpdated = {
            id: customer.id,
            name: name ? name : customer.name,
            email: email ? email : customer.email,
        };

        return res.status( 200 ).json( customerUpdated ); */
    } catch ( error ) {
        console.log( { error: error.message } );
        return res.status( 400 ).json( { error: error.message } );
    }
};

const deleteUserById = async ( req, res ) => { 
    try {
        const { id: userId } = req.user;

        // @ts-ignore
        await User.destroy( {
            where: {
                id: userId,
            }
        } );

        return res.status( 200 ).json( "Usuário removido com sucesso." );
    } catch ( error ) {
        console.log( { error: error.message } );
        return res.status( 400 ).json( { error: error.message } );
    }
};

module.exports = {
    addNewUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
};
