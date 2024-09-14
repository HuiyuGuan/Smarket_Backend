const Sequelize = require("sequelize");
const pkg = require("../package.json");

// const database_URL =
//   process.env.DATABASE_URL ||
//   "postgres://postgres:sql@localhost:5432/capstone_backend?sslmode=disable";
// const database = new Sequelize(database_URL, {
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false,
//     },
//   },
// });

const database = new Sequelize(process.env.POSTGRES_URL||
"postgres://default:yDU6SXhue8nm@ep-mute-silence-a4s1anlt-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require", {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  logging:false,
});

database
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = database;
