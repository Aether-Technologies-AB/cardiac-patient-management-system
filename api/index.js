const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount routers
app.use('/api/mock-auth', require('./routes/mock-auth.routes'));
app.use('/api/mock-patients', require('./routes/mock-patients.routes'));
app.use("/api/mock-dashboard", require("./routes/mock-dashboard.routes"));
app.use('/api/mock-vitals', require('./routes/mock-vitals.routes'));
app.use('/api/mock-diagnoses', require('./routes/mock-diagnoses.routes'));
app.use('/api/mock-labs', require('./routes/mock-labs.routes'));

// Basic route
app.get('/', (req, res) => {
  res.send('Cardiac Patient Management System API is running...');
});

module.exports = app;
