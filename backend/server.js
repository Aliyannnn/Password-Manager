const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const authRoutes = require('./routes/Auth');
const ensureAuthenticated = require('./middleware/Auth');
const mongoose = require('mongoose');

dotenv.config();

mongoose.connect('mongodb://localhost:27017/PasswordManager', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'PasswordManager';

const app = express();
const port = 3000;


app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(session({
  secret: process.env.SESSION_SECRET || 'your-session-secret',
  resave: false,
  saveUninitialized: false,
}));

require('./passportConfig');
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);

client.connect()
  .then(() => console.log('MongoClient connected'))
  .catch(err => console.error('MongoClient connection error:', err));

// GET Passwords API 
app.get('/api/passwords', ensureAuthenticated, async (req, res) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection('Passwords');
    const findResult = await collection.find({ userId: req.user._id.toString() }).toArray();
    res.json(findResult);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch passwords' });
  }
});

// ADD Password API
app.post('/api/passwords', ensureAuthenticated, async (req, res) => {
  try {
    const password = req.body;
    password.userId = req.user._id.toString();
    const db = client.db(dbName);
    const collection = db.collection('Passwords');
    const result = await collection.insertOne(password);
    res.json({ success: true, result });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add password' });
  }
});

// DELETE Password API
app.delete('/api/passwords/:id', ensureAuthenticated, async (req, res) => {
  try {
    const _id = req.params.id;
    if (!_id) return res.status(400).json({ error: 'Missing _id' });

    const db = client.db(dbName);
    const collection = db.collection('Passwords');
    const result = await collection.deleteOne({ _id: new ObjectId(_id), userId: req.user._id.toString() });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'No document found to delete' });
    }

    res.json({ success: true, result });
  } catch (err) {
    console.error('Error deleting:', err);
    res.status(500).json({ error: 'Failed to delete password' });
  }
});

// Update Password API
app.put('/api/passwords/:id', ensureAuthenticated, async (req, res) => {
  try {
    const _id = req.params.id;
    const { site, user, password } = req.body;
    if (!_id) return res.status(400).json({ error: 'Missing _id' });

    const db = client.db(dbName);
    const collection = db.collection('Passwords');
    const result = await collection.updateOne(
      { _id: new ObjectId(_id), userId: req.user._id.toString() },
      { $set: { site, user, password } }
    );

    res.json({ success: true, result });
  } catch (err) {
    console.error('Error updating:', err);
    res.status(500).json({ error: 'Failed to update password' });
  }
});

app.get('/', (req, res) => {
  res.send('Password Manager API is running');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});