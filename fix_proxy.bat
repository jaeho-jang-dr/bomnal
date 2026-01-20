@echo off
setlocal enabledelayedexpansion

echo ==================================================
echo       Antigravity Proxy Restarter and Fixer
echo ==================================================

:: 1. Kill any existing process on port 8080 (clean slate)
echo [STEP 1] Checking port 8080...
for /f "tokens=5" %%a in ('netstat -aon ^| find ":8080" ^| find "LISTENING"') do (
    echo [INFO] Killing stuck process PID %%a
    taskkill /f /pid %%a >nul 2>&1
)

:: 2. Start the Proxy Server in a minimized window
echo [STEP 2] Starting Proxy Server...
set "PROXY_DIR=D:\Projects\miryangosweb\antigravity-claude-proxy"

if not exist "%PROXY_DIR%" (
    echo [ERROR] Proxy directory not found at: %PROXY_DIR%
    exit /b 1
)

cd /d "%PROXY_DIR%"
start "Antigravity Proxy" /min npm start

:: 3. Wait for initialization
echo [STEP 3] Waiting for server to boot...
timeout /t 5 /nobreak >nul

echo.
echo ==================================================
echo [SUCCESS] Proxy has been restarted!
echo ==================================================
echo.
echo Please run:
echo   claude
echo.
echo ==================================================

:: Return to project root
cd /d "D:\Projects\bomnal"
