
const DataTypes  = require("sequelize");
const sequelize = require("../util/database");
const User = require("./user");
  
 
const Rating = sequelize.define("Rating", {
  user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id"
      }
  },
  show_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  value: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});



module.exports = Rating;
