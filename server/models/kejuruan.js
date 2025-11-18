'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Kejuruan extends Model {
    static associate(models) {}
  }

  Kejuruan.init({
    nama: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Kejuruan',
  });

  Kejuruan.associate = function(models) {
    Kejuruan.hasMany(models.Absensi, {
      foreignKey: 'KejuruanId',
      as: 'absensi'
    });
  };

  return Kejuruan;
};
