const knex = require("knex");
const config = require("../knexfile");
const testBase = require("../backend/test/testBase");
const fs = require('fs');
const path = require('path');

let db = null;

const initializeDatabaseSchema = async (db) => {
  const schemaFilePath = path.resolve(__dirname, 'schema.sql'); // Path to your SQL schema file

  if (fs.existsSync(schemaFilePath)) {
    const schemaSQL = fs.readFileSync(schemaFilePath, 'utf-8');
    await db.raw(schemaSQL);
    console.log('Database schema initialized.');
  } else {
    console.log('Schema file not found. Skipping database initialization.');
  }
};

if (process.env.NODE_ENV === "test") {
  console.log("TEST DB");
  db = knex(config.test);
  testBase.resetDatabase(db);
} else if (process.env.NODE_ENV === "test-backend") {
  console.log("TEST DB");
  db = knex(config.test);
} else {
  console.log("DEV DB");
  db = knex(config.development);

  // Initialize the database schema if the database file was created
  initializeDatabaseSchema(db).catch(err => console.error('Error initializing database schema:', err));
}

module.exports = db;
