module.exports = (sequelize, DataTypes) => {
  return sequelize.define('storeItem', {
    itemName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    color: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    itemNum: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  })
}
 