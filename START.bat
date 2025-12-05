@echo off
title Instagram Clone - Startup
color 0A

echo.
echo ========================================
echo    INSTAGRAM CLONE - STARTING
echo ========================================
echo.

echo [1/4] Killing existing processes...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :8081') do @taskkill /f /pid %%a 2>nul
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :3000') do @taskkill /f /pid %%a 2>nul

echo [2/4] Starting Backend Server...
cd backend
start "Backend - Port 8081" cmd /k "npm run dev"
cd..

timeout /t 5 /nobreak >nul

echo [3/4] Starting Frontend Server...
cd frontend
start "Frontend - Port 3000" cmd /k "npm run dev"
cd..

echo [4/4] Done!
echo.
echo ========================================
echo   SERVERS STARTED SUCCESSFULLY!
echo ========================================
echo.
echo Backend:  http://localhost:8081
echo Frontend: http://localhost:3000
echo.
echo Database: mongodb://127.0.0.1:27017/connecthub
echo.
echo Press any key to exit...
pause >nul
