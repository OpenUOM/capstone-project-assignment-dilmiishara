const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

let _DBConnection;

const connectDatabase = async () => {
  const dbPath = path.resolve(__dirname, './db.sqlite');
  const isTestEnv = process.env.NODE_ENV === "test" || process.env.NODE_ENV === "test-backend";

  if (isTestEnv) {
    return new sqlite3.Database(":memory:", sqlite3.OPEN_READWRITE);
  } else {
    // Create the database file if it doesn't exist
    if (!fs.existsSync(dbPath)) {
      fs.closeSync(fs.openSync(dbPath, 'w'));
    }
    return new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
      if (err) {
        console.error("Failed to connect to database", err);
      } else {
        console.log("Connected to the SQLite database.");
      }
    });
  }
}

const getDbConnection = async () => {
  if (!_DBConnection) {
    _DBConnection = await connectDatabase();
  }
  return _DBConnection;
};

const closeConnection = conn => {
  if (conn) {
    return conn.close();
  }
};

module.exports = {
  getDbConnection,
  closeConnection
};
