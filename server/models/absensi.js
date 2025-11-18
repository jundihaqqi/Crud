'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Absensi extends Model {
    static associate(models) {}
  }

  Absensi.init({
    nama_kejuruan: DataTypes.STRING,
    hadir: DataTypes.INTEGER,
    keterangan: DataTypes.STRING,
    KejuruanId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Absensi',
  });

  Absensi.associate = function(models) {
    Absensi.belongsTo(models.Kejuruan, {
      foreignKey: 'KejuruanId',
      as: 'kejuruan'
    });
  };

  return Absensi;
};
