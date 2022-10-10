const express = require( "express" );
const { validate } = require( "express-validation" );

// Validations
const { 
    schemaAddUser, 
    schemaUpdateUser 
} = require( "../../validations/users" );
const { schemaIdParams } = require( "../../validations/idParams" );

// Middlewares
const { checkEmailExist, checkUserExist } = require( "../../middlewares/users.middleware" );

// Controllers
const {
    addNewUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
} = require( "../../controllers/users.controller" );

const usersRouter = express.Router();

// Cadastrar usuário:
usersRouter.post(
    "/users",
    validate( schemaAddUser ),
    checkEmailExist,
    addNewUser
);
// Listar usuários cadastrados:
usersRouter.get(
    "/users",
    getAllUsers,
);
// Lista usuário referente ao ID:
usersRouter.get(
    "/users/:id",
    validate( schemaIdParams ),
    checkUserExist,
    getUserById,
);
// Atualiza o usuário referente ao ID:
usersRouter.put(
    "/users/:id",
    validate( schemaIdParams ),
    checkUserExist,
    validate( schemaUpdateUser ),
    checkEmailExist,
    updateUserById,
);
// Exclui o usuário referente ao ID:
usersRouter.delete(
    "/users/:id",
    validate( schemaIdParams ),
    checkUserExist,
    deleteUserById,
); 

module.exports = {
    usersRouter,
};
