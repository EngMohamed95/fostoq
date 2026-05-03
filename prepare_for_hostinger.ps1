# This script builds the project and creates a ZIP file for Hostinger deployment.
# It zips the contents of the 'dist' folder so you can upload it directly.

Write-Host "Building the project..." -ForegroundColor Cyan
npm run build

if ($?) {
    Write-Host "Build successful. Creating 'deploy.zip'..." -ForegroundColor Green
    if (Test-Path "deploy.zip") { Remove-Item "deploy.zip" }
    Compress-Archive -Path dist\* -DestinationPath deploy.zip -Force
    Write-Host "Success! 'deploy.zip' has been created. You can now upload it to Hostinger." -ForegroundColor Green
} else {
    Write-Host "Build failed. Please check the errors above." -ForegroundColor Red
}
