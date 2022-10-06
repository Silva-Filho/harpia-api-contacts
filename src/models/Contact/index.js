const { DataTypes } = require( "sequelize" );

const { db } = require( "../../database/connection" );
const { User } = require( "../User" );

const Contact = db.define(
    "Contact",
    {
        id: {
            type: DataTypes.SMALLINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING( 100 ),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING( 50 ),
            allowNull: false,
            // unique: true,
        },
        telephone: {
            type: DataTypes.STRING( 11 ),
            allowNull: false,
        },
        users_id: {
            type: DataTypes.SMALLINT,
            references: {
                model: User,
                key: "id",
            },
            allowNull: false,
        },
    },
    {
        tableName: "contacts",
        underscored: true,
    }
);

// Contact.sync( { force: true } );
// Contact.sync();
// Contact.drop();

module.exports = {
    Contact,
};
// module.exports = Contact;
