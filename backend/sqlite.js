const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

let _DBConnection;

const connectDatabase = async () => {
  const dbPath = process.env.NODE_ENV === "test" || process.env.NODE_ENV === "test-backend"
      ? ":memory:"
      : path.resolve(__dirname, './db.sqlite');

  if (dbPath !== ":memory:" && !fs.existsSync(dbPath)) {
    console.log('Database file not found. Creating a new database file.');
    fs.writeFileSync(dbPath, '');
  }

  return new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
      console.error("Error opening database", err);
    } else {
      console.log("Connected to the SQLite database.");
    }
  });
}

const getDbConnection = async () => {
  if (!_DBConnection) {
    _DBConnection = await connectDatabase();
  }
  return _DBConnection;
};

const closeConnection = (conn) => {
  if (conn) {
    return conn.close();
  }
};

module.exports = {
  getDbConnection,
  closeConnection
};
