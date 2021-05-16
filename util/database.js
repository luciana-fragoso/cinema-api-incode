
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    DB_NAME="DB_SCHEMA",
    DB_USER="YOUR_USERNAME",
    DB_PASS="YOUR_PASSWORD",
  {
    host: "localhost",
    dialect: "mysql",
    logging: false,
    define: {
        timestamps: false
        
    }
  }
);

sequelize.sync();

(async () => {
  try {
    await sequelize.authenticate();
    
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = sequelize;
