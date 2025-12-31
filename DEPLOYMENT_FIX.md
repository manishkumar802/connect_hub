# Production Deployment Fix

## Issues Found:
1. Environment variables mismatch between local and production
2. CORS configuration not properly handling production URLs
3. Cloudinary credentials might not be set in production

## Solutions:

### 1. Backend (Render) Environment Variables:
Set these in Render dashboard:
```
PORT=8081
MONGO_URI=mongodb+srv://manishkumar000802_db_user:fTkSRntTL4X5oX3T@instagram-clone.tncychp.mongodb.net/connecthub?retryWrites=true&w=majority
SECRET_KEY=SDJVIFSDJVOIJKKVKA
API_KEY=725479154796424
API_SECRET=mNunqF3rX3e8y_KNsR-ILej57hA
CLOUD_NAME=dftveg232
FRONTEND_URL=https://connecthub-socialmedia.netlify.app
NODE_ENV=production
```

### 2. Frontend (Netlify) Environment Variables:
Set in Netlify dashboard:
```
VITE_BACKEND_URL=https://connect-hub-0rwk.onrender.com
```

### 3. Build Commands:
- Backend: `npm install && npm start`
- Frontend: `npm install && npm run build`

### 4. Check Deployment URLs:
- Make sure your frontend URL in CORS matches your actual Netlify URL
- Update FRONTEND_URL in Render to match your Netlify domain

### 5. Test Photo Upload:
After deployment, check browser console for:
- CORS errors
- API endpoint errors
- Cloudinary upload errors

### 6. Common Issues:
- File size limits (set to 10mb in backend)
- Cloudinary credentials not set
- CORS blocking requests
- Wrong API URLs in frontend