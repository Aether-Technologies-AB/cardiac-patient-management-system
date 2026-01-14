const express = require('express');
const cors = require('cors');
const { db } = require('./config/firebase');

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
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/patients', require('./routes/patients.routes'));
app.use('/api/users', require('./routes/users.routes'));
app.use("/api/dashboard", require("./routes/dashboard.routes"));
app.use("/api/test", require("./routes/test.routes"));

// Basic route
app.get('/', (req, res) => {
  res.send('Cardiac Patient Management System API is running...');
});

module.exports = app;
