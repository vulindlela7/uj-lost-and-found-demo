const express = require('express');
const router = express.Router();
const db = require('../db');

// List items
router.get('/', (req, res) => {
  db.all('SELECT * FROM items ORDER BY created_at DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Get single item
router.get('/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM items WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Item not found' });
    res.json(row);
  });
});

// Create item
router.post('/', (req, res) => {
  const { title, description, location, found_date, reporter_name, reporter_contact } = req.body;
  if (!title) return res.status(400).json({ error: 'title is required' });
  const stmt = db.prepare(`INSERT INTO items (title, description, location, found_date, reporter_name, reporter_contact) VALUES (?, ?, ?, ?, ?, ?)`);
  stmt.run([title, description, location, found_date, reporter_name, reporter_contact], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    db.get('SELECT * FROM items WHERE id = ?', [this.lastID], (err2, row) => {
      if (err2) return res.status(500).json({ error: err2.message });
      res.status(201).json(row);
    });
  });
});

// Update item
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { title, description, location, found_date, status, reporter_name, reporter_contact } = req.body;
  db.run(
    `UPDATE items SET title = COALESCE(?, title), description = COALESCE(?, description), location = COALESCE(?, location), found_date = COALESCE(?, found_date), status = COALESCE(?, status), reporter_name = COALESCE(?, reporter_name), reporter_contact = COALESCE(?, reporter_contact) WHERE id = ?`,
    [title, description, location, found_date, status, reporter_name, reporter_contact, id],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: 'Item not found' });
      db.get('SELECT * FROM items WHERE id = ?', [id], (err2, row) => {
        if (err2) return res.status(500).json({ error: err2.message });
        res.json(row);
      });
    }
  );
});

// Delete item
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM items WHERE id = ?', [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Item not found' });
    res.json({ success: true });
  });
});

module.exports = router;
