# Frontend Update Instructions

## 🔄 Update API Base URL

Your frontend needs to point to the new Vercel backend instead of localhost.

### 1. Update API Configuration
In your React frontend, find the API configuration file (usually `src/config/api.js` or similar):

```javascript
// OLD (localhost)
const API_BASE_URL = 'http://localhost:5001/api';

// NEW (Vercel)
const API_BASE_URL = 'https://windsurf-project-livid.vercel.app/api';
```

### 2. Common Files to Update
- `src/config/api.js`
- `src/utils/api.js`
- `src/services/api.js`
- `.env` file (if using REACT_APP_API_URL)

### 3. Environment Variable Method (Recommended)
Create/update `.env` in your client folder:

```
REACT_APP_API_URL=https://windsurf-project-livid.vercel.app/api
```

Then in your code:
```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL;
```

### 4. Deploy Frontend Changes
After updating, redeploy your frontend to Netlify:

```bash
cd client
npm run build
# Upload build folder to Netlify
```

## ✅ Testing
Once updated, your app will work 24/7 without needing your local server running!

## 🌐 Full URLs
- Frontend: Your Netlify URL
- Backend API: https://windsurf-project-livid.vercel.app/api
- Dashboard: https://windsurf-project-livid.vercel.app/api/dashboard/stats
