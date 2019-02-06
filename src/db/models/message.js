'use strict';
module.exports = (sequelize, DataTypes) => {
  var Message = sequelize.define('Message', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    message : {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Message.associate = function(models) {
    // associations can be defined here
  };
  return Message;
};