require("dotenv").config();

module.exports = {
  dialect: "mysql",
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  timezone: "-03:00",
  define: {
    timestamp: true,
    underscored: false,
    underscoredAll: false,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  },
};
