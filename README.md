const { Client } = require('pg');

// Configure the database connection
const client = new Client({
  user: process.env.DATABASE_USER || 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  database: process.env.DATABASE_NAME || 'employee_tracker',
  password: process.env.DATABASE_PASSWORD || 'password',
  port: 5432,
});

client.connect();

module.exports = client;
