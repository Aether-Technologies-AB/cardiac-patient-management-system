const express = require('express');
const cors = require('cors');
const { db } = require('../backend/src/config/firebase');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection test
db.collection('test').doc('connection').set({ connected: true, timestamp: new Date() })
  .then(() => console.log('Firebase connected...'))
  .catch(err => console.log('Error: ' + err));

// Mount routers
app.use('/api/auth', require('../backend/src/routes/auth.routes'));
app.use('/api/patients', require('../backend/src/routes/patients.routes'));
app.use('/api/users', require('../backend/src/routes/users.routes'));
app.use("/api/dashboard", require("../backend/src/routes/dashboard.routes"));

// Basic route
app.get('/', (req, res) => {
  res.send('Cardiac Patient Management System API is running...');
});

module.exports = app;
