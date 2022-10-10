const bcrypt = require( "bcrypt" );
const jwt = require( "jsonwebtoken" );

const { User } = require( "../models" );

const login = async ( req, res ) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne( {
            where: {
                email,
            },
        } );

        if ( !user ) {
            return res.status( 400 ).json( "Cliente não cadastrado." );
        }

        if ( !bcrypt.compareSync( password, user.password ) ) {
            return res.status( 401 ).json( "Senha inválida!" );
        }

        // eslint-disable-next-line no-undef
        const secretKey = process.env.SECRET_KEY;
        const token = jwt.sign(
            {
                id: user.id,
                name: user.name,
            },
            // @ts-ignore
            secretKey,
            {
                expiresIn: "10d"
            }
        );

        const userLogged = {
            user: {
                id: user.id,
                name: user.name,
                // email: user.email,
                /* ,
                "email": {
                    "type": "string"
                } */
            },
            token,
        };

        return res.status( 200 ).json( userLogged );
    } catch ( error ) {
        console.log( { error: error.message } );
        return res.status( 400 ).json( { error: error.message } );
    }
};

module.exports = {
    login,
};
