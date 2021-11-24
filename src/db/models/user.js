'use strict';
const { Model } = require('sequelize')
const bcrypt = require('bcrypt')
const ROUNDS = 10

async function hashPassword(user, options) {
  if (! user.changed('password')) return
  const hash = await bcrypt.hash(user.password, ROUNDS)
  user.password = hash
}

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    hooks: {
      beforeCreate: hashPassword,
      beforeUpdate: hashPassword,
    }
  });
  return User;
};
