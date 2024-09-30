const { DataTypes } = require( "sequelize" );

const { db } = require( "../../database/connection" );

const User = db.define(
    "users",
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
            unique: true,
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        tableName: "users",
    }
);


module.exports = {
    User,
};
