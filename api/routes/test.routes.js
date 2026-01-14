const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase');

// Test Firebase connection
router.get('/firebase', async (req, res) => {
  try {
    // Test basic connection
    await db.collection('test').doc('connection').set({ 
      connected: true, 
      timestamp: new Date(),
      test: 'firebase-connection-test'
    });
    
    // Test reading data
    const testDoc = await db.collection('test').doc('connection').get();
    const testData = testDoc.data();
    
    // Test reading users
    const usersSnapshot = await db.collection('users').limit(1).get();
    const userCount = usersSnapshot.size;
    
    res.json({ 
      success: true, 
      message: 'Firebase connection working',
      data: {
        testDoc: testData,
        userCount: userCount,
        timestamp: new Date()
      }
    });
  } catch (error) {
    console.error('Firebase test error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Firebase connection failed',
      error: error.message 
    });
  }
});

// Test environment variables
router.get('/env', (req, res) => {
  res.json({
    success: true,
    data: {
      hasProjectId: !!process.env.FIREBASE_PROJECT_ID,
      hasClientEmail: !!process.env.FIREBASE_CLIENT_EMAIL,
      hasPrivateKey: !!process.env.FIREBASE_PRIVATE_KEY,
      hasJwtSecret: !!process.env.JWT_SECRET,
      projectId: process.env.FIREBASE_PROJECT_ID
    }
  });
});

module.exports = router;
