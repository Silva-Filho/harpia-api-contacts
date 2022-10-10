const express = require( "express" );
const swaggerUi = require( "swagger-ui-express" );
const { validate } = require( "express-validation" );

// Documentation
const swaggerDocument = require( "../../swagger.json" );

// Routes
const { usersRouter } = require( "./users" );

// Validations
const { schemaLogin } = require( "../validations/login" );

// Middlewares
const verifyToken = require( "../middlewares/auth.middleware" );

// Controllers
const { login } = require( "../controllers/login.controller" );

const router = express.Router();

router.use( "/api-docs", swaggerUi.serve );
router.get( "/api-docs", swaggerUi.setup( swaggerDocument ) );

router.use(
    verifyToken.unless( {
        path: [
            {
                url: "/login",
                methods: [ "POST" ]
            },
            {
                url: "/users",
                methods: [ "POST" ]
            }
        ],
    } )
);

router.use( usersRouter );

// Login
router.post(
    "/login",
    validate( schemaLogin ),
    login
);

module.exports = {
    router
};
