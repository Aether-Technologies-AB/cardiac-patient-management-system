const admin = require('firebase-admin');
require('dotenv').config({ path: __dirname + '/../../.env' });

// Initialize Firebase Admin SDK
const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
};

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`
});

// Export Firestore database
const db = admin.firestore();
const auth = admin.auth();

module.exports = { db, auth, admin };
