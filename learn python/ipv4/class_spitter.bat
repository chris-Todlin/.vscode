@echo off
REM ====================================================================
REM 1. ENVIRONMENT CONFIGURATION
REM ====================================================================
SET SCRIPT_PATH="C:\Users\Admin\.vscode\learn python\ipv4\class_spitter.py"
SET VENV_PATH="C:\Users\Admin\.vscode\learn python\ipv4\.venv\Scripts\activate"

REM ====================================================================
REM 2. DIRECTORY NAVIGATION & ENVIRONMENT ACTIVATION
REM ====================================================================
cd /d %SCRIPT_PATH%
if exist %VENV_PATH% (
    call %VENV_PATH%
)

REM ====================================================================
REM 3. EXECUTION
REM ====================================================================
python script.py %*

REM ====================================================================
REM 4. CLEANUP & EXIT
REM ====================================================================
if errorlevel 1 (
    echo.
    echo Script failed with error code %errorlevel%.
    pause
)
