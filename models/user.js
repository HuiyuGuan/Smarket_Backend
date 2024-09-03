const Sequelize = require('sequelize')
const database = require("./database")

const user = database.define('user' ,{
    //username, password, name, email, phone, country
    username : {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        notEmpty: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
        },
        // get() {
        //     return () => this.getDataValue('password')
        // }
    },
    // salt: {
    //     type: Sequelize.STRING,
    //     get() {
    //         return() => this.getDataValue('salt')
    //     }
    // },
    name : {
        type: Sequelize.STRING,
        allowNull: false,
        notEmpty: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
            notEmpty: true
        }
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false,
        notEmpty: true
    },
    country: {
        type: Sequelize.STRING,
        allowNull: false,
        notEmpty: true
    }
});

// user.generateSalt = function() {
//     return crypto.randomBytes(16).toString("base64");
//   };
// user.encryptPassword = function(plainText, salt) {
//     return crypto
//         .createHash('RSA-SHA256')
//         .update(plainText)
//         .update(salt)
//         .digest('hex')
// }
// const setSaltAndPassword = oneuser => {
//     if (oneuser.changed('password')) {
//         oneuser.salt = user.generateSalt()
//         oneuser.password = user.encryptPassword(oneuser.password(), oneuser.salt())
//     }
// }
// user.beforeCreate(setSaltAndPassword)
// user.beforeUpdate(setSaltAndPassword)


module.exports = user;