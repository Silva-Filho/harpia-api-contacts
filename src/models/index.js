const { User } = require( "./User" );
const { Contact } = require( "./Contact" );

// @ts-ignore
User.hasMany(
    Contact,
    {
        foreignKey: {
            name: "users_id",
            allowNull: false,
        }
    } );
// @ts-ignore
Contact.belongsTo(
    User,
    {
        foreignKey: {
            name: "users_id",
            allowNull: false,
        }
    } 
);

module.exports = {
    User,
    Contact,
};
