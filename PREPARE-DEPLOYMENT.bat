@echo off
echo ========================================
echo Instagram Clone - Deployment Preparation
echo ========================================
echo.

echo This script will help you prepare for AWS deployment
echo.

echo Step 1: Checking if Node.js is installed...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed!
    echo Please install Node.js from: https://nodejs.org
    pause
    exit /b 1
)
echo [OK] Node.js is installed
echo.

echo Step 2: Checking backend dependencies...
cd backend
if not exist "node_modules" (
    echo Installing backend dependencies...
    call npm install
) else (
    echo [OK] Backend dependencies already installed
)
cd ..
echo.

echo Step 3: Checking frontend dependencies...
cd frontend
if not exist "node_modules" (
    echo Installing frontend dependencies...
    call npm install
) else (
    echo [OK] Frontend dependencies already installed
)
echo.

echo Step 4: Creating deployment checklist...
echo.
echo ========================================
echo DEPLOYMENT CHECKLIST
echo ========================================
echo.
echo [ ] 1. MongoDB Atlas account created
echo [ ] 2. MongoDB connection string saved
echo [ ] 3. AWS account created and verified
echo [ ] 4. Read AWS-DEPLOYMENT-GUIDE.md
echo [ ] 5. Read QUICK-START-AWS.md
echo.
echo ========================================
echo NEXT STEPS:
echo ========================================
echo.
echo 1. Open: AWS-DEPLOYMENT-GUIDE.md (detailed guide)
echo 2. Open: QUICK-START-AWS.md (quick checklist)
echo 3. Follow the steps to deploy on AWS
echo.
echo Files created for deployment:
echo - backend\.env.production (template)
echo - backend\ecosystem.config.js (PM2 config)
echo - deploy-to-ec2.sh (deployment script)
echo.
echo ========================================
cd ..
echo.
pause
