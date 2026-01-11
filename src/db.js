const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const dbFile = path.join(dataDir, 'lost_and_found.db');
const db = new sqlite3.Database(dbFile);

// Ensure table exists (simple migration)
const schema = `
CREATE TABLE IF NOT EXISTS items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  location TEXT,
  found_date TEXT,
  status TEXT DEFAULT 'found',
  reporter_name TEXT,
  reporter_contact TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
`;

db.serialize(() => {
  db.run(schema);
});

module.exports = db;
