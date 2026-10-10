@echo off
setlocal
cd /d "%~dp0"
title ICU Power Lab 3D - Local Server

echo ===================================================
echo   ICU Power Lab 3D - Starting Interactive Simulator
echo ===================================================
echo.

where npm >nul 2>nul
if not errorlevel 1 (
  echo Starting Vite Dev Server...
  start "" http://localhost:5174/
  npm run dev
  exit /b 0
)

where py >nul 2>nul
if not errorlevel 1 (
  echo Starting Python Server on port 8000...
  start "" http://localhost:8000/
  py -m http.server 8000
  exit /b 0
)

where python >nul 2>nul
if not errorlevel 1 (
  echo Starting Python Server on port 8000...
  start "" http://localhost:8000/
  python -m http.server 8000
  exit /b 0
)

echo Neither Node/NPM nor Python was found.
pause

