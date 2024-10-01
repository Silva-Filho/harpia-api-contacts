// @ts-ignore
const { ne } = require( "sequelize/lib/operators" );
const { User } = require( "../models" );

const checkUserExist = async ( req, res, next ) => {
    try {
        const { id: idUser } = req.auth;
        const url = req.url;

        // let id = 0;

        if ( url.includes( "/users" ) ) {
            const { id: idParams } = req.params;

            if ( idUser !== Number( idParams ) ) {
                return res.status( 400 ).json( { error_message: "O ID informado não é válido!" } );
            }

            // id = idParams;
        }

        /* if ( url.includes( "/contacts" ) ) {
            const { users_id } = req.body;

            if ( idUser !== Number( users_id ) ) {
                return res.status( 400 ).json( { error_message: "O ID informado não é válido!" } );
            }

            id = idUser;
        } */

        const user = await User.findByPk( Number( idUser ), {
            attributes: {
                exclude: [
                    "password",
                    "createdAt",
                    "updatedAt",
                    "deletedAt",
                ]
            }
        } );

        // return res.status( 200 ).json( user );
        req.user = user;

        // eslint-disable-next-line no-unreachable
        next();
    } catch ( error ) {
        console.log( { error: error.message } );
        return res.status( 400 ).json( { error: error.message } );
    }
};

const checkEmailExist = async ( req, res, next ) => {
    try {
        // return res.status( 200 ).json( req.method );
        // @ts-ignore
        const { email } = req.body;
        const methodHttp = req.method;
        // const { id } = req.user;

        let user = {};

        if ( methodHttp === "PUT" ) {
            const { id: idUser } = req.auth;

            user = await User.findOne( {
                where: {
                    email,
                    id: {
                        [ ne ]: idUser,
                    },
                }
            } );
        } else {
            user = await User.findOne( {
                where: {
                    email,
                }
            } );
        }

        if ( user ) {
            return res.status( 400 ).json( "Email já cadastrado." );
        }
        // eslint-disable-next-line no-unreachable
        next();
    } catch ( error ) {
        console.log( { error: error.message } );
        return res.status( 400 ).json( { error: error.message } );
    }
};

module.exports = {
    checkUserExist,
    checkEmailExist,
};
