const DataTypes  = require("sequelize");
const sequelize = require("../util/database");
const User = require("./user");
  
 
const Rating = sequelize.define("Rating", {
  user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id"
      }
  },
  movie_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  value: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});



module.exports = Rating;