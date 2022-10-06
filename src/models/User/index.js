const { DataTypes } = require( "sequelize" );

const { db } = require( "../../database/connection" );

const User = db.define( 
    "User", 
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
        underscored: true,
    } 
);

// User.sync( { force: true } );
// User.sync();
// User.drop();

module.exports = {
    User,
};
// module.exports = User;
