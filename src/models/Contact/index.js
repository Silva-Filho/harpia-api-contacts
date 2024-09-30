const { DataTypes } = require( "sequelize" );

const { db } = require( "../../database/connection" );

const Contact = db.define(
    "contacts",
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
        user_id: {
            type: DataTypes.SMALLINT,
            /* references: {
                // model: User,
                model: "users",
                key: "id",
                // name: "user_id",
            }, */
            allowNull: false,
        },
    },
    {
        tableName: "contacts",
    }
);

module.exports = {
    Contact,
};
