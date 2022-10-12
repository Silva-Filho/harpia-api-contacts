const express = require( "express" );
const { validate } = require( "express-validation" );

// Validations
const { 
    schemaAddContact, 
    schemaUpdateContact 
} = require( "../../validations/contacts" );
const { schemaIdParams } = require( "../../validations/idParams" );

// Middlewares
const { checkUserExist } = require( "../../middlewares/users.middleware" );
const { checkContactExist } = require( "../../middlewares/contacts.middleware" );

// Controllers
const { 
    addNewContact, 
    getAllUserContacts, 
    getContactById,
    updateContactById,
    deleteContactById,
} = require( "../../controllers/contacts.controller" );

const contactsRouter = express.Router();

// Cadastra contato:
contactsRouter.post(
    "/contacts",
    validate( schemaAddContact ),
    checkUserExist,
    addNewContact
);
// Lista contatos cadastrados:
contactsRouter.get(
    "/contacts",
    getAllUserContacts,
);
// Lista contato referente ao ID:
contactsRouter.get(
    "/contacts/:id",
    validate( schemaIdParams ),
    checkContactExist,
    getContactById,
);
// Atualiza contato:
contactsRouter.put(
    "/contacts/:id",
    validate( schemaIdParams ),
    checkContactExist,
    validate( schemaUpdateContact ),
    updateContactById
);
// Exclui contato:
contactsRouter.delete(
    "/contacts/:id",
    validate( schemaIdParams ),
    checkContactExist,
    deleteContactById
);

module.exports = {
    contactsRouter,
};
