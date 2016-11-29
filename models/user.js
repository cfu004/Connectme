"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("user", {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    password_hash: DataTypes.STRING,
    age: DataTypes.INTEGER,
    company: DataTypes.STRING,
    position: DataTypes.STRING,
    industry: DataTypes.STRING,
    level: DataTypes.STRING,
    photo_url: DataTypes.STRING
  }, {
    // don't add the timestamp attributes (updatedAt, createdAt)
      //timestamps: false,

    // don't delete database entries but set the newly added attribute deletedAt
    // to the current date (when deletion was done). paranoid will only work if
    // timestamps are enabled
      //paranoid: true,

    // don't use camelcase for automatically added attributes but underscore style
    // so updatedAt will be updated_at
    underscored: true,

    // disable the modification of tablenames; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,

    // define the table's name
    tableName: 'user',

    classMethods: {
      associate: function(models) {
        User.belongsToMany(User, {as: "friender", through: "connect", foreignKey: 'friender_id', otherKey: 'friended_id'});
        User.belongsToMany(User, {as: "friended", through: "connect", foreignKey: 'friended_id', otherKey: 'friender_id'});
      }
    }
  })

  return User;
};
