const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    DB_NAME="movies",
    DB_USER="root",
    DB_PASS="",
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