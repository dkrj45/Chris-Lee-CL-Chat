const {Pool} = require("pg");
require("dotenv").config()

if (process.env.POSTGRES_HOST) {
    process.env.DATABASE_HOST = process.env.POSTGRES_HOST;
  }

const config = {
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  password: process.env.DATABASE_PASSWORD,
  user: process.env.DATABASE_USER,
  port: process.env.DATABASE_PORT,
}

console.log("db.js config:", config)

const pool = new Pool(config);

module.exports = pool