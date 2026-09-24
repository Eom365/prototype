# Запуск приложения для доступа из офисной сети (один ПК = сервер)
$ErrorActionPreference = "Stop"
$Root = $PSScriptRoot

Write-Host "=== Сборка интерфейса ===" -ForegroundColor Cyan
Set-Location $Root
npm run build

Write-Host "`n=== Запуск сервера ===" -ForegroundColor Cyan
Set-Location "$Root\backend\ProductCard.Api"

. "$Root\get-office-ip.ps1"
$ip = Get-OfficeIpAddress
if (-not $ip) { $ip = "192.168.1.43" }

Write-Host ""
Write-Host "Приложение будет доступно:" -ForegroundColor Green
Write-Host "  На этом ПК:       http://localhost:5080"
Write-Host "  В офисе (другие): http://${ip}:5080"
Write-Host ""
Write-Host "Остановка: Ctrl+C" -ForegroundColor Yellow
Write-Host ""

dotnet run
