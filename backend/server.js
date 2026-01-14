const http = require('http');
require('dotenv').config({ path: __dirname + '/../.env' });
const express = require('express');
const cors = require('cors');
const { db } = require('./src/config/firebase');

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
app.use('/api/auth', require('./src/routes/auth.routes'));
app.use('/api/patients', require('./src/routes/patients.routes'));
app.use('/api/users', require('./src/routes/users.routes'));
app.use("/api/dashboard", require("./src/routes/dashboard.routes"));

// Mount single-resource routes (temporarily disabled - need Firebase migration)
// const { single: singleLabRouter } = require('./src/routes/labs.routes');
// const { single: singleDiagnosisRouter } = require('./src/routes/diagnoses.routes');
// const { single: singleProcedureRouter } = require('./src/routes/procedures.routes');

// app.use('/api/labs', singleLabRouter);
// app.use('/api/diagnoses', singleDiagnosisRouter);
// app.use('/api/procedures', singleProcedureRouter);

// Basic route
app.get('/', (req, res) => {
  res.send('Cardiac Patient Management System API is running...');
});

const PORT = process.env.PORT || 5001;

const server = http.createServer(app);

server.on('listening', () => {
  console.log(`Server started on port ${PORT}`);
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use`);
    process.exit(1);
  } else {
    console.error('Server error:', error);
    process.exit(1);
  }
});

server.listen(PORT);
// This line should be added after the other routes
