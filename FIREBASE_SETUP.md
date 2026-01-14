# Firebase Migration Setup

## Overview
Your cardiac patient management system has been migrated from PostgreSQL/Sequelize to Firebase Firestore. Follow these steps to complete the setup.

## ✅ Completed Migration Steps
- [x] Installed Firebase SDK dependencies
- [x] Created Firebase configuration file
- [x] Updated database configuration to use Firebase
- [x] Migrated Patient and User models to Firebase Firestore
- [x] Updated auth and patients routes/controllers
- [x] Added Firebase environment variables template

## 🔧 Required Setup Steps

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter your project name (e.g., "cardiac-patient-management")
4. Follow the setup steps

### 2. Enable Firestore Database
1. In your Firebase project, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location for your database

### 3. Get Service Account Credentials
1. Go to Project Settings → Service accounts
2. Click "Generate new private key"
3. Download the JSON file
4. Copy the values from the JSON file to your environment

### 4. Update Environment Variables
Add the Firebase configuration to your `.env` file:

```bash
# Firebase Configuration
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-service-account@your-project-id.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
```

**Important:** Replace the placeholder values with your actual Firebase project credentials.

### 5. Update Firebase Configuration File
Update the `backend/src/config/firebase.js` file to load the Firebase environment variables:

```javascript
require('dotenv').config({ path: __dirname + '/../../.env' });
```

## 🚀 Start the Application
```bash
npm run dev
```

## 📝 Migration Notes

### Database Changes
- **Before**: PostgreSQL with Sequelize ORM
- **After**: Firebase Firestore with custom model classes

### Model Changes
- **Patient**: Now uses `PatientFirebase` class with Firestore operations
- **User**: Now uses `UserFirebase` class with Firestore operations
- **Authentication**: Still uses JWT tokens, but also creates Firebase Auth users

### API Changes
- All endpoints remain the same
- Response format is identical
- No frontend changes required

## 🔍 Testing
Test the following endpoints:
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/patients` - Get all patients
- `POST /api/patients` - Create new patient
- `GET /api/patients/:id` - Get single patient
- `PUT /api/patients/:id` - Update patient
- `DELETE /api/patients/:id` - Delete patient

## 🚨 Important Notes
1. **Data Migration**: Existing PostgreSQL data will not be automatically migrated. You'll need to create a migration script if you want to transfer existing data.
2. **Firebase Rules**: Update Firestore security rules for production use
3. **Environment Variables**: Never commit your Firebase private key to version control
4. **Testing**: Test thoroughly in development before deploying to production

## 🛠️ Remaining Models
The following models still need to be migrated to Firebase:
- Allergy
- Appointment
- AuditLog
- Diagnosis
- LabResult
- Medication
- Procedure
- VitalSigns

These can be migrated following the same pattern as Patient and User models.

## 📞 Support
If you encounter any issues during setup:
1. Check Firebase project configuration
2. Verify environment variables are correctly set
3. Ensure Firestore database is created and enabled
4. Check service account permissions
