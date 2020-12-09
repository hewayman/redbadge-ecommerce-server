module.exports = (sequelize, DataTypes) => {
  return sequelize.define('review', {
    itemID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    review: {
      type: DataTypes.STRING
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userFirstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userLastName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })
};
 