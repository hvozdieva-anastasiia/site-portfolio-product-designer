@echo off
setlocal
cd /d "%~dp0"
node scripts\rebuild.mjs
pause
