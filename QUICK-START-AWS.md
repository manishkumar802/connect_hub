# ⚡ Quick Start - AWS Deployment (30 Minutes)

## 🎯 Overview
This is a simplified checklist version of the full deployment guide.

---

## ✅ Pre-Deployment Checklist

- [ ] AWS Account created (with credit card verified)
- [ ] MongoDB Atlas account created
- [ ] Cloudinary account (already have credentials)
- [ ] Project code ready on local computer

---

## 📝 Step-by-Step Checklist

### STEP 1: MongoDB Atlas (10 minutes)
- [ ] Go to mongodb.com/cloud/atlas/register
- [ ] Create account
- [ ] Create FREE M0 cluster (AWS, closest region)
- [ ] Create database user (save username & password)
- [ ] Add IP: 0.0.0.0/0 (allow all)
- [ ] Get connection string
- [ ] Replace `<password>` and add `/connecthub` at end
- [ ] **SAVE CONNECTION STRING**

**Example:**
```
mongodb+srv://user:pass@cluster.xxxxx.mongodb.net/connecthub
```

---

### STEP 2: AWS EC2 Backend (15 minutes)

#### 2.1 Create EC2 Instance
- [ ] Login to AWS Console
- [ ] Search "EC2" → Launch Instance
- [ ] Name: `instagram-backend`
- [ ] OS: Ubuntu 22.04 LTS
- [ ] Instance type: t2.micro (Free tier)
- [ ] Create key pair: `instagram-key.pem` (DOWNLOAD & SAVE)
- [ ] Security group: Allow ports 22, 8081, 80
- [ ] Launch instance
- [ ] **COPY PUBLIC IP ADDRESS**

#### 2.2 Connect to EC2
**Windows:**
```bash
# Use PuTTY with .ppk file
# Host: ubuntu@YOUR_EC2_IP
```

**Mac/Linux:**
```bash
chmod 400 instagram-key.pem
ssh -i instagram-key.pem ubuntu@YOUR_EC2_IP
```

#### 2.3 Setup Server
```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2
sudo npm install -g pm2

# Install Git
sudo apt install -y git
```

#### 2.4 Upload Code
**On your local computer:**
```bash
cd "C:\Users\manis\OneDrive\Desktop\INSTAGRAM CLONE"
scp -i instagram-key.pem -r backend ubuntu@YOUR_EC2_IP:~/
```

#### 2.5 Configure & Start
**Back on EC2:**
```bash
cd ~/backend
npm install

# Create .env file
nano .env
```

**Paste this (UPDATE VALUES):**
```env
PORT=8081
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
SECRET_KEY=SDJVIFSDJVOIJKKVKA
API_KEY=725479154796424
API_SECRET=mNunqF3rX3e8y_KNsR-ILej57hA
CLOUD_NAME=dftveg232
URL=http://YOUR_EC2_IP:8081
BACKEND_URL=http://YOUR_EC2_IP:8081
NODE_ENV=production
```

**Save:** Ctrl+X, Y, Enter

**Update CORS:**
```bash
nano index.js
```

Find `corsOptions` and add your EC2 IP:
```javascript
origin: ["http://localhost:3000", "http://YOUR_EC2_IP:8081"],
```

**Start backend:**
```bash
pm2 start index.js --name instagram-backend
pm2 save
pm2 startup
```

**Test:**
```
http://YOUR_EC2_IP:8081/health
```

- [ ] Backend running ✅

---

### STEP 3: AWS S3 Frontend (5 minutes)

#### 3.1 Update Frontend Config
**On local computer:**

Edit `frontend/src/lib/api.js`:
```javascript
const API_BASE_URL = 'http://YOUR_EC2_IP:8081/api/v1';
```

Edit `frontend/src/App.jsx`:
```javascript
const socketio = io('http://YOUR_EC2_IP:8081', {
```

#### 3.2 Build Frontend
```bash
cd frontend
npm run build
```

#### 3.3 Create S3 Bucket
- [ ] AWS Console → Search "S3"
- [ ] Create bucket
- [ ] Name: `instagram-clone-yourname` (unique)
- [ ] Region: Same as EC2
- [ ] UNCHECK "Block all public access"
- [ ] Create bucket

#### 3.4 Upload Files
- [ ] Click bucket → Upload
- [ ] Add all files from `frontend/dist` folder
- [ ] Upload

#### 3.5 Enable Website Hosting
- [ ] Properties tab → Static website hosting
- [ ] Enable
- [ ] Index: `index.html`
- [ ] Error: `index.html`
- [ ] Save
- [ ] **COPY WEBSITE ENDPOINT URL**

#### 3.6 Make Public
- [ ] Permissions tab → Bucket policy
- [ ] Paste (replace YOUR-BUCKET-NAME):

```json
{
    "Version": "2012-10-17",
    "Statement": [{
        "Sid": "PublicReadGetObject",
        "Effect": "Allow",
        "Principal": "*",
        "Action": "s3:GetObject",
        "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
    }]
}
```

- [ ] Save

#### 3.7 Update Backend CORS
**On EC2:**
```bash
cd ~/backend
nano index.js
```

Add S3 URL to CORS:
```javascript
origin: [
    "http://localhost:3000",
    "http://YOUR_EC2_IP:8081",
    "http://YOUR_S3_BUCKET_URL"
],
```

```bash
pm2 restart instagram-backend
```

---

## 🎉 DONE! Test Your App

Open browser: `http://YOUR_S3_BUCKET_URL`

- [ ] Can access website
- [ ] Can signup
- [ ] Can login
- [ ] Can create post
- [ ] Can send message

---

## 📋 Your Deployment Info

**Fill this out:**

```
MongoDB Connection: _________________________________
EC2 Public IP: _________________________________
EC2 Key File Location: _________________________________
S3 Bucket Name: _________________________________
S3 Website URL: _________________________________
```

---

## 🔧 Common Commands

**Connect to EC2:**
```bash
ssh -i instagram-key.pem ubuntu@YOUR_EC2_IP
```

**Check Backend:**
```bash
pm2 status
pm2 logs instagram-backend
```

**Restart Backend:**
```bash
pm2 restart instagram-backend
```

**Update Frontend:**
```bash
# On local computer
cd frontend
npm run build
# Upload dist folder to S3 again
```

---

## 🐛 Troubleshooting

**Backend not working:**
```bash
pm2 logs instagram-backend
```

**Frontend not loading:**
- Check S3 bucket policy is public
- Check browser console (F12)

**Can't connect to EC2:**
- Check security group allows port 22
- Check key file permissions: `chmod 400 instagram-key.pem`

**MongoDB error:**
- Check connection string in .env
- Check MongoDB Atlas IP whitelist

---

## 💰 Free Tier Limits

✅ EC2: 750 hours/month (1 instance 24/7)
✅ S3: 5GB storage
✅ MongoDB: 512MB free forever

**Stay within limits = $0 cost!**

---

## 📞 Need Help?

1. Check AWS-DEPLOYMENT-GUIDE.md (detailed version)
2. Check logs: `pm2 logs instagram-backend`
3. Check browser console: F12
4. Verify all URLs are correct

---

**Deployment Time: ~30 minutes**
**Cost: $0 (Free Tier)**

🚀 **Happy Deploying!**
