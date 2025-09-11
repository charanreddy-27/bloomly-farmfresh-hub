@echo off
echo Building project for production...
npm run build

echo.
echo Build complete! 
echo.
echo Next steps:
echo 1. Go to your Hostinger File Manager
echo 2. Navigate to public_html folder
echo 3. Delete old files (if any)
echo 4. Upload all contents from the 'dist' folder
echo 5. Your website will be live!
echo.
echo Files ready for upload are in the 'dist' folder
pause
