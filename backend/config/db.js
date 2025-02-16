const knex = require('knex');
const { DATABASE_URL } = require('./config');

const db = knex({
    client: 'pg',
    connection: DATABASE_URL,
    pool: { min: 2, max: 10 }
});

module.exports = db;
