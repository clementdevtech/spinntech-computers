const { Pool } = require("pg");
const knex = require("knex");
require("dotenv").config();

const sslConfig = process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : { rejectUnauthorized: false };

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432,
    ssl: sslConfig, 
});

const knexConfig = {
    client: "pg",
    connection: {
        connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
        ssl: sslConfig,
    },
};

const db = knex(knexConfig);


  db.raw("SELECT 1")
  .then(() => console.log("✅ Database connected successfully!"))
  .catch((err) => console.error("❌ Database connection failed:", err));

  module.exports = { db, pool};