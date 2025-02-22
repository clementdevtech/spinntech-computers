const { Pool } = require('pg');
const knex = require('knex');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432,
    ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false,
});

const knexConfig = {
    client: 'pg',
    connection: {
      host: process.env.dbhost,
      port: process.env.dbport,
      user: process.env.dbuser,
      password: process.env.dbpassword,
      database: process.env.dbname
    }
  };
  
  const db = knex(knexConfig);


  module.exports = { db, pool};