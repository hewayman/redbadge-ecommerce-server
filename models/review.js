module.exports = (sequelize, DataTypes) => {
  return sequelize.define('review', {
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    review: {
      type: DataTypes.STRING
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false
    }
    
    // ,
    // userFirstName: {
    //   type: DataTypes.STRING,
    //   allowNull: false
    // },
    // userLastName: {
    //   type: DataTypes.STRING,
    //   allowNull: false
    // },
    // itemID: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false
    // }
    // owner: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false
    // }
  })
};
 