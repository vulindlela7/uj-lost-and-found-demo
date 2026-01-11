-- Schema for UJ Lost & Found demo
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
