@echo off
setlocal
cd /d "%~dp0"
where py >nul 2>nul
if not errorlevel 1 (
  start "ICU Power Lab 3D Server" /min cmd /k "py -m http.server 8000"
) else (
  where python >nul 2>nul
  if errorlevel 1 (
    echo Python was not found. Install Python or use npm run dev.
    pause
    exit /b 1
  )
  start "ICU Power Lab 3D Server" /min cmd /k "python -m http.server 8000"
)
timeout /t 2 >nul
start "" http://localhost:8000/
echo ICU Power Lab 3D is running at http://localhost:8000
pause
