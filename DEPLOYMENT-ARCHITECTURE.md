# 🏗️ AWS Deployment Architecture

## 📊 Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER'S BROWSER                          │
│                    (Chrome, Firefox, etc.)                      │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ HTTPS/HTTP
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    AWS S3 + CloudFront                          │
│                    (Frontend Hosting)                           │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  - React Application (Built)                             │  │
│  │  - Static Files (HTML, CSS, JS)                          │  │
│  │  - Images, Icons                                         │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ API Calls (HTTP)
                             │ WebSocket (Socket.io)
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    AWS EC2 Instance                             │
│                    (Backend Server)                             │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Node.js + Express.js                                    │  │
│  │  ├── API Routes (/api/v1/*)                              │  │
│  │  ├── Socket.io Server (Real-time)                        │  │
│  │  ├── JWT Authentication                                  │  │
│  │  ├── Multer (File Upload)                                │  │
│  │  └── PM2 Process Manager                                 │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  Instance Type: t2.micro (1GB RAM, 1 vCPU)                     │
│  OS: Ubuntu 22.04 LTS                                           │
│  Port: 8081                                                     │
└──────────────┬─────────────────────────────┬────────────────────┘
               │                             │
               │ Database Queries            │ Image Upload
               ▼                             ▼
┌──────────────────────────┐    ┌──────────────────────────┐
│   MongoDB Atlas          │    │   Cloudinary             │
│   (Cloud Database)       │    │   (Image Storage)        │
│  ┌────────────────────┐  │    │  ┌────────────────────┐  │
│  │ Collections:       │  │    │  │ - User Profiles    │  │
│  │ - users            │  │    │  │ - Post Images      │  │
│  │ - posts            │  │    │  │ - Optimized CDN    │  │
│  │ - messages         │  │    │  └────────────────────┘  │
│  │ - comments         │  │    │                          │
│  │ - conversations    │  │    │  Already Configured ✅   │
│  └────────────────────┘  │    └──────────────────────────┘
│                          │
│  Cluster: M0 (Free)      │
│  Storage: 512MB          │
└──────────────────────────┘
```

---

## 🔄 Request Flow

### 1. User Visits Website
```
User Browser → S3 Bucket → Downloads React App → Runs in Browser
```

### 2. User Logs In
```
Browser → API Call → EC2 Backend → MongoDB (Verify) → JWT Token → Browser
```

### 3. User Uploads Post
```
Browser → Image → EC2 Backend → Cloudinary (Store) → Get URL
                              → MongoDB (Save post data)
                              → Response to Browser
```

### 4. Real-time Messaging
```
User A Browser ←→ Socket.io ←→ EC2 Backend ←→ Socket.io ←→ User B Browser
                                    ↓
                              MongoDB (Save message)
```

---

## 💰 Cost Breakdown (Free Tier)

| Service | Free Tier | Your Usage | Cost |
|---------|-----------|------------|------|
| **EC2 (t2.micro)** | 750 hrs/month | 720 hrs (24/7) | $0 |
| **S3 Storage** | 5GB | ~100MB | $0 |
| **S3 Requests** | 20K GET, 2K PUT | ~5K/month | $0 |
| **CloudFront** | 50GB transfer | ~5GB/month | $0 |
| **MongoDB Atlas** | 512MB | ~200MB | $0 |
| **Cloudinary** | 25GB storage | ~1GB | $0 |
| **TOTAL** | | | **$0/month** |

**⚠️ After 12 months:** EC2 ~$10/month (can switch to cheaper alternatives)

---

## 🔒 Security Layers

```
┌─────────────────────────────────────────────┐
│  1. AWS Security Group (Firewall)          │
│     - Only ports 22, 80, 8081 open         │
│     - SSH restricted to your IP            │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│  2. JWT Authentication                      │
│     - Token-based auth                      │
│     - HTTP-only cookies                     │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│  3. MongoDB Atlas Security                  │
│     - Encrypted connections                 │
│     - User authentication                   │
│     - IP whitelist                          │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│  4. Password Hashing (bcrypt)               │
│     - Passwords never stored in plain text  │
└─────────────────────────────────────────────┘
```

---

## 📈 Scalability Options

### Current Setup (Free Tier)
- **Users**: ~100 concurrent users
- **Storage**: 512MB database
- **Bandwidth**: 50GB/month

### If You Need More (Paid)

#### Option 1: Upgrade EC2
```
t2.micro (1GB) → t2.small (2GB) → t2.medium (4GB)
$0/month       → $17/month      → $34/month
```

#### Option 2: Add Load Balancer
```
Multiple EC2 instances + AWS ELB
Handle 1000+ concurrent users
~$50-100/month
```

#### Option 3: Use AWS Elastic Beanstalk
```
Automatic scaling + Load balancing
Pay only for resources used
~$30-200/month (based on traffic)
```

---

## 🌍 Multi-Region Deployment (Advanced)

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   US East    │     │  EU Central  │     │  Asia South  │
│              │     │              │     │              │
│  EC2 + S3    │     │  EC2 + S3    │     │  EC2 + S3    │
└──────┬───────┘     └──────┬───────┘     └──────┬───────┘
       │                    │                    │
       └────────────────────┼────────────────────┘
                            │
                    ┌───────▼────────┐
                    │  MongoDB Atlas │
                    │  (Multi-region)│
                    └────────────────┘
```

**Cost:** ~$100-300/month
**Benefits:** 
- Faster load times globally
- 99.99% uptime
- Disaster recovery

---

## 🔧 Monitoring & Maintenance

### AWS CloudWatch (Free Tier)
```
┌─────────────────────────────────────┐
│  Metrics to Monitor:                │
│  - EC2 CPU Usage                    │
│  - Network In/Out                   │
│  - Disk Usage                       │
│  - S3 Request Count                 │
│  - CloudFront Cache Hit Rate        │
└─────────────────────────────────────┘
```

### PM2 Monitoring
```bash
pm2 monit              # Real-time monitoring
pm2 logs               # View logs
pm2 status             # Check status
```

### MongoDB Atlas Dashboard
- Database size
- Connection count
- Query performance
- Alerts

---

## 🚀 Deployment Workflow

```
┌─────────────────┐
│  Local Dev      │
│  (Your PC)      │
└────────┬────────┘
         │
         │ 1. Code Changes
         ▼
┌─────────────────┐
│  Git Push       │
│  (GitHub)       │
└────────┬────────┘
         │
         │ 2. Pull on EC2
         ▼
┌─────────────────┐
│  EC2 Backend    │
│  pm2 restart    │
└─────────────────┘

┌─────────────────┐
│  Local Build    │
│  npm run build  │
└────────┬────────┘
         │
         │ 3. Upload dist/
         ▼
┌─────────────────┐
│  S3 Frontend    │
│  Auto-deploy    │
└─────────────────┘
```

---

## 📊 Performance Optimization

### Frontend (S3 + CloudFront)
- ✅ Gzip compression
- ✅ Browser caching
- ✅ CDN distribution
- ✅ Lazy loading

### Backend (EC2)
- ✅ PM2 cluster mode (future)
- ✅ MongoDB indexing
- ✅ Response caching
- ✅ Image optimization (Cloudinary)

### Database (MongoDB)
- ✅ Indexed queries
- ✅ Connection pooling
- ✅ Aggregation pipelines

---

## 🎯 Alternative Deployment Options

### Option 1: Current (Recommended for Learning)
- **EC2 + S3 + MongoDB Atlas**
- **Cost:** $0 (Free Tier)
- **Control:** Full control
- **Complexity:** Medium

### Option 2: Heroku + Netlify
- **Backend:** Heroku
- **Frontend:** Netlify
- **Cost:** $0 (Free Tier)
- **Complexity:** Low
- **Limitation:** Heroku sleeps after 30 min

### Option 3: Vercel + Railway
- **Backend:** Railway
- **Frontend:** Vercel
- **Cost:** $5/month
- **Complexity:** Low
- **Performance:** Good

### Option 4: AWS Amplify (All-in-one)
- **Everything:** AWS Amplify
- **Cost:** ~$15/month
- **Complexity:** Low
- **Features:** CI/CD, Auth, Storage

---

## 📝 Deployment Checklist Summary

```
✅ MongoDB Atlas Setup
   └─ Create cluster
   └─ Create user
   └─ Get connection string

✅ AWS EC2 Setup
   └─ Launch instance
   └─ Install Node.js
   └─ Upload code
   └─ Configure .env
   └─ Start with PM2

✅ AWS S3 Setup
   └─ Create bucket
   └─ Upload build files
   └─ Enable static hosting
   └─ Set public policy

✅ Testing
   └─ Backend health check
   └─ Frontend loads
   └─ Login works
   └─ Posts work
   └─ Messages work
```

---

## 🎉 Success Metrics

After deployment, you should see:

- ✅ Website loads in < 3 seconds
- ✅ API response time < 500ms
- ✅ Real-time messages < 100ms delay
- ✅ Image upload < 5 seconds
- ✅ 99% uptime

---

**Your Instagram Clone is production-ready! 🚀**
