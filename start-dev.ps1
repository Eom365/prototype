# Режим разработки: фронт на 5173, API на 5080
$ErrorActionPreference = "Stop"
$Root = $PSScriptRoot

$ip = (
    Get-NetIPAddress -AddressFamily IPv4 |
    Where-Object {
        $_.IPAddress -notlike "127.*" -and
        $_.PrefixOrigin -ne "WellKnown" -and
        $_.InterfaceAlias -notlike "*Loopback*"
    } |
    Select-Object -First 1
).IPAddress

if (-not $ip) {
    $ip = "ВАШ_IP_АДРЕС"
}

Write-Host "Запуск API на порту 5080..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$Root\backend\ProductCard.Api'; dotnet run"

Start-Sleep -Seconds 3

Write-Host "Запуск интерфейса на порту 5173..." -ForegroundColor Cyan
Write-Host ""
Write-Host "Доступ в офисе: http://${ip}:5173" -ForegroundColor Green
Write-Host ""

Set-Location $Root
npm run dev
