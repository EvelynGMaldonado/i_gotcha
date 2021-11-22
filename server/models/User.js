const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require("bcrypt");

class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

User.init({
    // add properites here, ex:
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        unique:true,
        allowNull: false,
        validate:{
        isAlphanumeric:true
        }
    },
    email:{
        type:DataTypes.STRING,
        unique:true,
        validate:{
            isEmail:true
        }
    },
    password:{
        type:DataTypes.STRING,
        allowNull: false,
        validate:{
            len:[10]
        }
    }
},{
    hooks:{
        beforeCreate: async (newUser) => {
            newUser.password = await bcrypt.hashSync(newUser.password,10);
            return newUser;
        },
        beforeUpdate:async (updatedUser) =>{
            updatedUser.password = await bcrypt.hashSync(updatedUser.password,10);
            return updatedUser;
        }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'User',
});

module.exports = User;