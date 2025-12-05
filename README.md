# Instagram Clone - Full Stack Application

A complete Instagram clone built with React, Node.js, Express, MongoDB, and Socket.io for real-time messaging.

---

## 🚀 Features

- ✅ User Authentication (Signup/Login/Logout)
- ✅ Create, Like, Comment on Posts
- ✅ Follow/Unfollow Users
- ✅ Real-time Messaging with Socket.io
- ✅ Image Upload with Cloudinary
- ✅ User Profile Management
- ✅ Bookmark Posts
- ✅ Search Users
- ✅ Explore Posts
- ✅ Notifications (Likes, Follows, Messages)
- ✅ Responsive Design with Tailwind CSS
- ✅ Online/Offline User Status

---

## 🛠️ Tech Stack

### Frontend
- React 19
- Vite
- Tailwind CSS
- Redux Toolkit (State Management)
- React Router (Navigation)
- Socket.io Client (Real-time)
- Axios (API Calls)

### Backend
- Node.js
- Express.js 4.18.2
- MongoDB with Mongoose
- Socket.io (Real-time Communication)
- JWT (Authentication)
- Cloudinary (Image Storage)
- Multer (File Upload)
- bcryptjs (Password Hashing)

---

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (Local or Atlas)
- npm or yarn

---

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
cd "INSTAGRAM CLONE"
```

### 2. Backend Setup
```bash
cd backend
npm install
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

### 4. Environment Variables

Backend `.env` file is already configured with MongoDB Atlas:
```env
PORT=8081
MONGO_URI=mongodb+srv://instagramuser:odiJoKSCVq96rtcA@instagram-clone.tncychp.mongodb.net/connecthub?retryWrites=true&w=majority
SECRET_KEY=SDJVIFSDJVOIJKKVKA
API_KEY=725479154796424
API_SECRET=mNunqF3rX3e8y_KNsR-ILej57hA
CLOUD_NAME=dftveg232
URL=http://localhost:3000
BACKEND_URL=http://localhost:8081
```

---

## 🎯 Quick Start

### Option 1: Using Batch File (Windows)
```
Double-click: START.bat
```

### Option 2: Manual Start

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:8081
- Health Check: http://localhost:8081/health

---

## 📊 Database Setup

### MongoDB Atlas (Cloud Database)

The application is configured to use MongoDB Atlas cloud database:
- Database: `connecthub`
- Collections: users, posts, comments, messages, conversations
- Connection string is already configured in `backend/.env`

**To use your own Atlas cluster:**
1. Create account at https://cloud.mongodb.com
2. Create new cluster
3. Get connection string
4. Update `MONGO_URI` in `backend/.env`

---

## 📁 Project Structure

```
instagram-clone/
├── backend/
│   ├── controllers/          # Request handlers
│   │   ├── user.controller.js
│   │   ├── post.controller.js
│   │   └── message.controller.js
│   ├── models/               # Database schemas
│   │   ├── user.model.js
│   │   ├── post.model.js
│   │   ├── comment.model.js
│   │   └── message.model.js
│   ├── routes/               # API routes
│   │   ├── user.route.js
│   │   ├── post.route.js
│   │   └── message.route.js
│   ├── middlewares/          # Custom middlewares
│   │   ├── isAuthenticated.js
│   │   └── multer.js
│   ├── socket/               # Socket.io configuration
│   │   └── socket.js
│   ├── utils/                # Utility functions
│   │   ├── db.js
│   │   ├── cloudinary.js
│   │   └── datauri.js
│   ├── .env                  # Environment variables
│   ├── index.js              # Server entry point
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/       # React components
    │   │   ├── Login.jsx
    │   │   ├── Signup.jsx
    │   │   ├── Home.jsx
    │   │   ├── Profile.jsx
    │   │   ├── ChatPage.jsx
    │   │   ├── Messages.jsx
    │   │   └── ...
    │   ├── redux/            # Redux store & slices
    │   │   ├── store.js
    │   │   ├── authSlice.js
    │   │   ├── postSlice.js
    │   │   ├── chatSlice.js
    │   │   └── socketSlice.js
    │   ├── hooks/            # Custom React hooks
    │   │   ├── useGetAllMessage.jsx
    │   │   └── useGetRTM.jsx
    │   ├── lib/              # API configuration
    │   │   └── api.js
    │   ├── App.jsx
    │   └── main.jsx
    ├── package.json
    └── vite.config.js
```

---

## 🔌 API Endpoints

### Authentication
- `POST /api/v1/user/register` - Register new user
- `POST /api/v1/user/login` - Login user
- `GET /api/v1/user/logout` - Logout user

### User
- `GET /api/v1/user/:id/profile` - Get user profile
- `POST /api/v1/user/profile/edit` - Edit profile
- `GET /api/v1/user/suggested` - Get suggested users
- `POST /api/v1/user/followorunfollow/:id` - Follow/Unfollow user

### Posts
- `POST /api/v1/post/addpost` - Create new post
- `GET /api/v1/post/all` - Get all posts
- `GET /api/v1/post/userpost/all` - Get user posts
- `GET /api/v1/post/:id/like` - Like post
- `GET /api/v1/post/:id/dislike` - Dislike post
- `POST /api/v1/post/:id/comment` - Add comment
- `POST /api/v1/post/:id/comment/all` - Get comments
- `DELETE /api/v1/post/delete/:id` - Delete post
- `GET /api/v1/post/:id/bookmark` - Bookmark post

### Messages
- `POST /api/v1/message/send/:id` - Send message
- `GET /api/v1/message/all/:id` - Get messages

---

## 💬 Real-time Messaging

### How It Works:
1. User connects via Socket.io when logged in
2. Socket maps userId to socketId
3. When message is sent:
   - Saved to MongoDB
   - Emitted to receiver's socket (if online)
   - Emitted to sender's socket for confirmation
4. Both users see messages instantly

### Message Alignment:
- **Your messages**: Right side (Blue)
- **Received messages**: Left side (Gray)

### Testing Messages:
1. Open 2 browsers (Chrome + Incognito)
2. Create 2 users
3. Login both users
4. Click "Messages" icon
5. Select user to chat
6. Send messages - they appear instantly!

---

## 🗄️ Database Collections

### users
```javascript
{
  username: String,
  email: String,
  password: String (hashed),
  profilePicture: String,
  bio: String,
  gender: String,
  followers: [ObjectId],
  following: [ObjectId],
  posts: [ObjectId],
  bookmarks: [ObjectId]
}
```

### posts
```javascript
{
  caption: String,
  image: String,
  author: ObjectId,
  likes: [ObjectId],
  comments: [ObjectId]
}
```

### messages
```javascript
{
  message: String,
  senderId: ObjectId,
  receiverId: ObjectId,
  createdAt: Date
}
```

---

## 🐛 Troubleshooting

### Backend won't start
```bash
# Kill process on port 8081
netstat -ano | findstr :8081
taskkill /f /pid [PID]

# Or use the batch file
RESTART-ALL.bat
```

### MongoDB Atlas connection failed
- Check internet connection
- Verify Atlas cluster is running
- Check connection string in `.env`
- Ensure IP address is whitelisted in Atlas

### Login/Logout issues
- Clear browser cookies
- Check backend is running on port 8081
- Check browser console for errors

### Messages not delivering
- Check both users are online (green status)
- Check backend console for socket connections
- Refresh both browsers
- Check backend logs for "User connected" messages

### Port already in use
```bash
# Change port in backend/.env
PORT=8082

# Update frontend/src/lib/api.js
const API_BASE_URL = 'http://localhost:8082/api/v1';

# Update frontend/src/App.jsx
const socketio = io('http://localhost:8082', {...});
```

---

## 🔒 Security Features

- Password hashing with bcryptjs
- JWT token authentication
- HTTP-only cookies
- Protected routes with middleware
- Input validation
- File upload security with Multer
- CORS configuration

---

## 📝 Scripts

### Backend
```bash
npm start       # Start server
npm run dev     # Start with nodemon (auto-restart)
```

### Frontend
```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run preview # Preview production build
```

---

## 🎨 UI Components

Built with:
- Shadcn UI components
- Tailwind CSS for styling
- Lucide React for icons
- Sonner for toast notifications

---

## 🚀 Deployment

### Backend (Render/Railway/Heroku)
1. Set environment variables
2. Change MONGO_URI to MongoDB Atlas
3. Update CORS origin to frontend URL
4. Deploy

### Frontend (Vercel/Netlify)
1. Update API_BASE_URL to backend URL
2. Build: `npm run build`
3. Deploy dist folder

---

## 📄 License

ISC

---

## 👨‍💻 Development

### Adding New Features
1. Backend: Create controller → Create route → Add to index.js
2. Frontend: Create component → Add to routes → Connect to Redux

### Testing
1. Use MongoDB Atlas web interface to view database
2. Use browser DevTools for debugging
3. Check backend console for logs
4. Use Postman for API testing

---

## ✅ All Features Working

- ✅ Express version compatibility (4.18.2)
- ✅ MongoDB connection (Local & Atlas)
- ✅ Port 8081 for backend
- ✅ CORS configuration
- ✅ Login/Logout cookie handling
- ✅ Real-time messaging (no duplicates)
- ✅ Message alignment (sender right, receiver left)
- ✅ Socket connection handling
- ✅ Follow/Unfollow with real-time updates
- ✅ Search users functionality
- ✅ Explore page with all posts
- ✅ Notifications for likes, follows, messages
- ✅ Suggested users (excludes followed users)

---

## 📞 Support

For issues:
1. Check troubleshooting section
2. Check backend console logs
3. Check browser console
4. Verify MongoDB is running
5. Verify all dependencies installed

---

## 🎉 Success Indicators

### Backend Running:
```
💾 MongoDB Atlas Connected
✅ Server running on port 8081
🌐 API URL: http://localhost:8081
📱 Health check: http://localhost:8081/health
```

### Frontend Running:
```
VITE ready in XXX ms
➜  Local:   http://localhost:3000/
```

### Messaging Working:
```
✅ User 673abc... connected with socket abc123
📊 Online users: [ '673abc...', '673def...' ]
📨 Message from 673abc... to 673def...: Hello
✅ Sending to receiver socket: xyz789
```

### Notifications Working:
```
✅ Like notification sent
✅ Follow notification sent
✅ Message notification sent
📊 Notification badge count: 3
```

---

**Enjoy your Instagram Clone! 🎉**
