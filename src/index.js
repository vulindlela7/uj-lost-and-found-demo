const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const itemsRouter = require('./routes/items');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API
app.use('/api/items', itemsRouter);

// Static frontend
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => console.log(`UJ Lost & Found demo running on port ${PORT}`));
